// ============================================
//  IMPORT MODULE
// ============================================
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// ============================================
//  KONFIGURASI EXPRESS APP
// ============================================
const app = express()

// CORS: izinkan frontend React (localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))

// Middleware parsing JSON dan form data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ============================================
//  DATABASE & MODEL IMPORT
// ============================================
const db = require('./models')
const Product = db.product

// ============================================
//  SINKRONISASI DATABASE
// ===========================================
// NOTE: { force: true } akan menghapus tabel jika sudah ada
// Gunakan ini hanya saat development untuk reset skema
db.sequelize.sync({ force: true }).then(async () => {
  console.log('✅ Database synced successfully (with force).');

  const count = await Product.count();
  if (count === 0) {
    console.log('⚙️  Database kosong — menambahkan data dummy...')
    addDummyProducts()
  } else {
    console.log(`📦 ${count} produk sudah ada di database.`)
  }
}).catch(err => {
  console.error('❌ Gagal sinkronisasi database:', err)
})

// ============================================
//  FUNGSI TAMBAH DATA DUMMY PRODUK
// ============================================
function addDummyProducts() {
  const dummyProducts = [
    // Fashion
    { title: 'Gamis Lebaran Elegan', selling_price: 300000, marketplace: 'Shopee', image_url: 'https://images.unsplash.com/photo-1593032457869-4b0bfb8b7c8e?w=500' },
    { title: 'Tas Selempang Wanita Korea', selling_price: 90000, marketplace: 'Shopee', image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55ddc?w=500' },
    { title: 'Sepatu Sneakers Pria Casual', selling_price: 216000, marketplace: 'Shopee', image_url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500' },
    { title: 'Sweater Rajut Oversize Kekinian', selling_price: 182000, marketplace: 'TikTok Shop', image_url: 'https://images.unsplash.com/photo-1600180758890-6c9e4b4b7f02?w=500' },

    // Elektronik
    { title: 'Lampu Hias LED Tumblr', selling_price: 30000, marketplace: 'Shopee', image_url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500' },
    { title: 'Holder HP Motor Anti Air', selling_price: 54000, marketplace: 'Shopee', image_url: 'https://images.unsplash.com/photo-1598327106026-d9721da27382?w=500' },
    { title: 'Proyektor Mini Portable', selling_price: 540000, marketplace: 'TikTok Shop', image_url: 'https://images.unsplash.com/photo-1535008652993-45b6e4a55935?w=500' },
    { title: 'Keyboard Mechanical Gaming RGB', selling_price: 900000, marketplace: 'Tokopedia', image_url: 'https://images.unsplash.com/photo-1618384887924-3b36b7a7989b?w=500' },
    { title: 'Smart TV 4K 50 inch', selling_price: 5400000, marketplace: 'Lazada', image_url: 'https://images.unsplash.com/photo-1593784944633-c8a0f0d7a9c7?w=500' },
    { title: 'Powerbank 20000mAh Fast Charging', selling_price: 336000, marketplace: 'Lazada', image_url: 'https://images.unsplash.com/photo-1588661245363-a7b8a04b3a9e?w=500' },
    { title: 'Drone Quadcopter 4K Camera', selling_price: 2160000, marketplace: 'AliExpress', image_url: 'https://images.unsplash.com/photo-1507582020474-3a4991526524?w=500' },
    { title: 'Mini PC Windows 11', selling_price: 3840000, marketplace: 'AliExpress', image_url: 'https://images.unsplash.com/photo-1618330834803-533fad1b8b4a?w=500' },

    // Kesehatan & Kecantikan
    { title: 'Viral Skincare Set Glowing', selling_price: 180000, marketplace: 'TikTok Shop', image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500' },

    // Rumah Tangga
    { title: 'Sandal Rumah Empuk Anti-Slip', selling_price: 72000, marketplace: 'TikTok Shop', image_url: 'https://images.unsplash.com/photo-1603319240399-b61373765a49?w=500' },
    { title: 'Rak Dinding Minimalis Kayu', selling_price: 156000, marketplace: 'Tokopedia', image_url: 'https://images.unsplash.com/photo-1593642702821-c8da6758f0c6?w=500' },

    // Hobi
    { title: 'Action Figure Anime Limited', selling_price: 1440000, marketplace: 'Tokopedia', image_url: 'https://images.unsplash.com/photo-1587613991333-e02d7c8a1e6f?w=500' },
    { title: 'Tenda Camping 4 Orang', selling_price: 720000, marketplace: 'Lazada', image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500' },
  ];

  Product.bulkCreate(dummyProducts)
    .then(() => {
      console.log('✅ Dummy products successfully added!')
    })
    .catch((err) => {
      console.log('❌ Failed to add dummy products:', err)
    })
}

// ============================================
//  ROUTES DASAR & MODULAR
// ============================================
app.get('/', (req, res) => {
  res.json({ message: '🚀 Welcome to DropshipHub API Server.' })
})

// Modular routes
require('./routes/auth.routes')(app)
require('./routes/product.routes')(app)
require('./routes/order.routes')(app)

// ============================================
//  ROUTE HEALTH CHECK
// ============================================
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server berjalan normal.' })
})

// ============================================
//  JALANKAN SERVER
// ============================================
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`)
})
