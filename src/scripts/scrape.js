/**
 * Auto Scraper & Updater - QJMotor Indonesia
 * ------------------------------------------
 * Fitur:
 * 1. Scrape produk dari https://qjmotor.co.id
 * 2. Download gambar ke assets/images/products/
 * 3. Insert/update otomatis ke API http://localhost:8080/api/products
 * 4. Bisa dijalankan otomatis setiap hari (cron)
 */

import axios from "axios";
import * as cheerio from "cheerio"; // ✅ FIXED: gunakan named import
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";

// ======================
// Konfigurasi dasar
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://qjmotor.co.id/collections/all";
const IMAGE_DIR = path.join(__dirname, "../assets/images/products");
const API_URL = "http://localhost:8080/api/products";

// Pastikan folder gambar tersedia
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

/**
 * 📥 Unduh gambar dan simpan lokal
 */
const downloadImage = async (url, filename) => {
  try {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    const filePath = path.join(IMAGE_DIR, filename);
    fs.writeFileSync(filePath, res.data);
    return `/assets/images/products/${filename}`;
  } catch (err) {
    console.error(`❌ Gagal unduh ${filename}: ${err.message}`);
    return null;
  }
};

/**
 * 🕷️ Scrape data produk dari QJMotor
 */
const scrapeQJMotor = async () => {
  try {
    console.log("🚀 Scraping data produk dari QJMotor...");
    const { data } = await axios.get(BASE_URL);
    const $ = cheerio.load(data);
    const products = [];

    $(".product-grid-item").each((_, el) => {
      const name = $(el).find(".product-title").text().trim();
      const priceText = $(el).find(".product-price").text().trim();
      const price = parseInt(priceText.replace(/[^\d]/g, "")) || 0;

      let imageUrl = $(el).find("img").attr("src");
      if (imageUrl && !imageUrl.startsWith("http")) {
        imageUrl = `https:${imageUrl}`;
      }

      if (name && imageUrl) {
        products.push({ name, price, imageUrl });
      }
    });

    console.log(`📦 Total produk ditemukan: ${products.length}`);
    return products;
  } catch (err) {
    console.error("⚠️ Gagal scraping:", err.message);
    return [];
  }
};

/**
 * 🔄 Sinkronisasi hasil scrape ke API lokal
 */
const syncToAPI = async (products) => {
  for (const p of products) {
    try {
      const filename = `${p.name.replace(/\s+/g, "_")}.jpg`;
      const localPath = await downloadImage(p.imageUrl, filename);

      const payload = {
        name: p.name,
        price: p.price,
        image_url: localPath,
        category: "Otomotif",
        marketplace: "QJ Motor Indonesia",
        description: `Motor ${p.name} dari QJMotor Indonesia`,
      };

      // 🔎 Cek apakah produk sudah ada
      const existing = await axios.get(`${API_URL}?name=${encodeURIComponent(p.name)}`);
      if (existing.data && existing.data.length > 0) {
        const id = existing.data[0].id;
        await axios.put(`${API_URL}/${id}`, payload);
        console.log(`♻️ Update produk: ${p.name}`);
      } else {
        await axios.post(API_URL, payload);
        console.log(`✅ Insert produk baru: ${p.name}`);
      }
    } catch (err) {
      console.error(`❌ Gagal sync ${p.name}: ${err.message}`);
    }
  }
};

/**
 * 🧠 Fungsi utama auto update
 */
const runAutoUpdate = async () => {
  console.log("🕐 Memulai proses update produk QJMotor...");
  const products = await scrapeQJMotor();
  if (products.length > 0) await syncToAPI(products);
  console.log("🎉 Selesai update produk QJMotor!\n");
};

// Jalankan langsung
if (process.argv.includes("--run-now")) {
  runAutoUpdate();
}

// Jadwalkan setiap hari pukul 03:00 pagi
cron.schedule("0 3 * * *", () => {
  console.log("⏰ Menjalankan auto-update harian QJMotor...");
  runAutoUpdate();
});
