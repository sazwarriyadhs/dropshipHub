import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  ChevronLeft, ChevronRight, Search, ShoppingCart, Star, Truck,
  Shield, ArrowRight, Filter, MapPin, Check, Calculator,
  Package, Clock, Globe, Grid, Menu, X, Phone, Mail,
  ExternalLink, Heart, Share2, Eye, Users, TrendingUp
} from 'lucide-react';

// Custom hook untuk debounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Komponen Product Card
const ProductCard = React.memo(({
  product,
  gridConfig,
  onAddToCart,
  onQuickView
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const discount = product.original_price > product.selling_price
    ? Math.round(((product.original_price - product.selling_price) / product.original_price) * 100)
    : 0;

  const formatPrice = (price) => {
    if (!price || price === 0) return 'Rp 0';
    return `Rp ${Math.round(price).toLocaleString('id-ID')}`;
  };

  const getMarketplaceColor = (marketplace) => {
    const colors = {
      'Shopee': 'bg-orange-500',
      'Tokopedia': 'bg-green-500',
      'Lazada': 'bg-blue-500',
      'TikTok Shop': 'bg-black',
      'AliExpress': 'bg-red-500',
      'Amazon': 'bg-yellow-500',
    };
    return colors[marketplace] || 'bg-gray-500';
  };

  return (
    <div className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${gridConfig.card}`}>
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image_url}
          alt={product.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${gridConfig.image}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className={`px-2 py-1 text-xs font-bold text-white rounded ${getMarketplaceColor(product.marketplace)}`}>
            {product.marketplace}
          </span>
          {discount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute top-2 right-2 p-2 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 text-sm leading-tight">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="space-y-1 mb-3">
          {product.original_price > product.selling_price && (
            <p className="text-sm text-gray-500 line-through">
              {formatPrice(product.original_price)}
            </p>
          )}
          <p className="text-lg font-bold text-gold">
            {formatPrice(product.selling_price)}
          </p>
        </div>

        {/* Margin Info */}
        {gridConfig.showMargin && product.original_price > 0 && (
          <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
            <span>Margin: {formatPrice(product.selling_price - product.original_price)}</span>
            <span className="font-semibold text-green-600">
              {Math.round(((product.selling_price - product.original_price) / product.original_price) * 100)}%
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>4.8</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center space-x-1 px-3 py-2 bg-gold text-white text-sm rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Beli</span>
          </button>
        </div>
      </div>
    </div>
  );
});

// Quick View Modal
const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  const discount = product.original_price > product.selling_price
    ? Math.round(((product.original_price - product.selling_price) / product.original_price) * 100)
    : 0;

  const formatPrice = (price) => {
    return `Rp ${Math.round(price).toLocaleString('id-ID')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Detail Produk</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {product.marketplace}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {product.category}
                </span>
              </div>

              <div className="space-y-2">
                {discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-500 text-white text-sm rounded">-{discount}%</span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.original_price)}
                    </span>
                  </div>
                )}
                <p className="text-3xl font-bold text-gold">
                  {formatPrice(product.selling_price)}
                </p>
              </div>

              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-gold text-white py-3 rounded-xl hover:bg-yellow-600 transition-colors font-semibold"
              >
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedMarketplace, setSelectedMarketplace] = useState('Semua');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState('terbaru');
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState('4kolom'); // '4kolom' atau '6kolom'
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const PRODUCTS_PER_PAGE = gridView === '6kolom' ? 18 : 12;

  // Sample data
  const sampleProducts = useMemo(() => [
    {
      id: 1,
      title: "Smartwatch Fitness Tracker Waterproof dengan GPS",
      image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      marketplace: "Shopee",
      selling_price: 250000,
      original_price: 350000,
      category: "Elektronik",
    },
    {
      id: 2,
      title: "Sepatu Sneakers Pria Casual Modern",
      image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      marketplace: "Tokopedia",
      selling_price: 180000,
      original_price: 250000,
      category: "Fashion",
    },
    {
      id: 3,
      title: "Tas Ransel Laptop Anti Air 15 inch",
      image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      marketplace: "Lazada",
      selling_price: 150000,
      original_price: 200000,
      category: "Aksesoris",
    },
    {
      id: 4,
      title: "Skincare Set Glowing Complete Routine",
      image_url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
      marketplace: "TikTok Shop",
      selling_price: 120000,
      original_price: 180000,
      category: "Kecantikan",
    },
    {
      id: 5,
      title: "Blender Portable USB Rechargeable",
      image_url: "https://images.unsplash.com/photo-1578474849710-4c46560b6adb?w=500",
      marketplace: "Shopee",
      selling_price: 85000,
      original_price: 120000,
      category: "Dapur",
    },
    {
      id: 6,
      title: "Kursi Gaming Ergonomic RGB LED",
      image_url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
      marketplace: "Tokopedia",
      selling_price: 750000,
      original_price: 950000,
      category: "Furniture",
    },
    {
      id: 7,
      title: "Headphone Wireless Noise Cancelling",
      image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      marketplace: "Amazon",
      selling_price: 450000,
      original_price: 600000,
      category: "Elektronik",
    },
    {
      id: 8,
      title: "Smartphone Android 128GB RAM 8GB",
      image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      marketplace: "AliExpress",
      selling_price: 1200000,
      original_price: 1500000,
      category: "Elektronik",
    },
    {
      id: 9,
      title: "Jam Tangan Fashion Pria Chronograph",
      image_url: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
      marketplace: "Shopee",
      selling_price: 95000,
      original_price: 150000,
      category: "Aksesoris",
    },
    {
      id: 10,
      title: "Kamera Digital 24MP dengan Lensa Kit",
      image_url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
      marketplace: "Tokopedia",
      selling_price: 1850000,
      original_price: 2200000,
      category: "Elektronik",
    },
    {
      id: 11,
      title: "Meja Laptop Portable Adjustable",
      image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      marketplace: "Lazada",
      selling_price: 125000,
      original_price: 180000,
      category: "Furniture",
    },
    {
      id: 12,
      title: "Power Bank 20000mAh Fast Charging",
      image_url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500",
      marketplace: "TikTok Shop",
      selling_price: 85000,
      original_price: 120000,
      category: "Elektronik",
    },
    // Tambahan produk untuk 6 kolom
    ...Array.from({ length: 12 }, (_, i) => ({
      id: i + 13,
      title: `Produk Premium ${i + 1} dengan Kualitas Terbaik`,
      image_url: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&${i}`,
      marketplace: ["Shopee", "Tokopedia", "Lazada", "TikTok Shop"][i % 4],
      selling_price: 50000 + (i * 25000),
      original_price: 80000 + (i * 35000),
      category: ["Elektronik", "Fashion", "Kecantikan", "Dapur"][i % 4],
    }))
  ], []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts(sampleProducts);
      setIsLoading(false);
    }, 1000);
  }, [sampleProducts]);

  // Grid configuration untuk 4 atau 6 kolom
  const gridConfig = useMemo(() => {
    const baseConfig = {
      showMargin: true,
      showRating: true
    };

    if (gridView === '6kolom') {
      return {
        ...baseConfig,
        container: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4",
        card: "",
        image: "h-40",
        title: "text-xs",
        price: "text-sm"
      };
    } else {
      return {
        ...baseConfig,
        container: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        card: "",
        image: "h-48",
        title: "text-sm",
        price: "text-lg"
      };
    }
  }, [gridView]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
      const matchesMarketplace = selectedMarketplace === 'Semua' || product.marketplace === selectedMarketplace;
      const matchesPrice = product.selling_price >= priceRange[0] && product.selling_price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesMarketplace && matchesPrice;
    });
  }, [sampleProducts, debouncedSearchTerm, selectedCategory, selectedMarketplace, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'harga-terendah':
          return a.selling_price - b.selling_price;
        case 'harga-tertinggi':
          return b.selling_price - a.selling_price;
        case 'margin-tertinggi':
          const marginA = a.selling_price - a.original_price;
          const marginB = b.selling_price - b.original_price;
          return marginB - marginA;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const categories = ['Semua', ...new Set(sampleProducts.map(p => p.category))];
  const marketplaces = ['Semua', ...new Set(sampleProducts.map(p => p.marketplace))];

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // Implement cart logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gold rounded-lg mr-3"></div>
              <h1 className="text-xl font-bold text-gray-900">DropshipHub</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setGridView(gridView === '4kolom' ? '6kolom' : '4kolom')}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gold transition-colors"
              >
                <Grid className="w-4 h-4 mr-2" />
                {gridView === '4kolom' ? '6 Kolom' : '4 Kolom'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Temukan Produk Dropship Terbaik
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {sampleProducts.length}+ produk dari berbagai marketplace
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari produk dropship..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:border-gold focus:ring-gold shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-gold"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedMarketplace}
                onChange={(e) => setSelectedMarketplace(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-gold"
              >
                {marketplaces.map(mp => (
                  <option key={mp} value={mp}>{mp}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-gold"
              >
                <option value="terbaru">Terbaru</option>
                <option value="harga-terendah">Harga Terendah</option>
                <option value="harga-tertinggi">Harga Tertinggi</option>
                <option value="margin-tertinggi">Margin Tertinggi</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              Menampilkan {filteredProducts.length} produk
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
            <p className="text-gray-500 mt-4">Memuat produk...</p>
          </div>
        ) : (
          <>
            <div className={gridConfig.container}>
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  gridConfig={gridConfig}
                  onAddToCart={handleAddToCart}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-4">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:border-gold transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Sebelumnya
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    if (page > totalPages) return null;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-gold text-white'
                            : 'border border-gray-300 hover:border-gold text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:border-gold transition-colors"
                >
                  Selanjutnya
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 DropshipHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
