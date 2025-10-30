import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-24 px-6">
        <h1 className="text-5xl font-bold mb-4">
          Belanja Lintas Marketplace Dalam Satu Tempat
        </h1>
        <p className="text-lg max-w-2xl mb-8 opacity-90">
          Platform ini menghubungkan produk dari <strong>TikTok, Tokopedia, Shopee, Lazada, AliExpress</strong>, dan <strong>LightInTheBox</strong> — memungkinkan Anda berbelanja semuanya dalam satu keranjang.
        </p>
        <Link
          to="/shop"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition"
        >
          Mulai Belanja Sekarang
        </Link>
      </section>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 text-center">
        <p className="mb-2">© 2025 DropshipHub. Semua hak dilindungi.</p>
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Daftar
          </Link>
          <Link to="/contact" className="hover:underline">
            Kontak Kami
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default LandingLayout
