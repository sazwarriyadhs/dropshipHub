import React, { useEffect, useState } from "react";

const marketplaceImage = {
  Shopee: "https://1000logos.net/wp-content/uploads/2021/05/Shopee-logo.png",
  Tokopedia: "https://1000logos.net/wp-content/uploads/2021/05/Tokopedia-logo.png",
  Lazada: "https://1000logos.net/wp-content/uploads/2021/05/Lazada-logo.png",
  "TikTok Shop": "https://cdn-icons-png.flaticon.com/512/3046/3046125.png",
  AliExpress: "https://1000logos.net/wp-content/uploads/2020/09/Aliexpress-Logo.png",
};

const ProductShowcase = ({ search }) => {
  const [products, setProducts] = useState([]);
  const fallbackImage = "https://via.placeholder.com/300x300.png?text=No+Image";

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filtered = products.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filtered.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <img
            src={product.image_url || fallbackImage}
            alt={product.title}
            className="w-full h-52 object-cover"
          />
          <div className="p-4 flex flex-col justify-between flex-1">
            <h3 className="font-semibold text-gray-800 line-clamp-2">
              {product.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <img
                src={marketplaceImage[product.marketplace]}
                alt={product.marketplace}
                className="w-5 h-5 object-contain"
              />
              <span className="text-gray-500 text-sm">
                {product.marketplace}
              </span>
            </div>
            <p className="text-blue-600 font-bold mt-2">
              {product.selling_price
                ? `Rp ${product.selling_price.toLocaleString("id-ID")}`
                : "-"}
            </p>
            <button className="mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Tambahkan ke Keranjang
            </button>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-center col-span-full text-gray-500">
          Tidak ada produk ditemukan.
        </p>
      )}
    </div>
  );
};

export default ProductShowcase;
