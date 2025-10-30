import React, { useState, useCallback, memo } from 'react';
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
  formatPrice,
  calculateDiscount,
  getMarketplaceLogo,
  getMarketplaceColor,
  onAddToCart,
  onQuickView,
  onAddToWishlist,
  showIndonesiaBadge = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return null;
  }

  const discount = calculateDiscount(product.original_price, product.selling_price);
  const hasIndonesiaShipping = showIndonesiaBadge &&
    ['Shopee', 'Tokopedia', 'Lazada', 'TikTok Shop', 'AliExpress'].includes(product.marketplace);

  // Handler functions
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    onAddToCart?.(product);
  }, [product, onAddToCart]);

  const handleQuickView = useCallback((e) => {
    e.stopPropagation();
    onQuickView?.(product);
  }, [product, onQuickView]);

  const handleWishlist = useCallback((e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product, !isWishlisted);
  }, [product, isWishlisted, onAddToWishlist]);

  const handleShare = useCallback((e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Lihat produk ${product.title} di ${product.marketplace}`,
        url: window.location.href,
      });
    } else {
      // Fallback untuk browser yang tidak support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // Bisa tambahkan toast notification di sini
      alert('Link produk disalin ke clipboard!');
    }
  }, [product]);

  const handleMarketplaceRedirect = useCallback(() => {
    // Redirect ke marketplace asli produk
    window.open(product.product_url || '#', '_blank');
  }, [product.product_url]);

  // Fallback image source
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
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${
          isWishlisted
            ? 'bg-red-500 text-white shadow-lg'
            : 'bg-white/80 text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-white hover:shadow-lg'
        }`}
        aria-label={isWishlisted ? 'Hapus dari wishlist' : 'Tambahkan ke wishlist'}
      >
        <Heart
          className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
        />
      </button>

      {/* Quick View Button */}
      <button
        onClick={handleQuickView}
        className="absolute top-12 right-3 z-10 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-lg"
        aria-label="Quick view produk"
      >
        <Eye className="w-4 h-4 text-gray-600" />
      </button>

      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className={`${gridConfig.image} bg-gray-200 animate-pulse`} />
        )}

        <img
          src={imageSrc}
          alt={product.title}
          className={`${gridConfig.image} object-cover transition-all duration-300 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Badges Container */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {/* Marketplace Badge */}
          {product.marketplace && (
            <span
              className={`px-2 py-1 text-xs font-bold text-white rounded-full border ${getMarketplaceColor(product.marketplace)}`}
            >
              {product.marketplace}
            </span>
          )}

          {/* Indonesia Shipping Badge */}
          {hasIndonesiaShipping && (
            <span className="px-2 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-600 border-green-200 flex items-center gap-1">
              <MapPin className="w-2 h-2" />
              ID
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            {discount}% OFF
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="bg-gold text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-yellow-600"
            aria-label="Tambahkan ke keranjang"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className={gridConfig.content}>
        {/* Title */}
        <h3
          className={gridConfig.title}
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="space-y-1 mt-2">
          {/* Original Price */}
          {product.original_price > product.selling_price && (
            <p className="text-sm text-gray-500 line-through">
              {formatPrice(product.original_price)}
            </p>
          )}

          {/* Selling Price */}
          <p className={`text-gold font-bold ${gridConfig.price}`}>
            {formatPrice(product.selling_price)}
          </p>

          {/* Margin Info - Only show if enabled */}
          {gridConfig.showMargin && product.original_price > 0 && (
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                Margin: Rp {Math.round(product.selling_price - product.original_price).toLocaleString('id-ID')}
              </span>
              <span className="font-semibold text-green-600">
                {Math.round(((product.selling_price - product.original_price) / product.original_price) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Marketplace & Rating Info */}
        <div className="flex items-center justify-between mt-3">
          {/* Marketplace Logo and Name */}
          <div className="flex items-center space-x-2">
            <img
              src={getMarketplaceLogo(product.marketplace)}
              alt={product.marketplace}
              className="w-4 h-4 object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iI0ZGN0MwMCIvPgo8L3N2Zz4K';
              }}
            />
            <span className="text-xs text-gray-600 font-medium">
              {product.marketplace}
            </span>
          </div>

          {/* Rating - Only show if enabled */}
          {gridConfig.showRating && (
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-500">4.8 • 100+</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-1.5 text-gray-400 hover:text-gold transition-colors"
            aria-label="Bagikan produk"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gold text-white text-sm rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Beli</span>
          </button>

          {/* External Link Button */}
          <button
            onClick={handleMarketplaceRedirect}
            className="p-1.5 text-gray-400 hover:text-gold transition-colors"
            aria-label="Buka di marketplace"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Additional Info */}
        {product.category && (
          <div className="mt-2">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {product.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

// Default props untuk handle kasus dimana props tidak diberikan
ProductCard.defaultProps = {
  formatPrice: (price) => `Rp ${Math.round(price).toLocaleString('id-ID')}`,
  calculateDiscount: (original, selling) => {
    if (!original || !selling || original <= selling) return 0;
    return Math.round(((original - selling) / original) * 100);
  },
  getMarketplaceColor: (marketplace) => {
    const colors = {
      'Shopee': 'bg-orange-500 border-orange-600',
      'Tokopedia': 'bg-green-500 border-green-600',
      'Lazada': 'bg-blue-500 border-blue-600',
      'TikTok Shop': 'bg-black border-gray-800',
      'AliExpress': 'bg-red-500 border-red-600',
      'Amazon': 'bg-yellow-500 border-yellow-600',
    };
    return colors[marketplace] || 'bg-gray-500 border-gray-600';
  },
  getMarketplaceLogo: (marketplace) => {
    const logos = {
      'Shopee': '/logos/shopee.png',
      'Tokopedia': '/logos/tokopedia.png',
      'Lazada': '/logos/lazada.png',
      'TikTok Shop': '/logos/tiktok-shop.png',
    };
    return logos[marketplace] || '/logos/default-marketplace.png';
  },
  onAddToCart: () => console.log('Add to cart clicked'),
  onQuickView: () => console.log('Quick view clicked'),
  onAddToWishlist: () => console.log('Wishlist clicked'),
};

export default ProductCard;
