import React, { useState, useCallback, memo } from 'react';
import { useCart } from '../../context/CartContext';
import {
  ShoppingCart,
  Heart,
  Eye,
  Share2,
  Star,
  MapPin,
  ExternalLink
} from 'lucide-react';

const ProductCard = memo(({
  product,
  gridConfig,
  showIndonesiaBadge = false,
  onQuickView,
}) => {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const discount = product.original_price > product.selling_price
    ? Math.round(((product.original_price - product.selling_price) / product.original_price) * 100)
    : 0;

  const hasIndonesiaShipping = showIndonesiaBadge &&
    ['Shopee', 'Tokopedia', 'Lazada', 'TikTok Shop', 'AliExpress'].includes(product.marketplace);

  // Handlers
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback(() => { setImageError(true); setImageLoaded(true); }, []);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    addToCart(product);
  }, [addToCart, product]);

  const handleQuickView = useCallback((e) => {
    e.stopPropagation();
    onQuickView?.(product);
  }, [onQuickView, product]);

  const handleWishlist = useCallback((e) => {
    e.stopPropagation();
    setIsWishlisted(prev => !prev);
  }, []);

  const handleShare = useCallback((e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: product.title, text: `Lihat produk ${product.title}`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link produk disalin ke clipboard!');
    }
  }, [product]);

  const handleMarketplaceRedirect = useCallback(() => {
    window.open(product.product_url || '#', '_blank');
  }, [product.product_url]);

  const imageSrc = imageError
    ? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop'
    : product.image_url;

  return (
    <div
      className={`group relative cursor-pointer transition-all duration-300 hover:scale-105 ${gridConfig.card}`}
      onClick={handleMarketplaceRedirect}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleMarketplaceRedirect()}
    >
      {/* Wishlist */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${
          isWishlisted ? 'bg-red-500 text-white shadow-lg' : 'bg-white/80 text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-white hover:shadow-lg'
        }`}
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Quick View */}
      <button
        onClick={handleQuickView}
        className="absolute top-12 right-3 z-10 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-lg"
      >
        <Eye className="w-4 h-4 text-gray-600" />
      </button>

      {/* Image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        {!imageLoaded && <div className={`${gridConfig.image} bg-gray-200 animate-pulse`} />}
        <img
          src={imageSrc}
          alt={product.title}
          className={`${gridConfig.image} object-cover transition-all duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.marketplace && (
            <span className={`px-2 py-1 text-xs font-bold text-white rounded-full border ${getMarketplaceColor(product.marketplace)}`}>
              {product.marketplace}
            </span>
          )}
          {hasIndonesiaShipping && (
            <span className="px-2 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-600 border-green-200 flex items-center gap-1">
              <MapPin className="w-2 h-2" /> ID
            </span>
          )}
        </div>

        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            {discount}% OFF
          </div>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="bg-gold text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-yellow-600"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className={gridConfig.content}>
        <h3 className={gridConfig.title} title={product.title}>{product.title}</h3>
        <div className="space-y-1 mt-2">
          {product.original_price > product.selling_price && (
            <p className="text-sm text-gray-500 line-through">
              Rp {Math.round(product.original_price).toLocaleString('id-ID')}
            </p>
          )}
          <p className={`text-gold font-bold ${gridConfig.price}`}>
            Rp {Math.round(product.selling_price).toLocaleString('id-ID')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <button onClick={handleShare} className="p-1.5 text-gray-400 hover:text-gold transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gold text-white text-sm rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Beli</span>
          </button>
          <button
            onClick={handleMarketplaceRedirect}
            className="p-1.5 text-gray-400 hover:text-gold transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

// Default marketplace color function
const getMarketplaceColor = (marketplace) => {
  const colors = {
    'Shopee': 'bg-orange-500 border-orange-600',
    'Tokopedia': 'bg-green-500 border-green-600',
    'Lazada': 'bg-blue-500 border-blue-600',
    'TikTok Shop': 'bg-black border-gray-800',
    'AliExpress': 'bg-red-500 border-red-600',
  };
  return colors[marketplace] || 'bg-gray-500 border-gray-600';
};

export default ProductCard;
