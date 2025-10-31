import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import './LandingPage.css'
import {
  ChevronUp, Filter, Grid, List, Search, X, MapPin, Package, Truck,
  Star, ChevronLeft, ChevronRight, Phone, Mail, MessageCircle,
  Shield, Clock, RefreshCw, ShoppingCart, Heart, Share2, Eye,
  TrendingUp, Award, Users, Zap
} from 'lucide-react'

import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
  CBadge,
  CPagination,
  CPaginationItem,
  CTooltip,
  CProgress
} from '@coreui/react'

const LandingPage = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()
  const productSectionRef = useRef(null)

  // Redirect jika user sudah login
  if (currentUser) {
    return <Navigate to="/dashboard" replace />
  }

  // States
  const [products, setProducts] = useState([])
  const [logisticsProviders, setLogisticsProviders] = useState([])
  const [marketplaces, setMarketplaces] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedMarketplace, setSelectedMarketplace] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 5000000])
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [showShippingCalculator, setShowShippingCalculator] = useState(false)
  const [shippingWeight, setShippingWeight] = useState(1)
  const [shippingOrigin, setShippingOrigin] = useState('Jakarta')
  const [shippingDestination, setShippingDestination] = useState('')
  const [gridView, setGridView] = useState('grid')
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [autoUpdateStatus, setAutoUpdateStatus] = useState('Aktif')
  const [isScrolled, setIsScrolled] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Sample data
  const sampleLogistics = [
    {
      name: 'JNE',
      logo: '/assets/images/logistics/jne.png',
      type: 'local',
      cost_per_kg: 10000,
      services: ['REG', 'YES'],
      delivery_time: '2-3 hari',
      rating: 4.5
    },
    {
      name: 'J&T',
      logo: '/assets/images/logistics/jnt.png',
      type: 'local',
      cost_per_kg: 9000,
      services: ['REG', 'ECO'],
      delivery_time: '1-2 hari',
      rating: 4.3
    },
    {
      name: 'SiCepat',
      logo: '/assets/images/logistics/sicepat.png',
      type: 'local',
      cost_per_kg: 9500,
      services: ['REG', 'BEST'],
      delivery_time: '2-3 hari',
      rating: 4.4
    },
    {
      name: 'FedEx',
      logo: '/assets/images/logistics/fedex.png',
      type: 'international',
      cost_per_kg: 50000,
      services: ['INTERNATIONAL'],
      delivery_time: '3-5 hari',
      rating: 4.7
    },
  ]

  const sampleMarketplaces = [
    { name: 'Tokopedia', logo: '/assets/images/marketplaces/tokopedia.png', color: '#42b549' },
    { name: 'Shopee', logo: '/assets/images/marketplaces/shopee.png', color: '#ee4d2d' },
    { name: 'Lazada', logo: '/assets/images/marketplaces/lazada.png', color: '#0f146d' },
    { name: 'Bukalapak', logo: '/assets/images/marketplaces/bukalapak.png', color: '#e31e52' },
    { name: 'Blibli', logo: '/assets/images/marketplaces/blibli.png', color: '#0095e9' },
  ]

  const cities = [
    { id: 1, name: 'Jakarta', zone: 'JABODETABEK', delivery_time: '1-2 hari' },
    { id: 2, name: 'Bandung', zone: 'JABODETABEK', delivery_time: '1-2 hari' },
    { id: 3, name: 'Surabaya', zone: 'JAWA', delivery_time: '2-3 hari' },
    { id: 4, name: 'Medan', zone: 'SUMATRA', delivery_time: '3-4 hari' },
    { id: 5, name: 'Makassar', zone: 'INDONESIA_TIMUR', delivery_time: '4-5 hari' },
    { id: 6, name: 'Bali', zone: 'INDONESIA_TIMUR', delivery_time: '3-4 hari' },
  ]

  const categories = [
    { name: 'Electronics', icon: '📱', count: 124, color: '#ff6b6b' },
    { name: 'Fashion', icon: '👕', count: 89, color: '#4ecdc4' },
    { name: 'Home & Living', icon: '🏠', count: 67, color: '#45b7d1' },
    { name: 'Beauty', icon: '💄', count: 45, color: '#96ceb4' },
    { name: 'Sports', icon: '⚽', count: 32, color: '#feca57' },
    { name: 'Toys & Games', icon: '🎮', count: 28, color: '#ff9ff3' },
    { name: 'Automotive', icon: '🚗', count: 23, color: '#54a0ff' },
    { name: 'Books', icon: '📚', count: 56, color: '#5f27cd' },
  ]

  const hotDeals = [
    {
      id: 1,
      name: 'Smartphone Flagship',
      discount: 35,
      endsIn: '02:15:30',
      originalPrice: 5000000,
      currentPrice: 3250000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      sold: 45,
      stock: 15
    },
    {
      id: 2,
      name: 'Fashion Collection',
      discount: 50,
      endsIn: '05:45:12',
      originalPrice: 800000,
      currentPrice: 400000,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      sold: 78,
      stock: 22
    },
    {
      id: 3,
      name: 'Home Appliances',
      discount: 25,
      endsIn: '12:30:45',
      originalPrice: 2500000,
      currentPrice: 1875000,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      sold: 23,
      stock: 7
    },
    {
      id: 4,
      name: 'Beauty Bundle',
      discount: 40,
      endsIn: '01:20:15',
      originalPrice: 600000,
      currentPrice: 360000,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      sold: 156,
      stock: 44
    },
  ]

  // Scroll effect untuk header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll ke product section dari URL hash
  useEffect(() => {
    if (location.hash === '#products' && productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  // Fetch products dengan progress simulation
  useEffect(() => {
    const fetchProducts = async (isInitialFetch = false) => {
      try {
        if (isInitialFetch) {
          setIsLoading(true)
          setLoadingProgress(0)

          // Simulate progress
          const progressInterval = setInterval(() => {
            setLoadingProgress(prev => {
              if (prev >= 90) {
                clearInterval(progressInterval)
                return 90
              }
              return prev + 10
            })
          }, 100)
        }

        const response = await axios.get('http://localhost:8080/api/products', {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          }
        })

        let productsData = response.data
        if (response.data && Array.isArray(response.data.products)) {
          productsData = response.data.products
        } else if (response.data && Array.isArray(response.data.data)) {
          productsData = response.data.data
        }

        const productsWithFallbacks = productsData.map((p, index) => ({
          id: p.id || p._id || `product-${index}-${Date.now()}`,
          name: p.name || p.title || 'Product Name',
          title: p.title || p.name || 'Product Title',
          selling_price: p.selling_price || p.price || p.current_price || 0,
          original_price: p.original_price || p.originalPrice || p.selling_price || 0,
          marketplace: p.marketplace || 'Unknown',
          category: p.category || 'General',
          imageUrl: p.imageUrl || p.image_url || p.image || getFallbackImage(p.category),
          image_url: p.image_url || p.imageUrl || p.image || getFallbackImage(p.category),
          rating: p.rating || (4 + Math.random() * 1),
          reviews: p.reviews || Math.floor(Math.random() * 500) + 50,
          description: p.description || 'No description available',
          weight: p.weight || (Math.random() * 2 + 0.5).toFixed(2),
          stock: p.stock || Math.floor(Math.random() * 100) + 1,
          seller: p.seller || 'Trusted Seller',
          seller_city: p.seller_city || cities[Math.floor(Math.random() * cities.length)].name,
          last_updated: p.last_updated || new Date().toISOString(),
          tags: p.tags || ['Popular', 'Best Seller'].slice(0, Math.floor(Math.random() * 2) + 1),
          is_featured: p.is_featured || Math.random() > 0.7
        }))

        setProducts(productsWithFallbacks)
        setLastUpdated(new Date().toISOString())
        setError(null)
        setLoadingProgress(100)

        setTimeout(() => setLoadingProgress(0), 1000)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Showing sample products instead.')
        setProducts(getSampleProducts())
        setLastUpdated(new Date().toISOString())
        setLoadingProgress(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts(true)

    // Auto-update every 5 minutes
    const interval = setInterval(() => {
      console.log('🔄 Auto-updating products...')
      setAutoUpdateStatus('Mengupdate...')
      fetchProducts(false)
      setTimeout(() => setAutoUpdateStatus('Aktif'), 2000)
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setLogisticsProviders(sampleLogistics)
    setMarketplaces(sampleMarketplaces)
  }, [])

  // Helper functions
  const getFallbackImage = (category) => {
    const categoryImages = {
      Electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      Fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      'Home & Living': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      Beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      Sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      Default: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    }
    return categoryImages[category] || categoryImages.Default
  }

  const getSampleProducts = () => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      name: `Sample Product ${i + 1}`,
      title: `High Quality Product ${i + 1}`,
      selling_price: 150000 + i * 10000,
      original_price: 200000 + i * 15000,
      marketplace: sampleMarketplaces[i % sampleMarketplaces.length].name,
      category: ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports'][i % 5],
      imageUrl: getFallbackImage(['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports'][i % 5]),
      image_url: getFallbackImage(['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports'][i % 5]),
      rating: 4 + (Math.random() * 1),
      reviews: Math.floor(Math.random() * 500) + 50,
      description: 'This is a sample product description with more details about the product features and benefits.',
      weight: (Math.random() * 2 + 0.5).toFixed(2),
      stock: Math.floor(Math.random() * 100) + 1,
      seller: 'Trusted Seller',
      seller_city: cities[Math.floor(Math.random() * cities.length)].name,
      last_updated: new Date().toISOString(),
      tags: ['Popular', 'Best Seller', 'New'].slice(0, Math.floor(Math.random() * 3) + 1),
      is_featured: i % 5 === 0
    }))
  }

  const formatPrice = (price) => {
    if (!price || price === 0) return 'Rp 0'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const calculateShippingCost = useCallback((weight, origin, destination = '') => {
    const baseProvider = sampleLogistics.find(p => p.type === 'local')
    const baseRate = baseProvider ? baseProvider.cost_per_kg : 10000

    const zoneMultipliers = {
      'JABODETABEK': 1,
      'JAWA': 1.5,
      'SUMATRA': 2,
      'KALIMANTAN': 2.5,
      'INDONESIA_TIMUR': 3
    }

    const destinationCity = cities.find(c => c.name === destination)
    const destinationZone = destinationCity ? destinationCity.zone : 'JABODETABEK'
    const multiplier = zoneMultipliers[destinationZone] || 1.5

    return Math.round(baseRate * weight * multiplier)
  }, [])

  const calculateTotalPrice = useCallback((productPrice, weight = 1, sellerCity = 'Jakarta') => {
    const shippingCost = calculateShippingCost(weight, sellerCity, shippingDestination)
    return productPrice + shippingCost
  }, [calculateShippingCost, shippingDestination])

  const getMarketplaceColor = (marketplaceName) => {
    const marketplace = sampleMarketplaces.find(m => m.name === marketplaceName)
    return marketplace ? marketplace.color : '#6c757d'
  }

  // Filtered products dengan useMemo untuk performance
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) =>
      (p.name || p.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (selectedMarketplace) {
      filtered = filtered.filter(p => p.marketplace === selectedMarketplace)
    }

    filtered = filtered.filter(p => p.selling_price >= priceRange[0] && p.selling_price <= priceRange[1])

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        return filtered.sort((a, b) => a.selling_price - b.selling_price)
      case 'price_desc':
        return filtered.sort((a, b) => b.selling_price - a.selling_price)
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating)
      case 'newest':
        return filtered.sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated))
      case 'popular':
        return filtered.sort((a, b) => b.reviews - a.reviews)
      case 'featured':
        return filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
      default:
        return filtered
    }
  }, [products, searchTerm, selectedCategory, selectedMarketplace, priceRange, sortBy])

  // Pagination
  const productsPerPage = gridView === 'grid' ? 12 : gridView === 'list' ? 8 : 16
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: productSectionRef.current?.offsetTop - 100 || 0, behavior: 'smooth' })
  }

  const getVisiblePages = () => {
    const maxVisiblePages = 5
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = startPage + maxVisiblePages - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const getGridConfig = (view) => {
    switch (view) {
      case 'list': return { xs: 12, md: 12, lg: 12 }
      case 'compact': return { xs: 6, md: 4, lg: 3 }
      case 'grid':
      default: return { xs: 12, md: 6, lg: 4 }
    }
  }

  const gridConfig = getGridConfig(gridView)

  // Product Card Component yang lebih interaktif
  const ProductCard = ({ product }) => {
    const totalPrice = calculateTotalPrice(product.selling_price, product.weight || 1, product.seller_city)
    const shippingCost = calculateShippingCost(product.weight || 1, product.seller_city, shippingDestination)
    const discount = product.original_price > product.selling_price
      ? Math.round(((product.original_price - product.selling_price) / product.original_price) * 100)
      : 0

    const [isHovered, setIsHovered] = useState(false)

    const handleCardClick = () => {
      navigate(`/product/${product.id}`)
    }

    const handleQuickView = (e) => {
      e.stopPropagation()
      setQuickViewProduct(product)
    }

    const handleAddToCart = (e) => {
      e.stopPropagation()
      // Add to cart logic here
      console.log('Added to cart:', product)
    }

    const handleAddToWishlist = (e) => {
      e.stopPropagation()
      // Add to wishlist logic here
      console.log('Added to wishlist:', product)
    }

    return (
      <CCard
        className="h-100 product-card"
        style={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
        }}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="position-relative overflow-hidden">
          <img
            src={product.imageUrl || product.image_url}
            alt={product.name || product.title}
            className="card-img-top product-image"
            style={{
              height: gridView === 'compact' ? '120px' : gridView === 'list' ? '200px' : '250px',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onError={(e) => {
              e.target.src = getFallbackImage(product.category)
            }}
          />

          {/* Product Badges */}
          <div className="position-absolute top-0 start-0 end-0 p-2 d-flex justify-content-between">
            <div>
              <CBadge style={{ backgroundColor: getMarketplaceColor(product.marketplace) }}>
                {product.marketplace}
              </CBadge>
              {product.is_featured && (
                <CBadge color="warning" className="ms-1">
                  <Star size={12} className="me-1" />
                  Featured
                </CBadge>
              )}
            </div>
            {discount > 0 && (
              <CBadge color="danger">
                -{discount}%
              </CBadge>
            )}
          </div>

          {/* Quick Actions on Hover */}
          {isHovered && (
            <div className="position-absolute bottom-0 start-0 end-0 p-2 bg-dark bg-opacity-50">
              <div className="d-flex justify-content-center gap-2">
                <CTooltip content="Quick View">
                  <CButton color="light" size="sm" onClick={handleQuickView}>
                    <Eye size={14} />
                  </CButton>
                </CTooltip>
                <CTooltip content="Add to Wishlist">
                  <CButton color="light" size="sm" onClick={handleAddToWishlist}>
                    <Heart size={14} />
                  </CButton>
                </CTooltip>
                <CTooltip content="Add to Cart">
                  <CButton color="primary" size="sm" onClick={handleAddToCart}>
                    <ShoppingCart size={14} />
                  </CButton>
                </CTooltip>
              </div>
            </div>
          )}

          {/* Rating */}
          {gridView !== 'compact' && (
            <div className="position-absolute bottom-0 end-0 m-2">
              <div className="d-flex align-items-center bg-white bg-opacity-90 px-2 py-1 rounded">
                <Star size={14} className="text-warning me-1" fill="currentColor" />
                <small className="fw-bold">{product.rating?.toFixed(1)}</small>
                <small className="text-muted ms-1">({product.reviews})</small>
              </div>
            </div>
          )}
        </div>

        <CCardBody className="d-flex flex-column p-3">
          <h6 className="card-title mb-2" style={{
            fontSize: gridView === 'compact' ? '0.8rem' : '0.95rem',
            height: gridView === 'compact' ? '2.5rem' : '3rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.4'
          }}>
            {product.name || product.title}
          </h6>

          {/* Seller Info */}
          <div className="mb-2">
            <small className="text-muted d-flex align-items-center">
              <MapPin size={12} className="me-1" />
              {product.seller} • {product.seller_city}
            </small>
          </div>

          {/* Price and Shipping */}
          <div className="mt-auto">
            <div className="mb-2">
              <div className="d-flex align-items-center mb-1">
                <span className="fw-bold text-primary" style={{ fontSize: gridView === 'compact' ? '0.9rem' : '1.1rem' }}>
                  {formatPrice(product.selling_price)}
                </span>
                {discount > 0 && (
                  <small className="text-muted text-decoration-line-through ms-2">
                    {formatPrice(product.original_price)}
                  </small>
                )}
              </div>

              {/* Shipping Info */}
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-success">
                  <Truck size={12} className="me-1" />
                  +{formatPrice(shippingCost)}
                </small>
                <small className="text-muted">
                  Total: {formatPrice(totalPrice)}
                </small>
              </div>

              {/* Shipping Destination */}
              {shippingDestination && (
                <small className="text-info d-block mt-1">
                  📍 Ke {shippingDestination}
                </small>
              )}
            </div>

            {/* Category & Stock */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <CBadge color="light" textColor="dark" className="text-xs me-2">
                  {product.category}
                </CBadge>
                {product.stock < 20 && product.stock > 0 && (
                  <small className="text-warning">Hampir habis</small>
                )}
                {product.stock === 0 && (
                  <small className="text-danger">Stok habis</small>
                )}
              </div>
              {gridView !== 'compact' && (
                <small className="text-muted">
                  {product.reviews} reviews
                </small>
              )}
            </div>

            {/* Stock Progress Bar */}
            {product.stock > 0 && (
              <div className="mt-2">
                <CProgress
                  value={(product.stock / 100) * 100}
                  color={product.stock > 20 ? 'success' : product.stock > 10 ? 'warning' : 'danger'}
                  size="sm"
                />
                <small className="text-muted d-block mt-1">
                  Stok: {product.stock} tersisa
                </small>
              </div>
            )}
          </div>
        </CCardBody>
      </CCard>
    )
  }

  // Quick View Modal
  const QuickViewModal = () => (
    <CModal
      visible={!!quickViewProduct}
      onClose={() => setQuickViewProduct(null)}
      size="lg"
    >
      <CModalHeader closeButton>
        <CModalTitle>Quick View</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {quickViewProduct && (
          <CRow>
            <CCol md={6}>
              <img
                src={quickViewProduct.imageUrl}
                alt={quickViewProduct.name}
                className="img-fluid rounded"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
            </CCol>
            <CCol md={6}>
              <h4>{quickViewProduct.name}</h4>
              <div className="d-flex align-items-center mb-2">
                <Star size={16} className="text-warning me-1" fill="currentColor" />
                <span className="fw-bold">{quickViewProduct.rating?.toFixed(1)}</span>
                <span className="text-muted ms-1">({quickViewProduct.reviews} reviews)</span>
              </div>
              <p className="text-muted">{quickViewProduct.description}</p>

              <div className="mb-3">
                <h3 className="text-primary">{formatPrice(quickViewProduct.selling_price)}</h3>
                {quickViewProduct.original_price > quickViewProduct.selling_price && (
                  <del className="text-muted">{formatPrice(quickViewProduct.original_price)}</del>
                )}
              </div>

              <div className="d-flex gap-2 mb-3">
                <CButton color="primary">
                  <ShoppingCart size={16} className="me-2" />
                  Add to Cart
                </CButton>
                <CButton color="outline-primary">
                  <Heart size={16} className="me-2" />
                  Wishlist
                </CButton>
              </div>

              <div className="small text-muted">
                <div>Seller: {quickViewProduct.seller}</div>
                <div>Location: {quickViewProduct.seller_city}</div>
                <div>Stock: {quickViewProduct.stock} items</div>
                <div>Category: {quickViewProduct.category}</div>
              </div>
            </CCol>
          </CRow>
        )}
      </CModalBody>
    </CModal>
  )

  return (
    <div className="landing-page">
      {/* Header dengan scroll effect */}
      <header className={`main-header sticky-top ${isScrolled ? 'scrolled' : ''}`}>
        <CContainer>
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="logo d-flex align-items-center">
              <div className="bg-primary rounded me-2 d-flex align-items-center justify-content-center"
                   style={{ width: '32px', height: '32px' }}>
                <Package size={18} className="text-white" />
              </div>
              <span className="logo-text fw-bold fs-4">DropshipHub</span>
            </div>

            {/* Auto Update Status */}
            <div className="text-center d-none d-md-block">
              {lastUpdated && (
                <div className="d-flex align-items-center">
                  <RefreshCw size={14} className="me-2 text-muted" />
                  <small className="text-muted">
                    Auto Update: <span className={`fw-bold ${autoUpdateStatus === 'Aktif' ? 'text-success' : 'text-warning'}`}>
                      {autoUpdateStatus}
                    </span>
                  </small>
                  <small className="text-muted ms-2">
                    • {new Date(lastUpdated).toLocaleTimeString('id-ID')}
                  </small>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="main-nav d-none d-md-flex gap-4">
              <Link to="/landing#products" className="text-decoration-none fw-semibold">
                Products
              </Link>
              <Link to="/landing/categories" className="text-decoration-none fw-semibold">
                Categories
              </Link>
              <Link to="/landing/deals" className="text-decoration-none fw-semibold">
                Hot Deals
              </Link>
              <Link to="/landing/about" className="text-decoration-none fw-semibold">
                About
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="header-actions">
              <Link to="/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up Free
              </Link>
            </div>
          </div>
        </CContainer>
      </header>

      {/* Loading Progress Bar */}
      {loadingProgress > 0 && loadingProgress < 100 && (
        <div className="loading-progress-container">
          <CProgress value={loadingProgress} color="primary" animated />
          <small className="text-center d-block mt-1">Loading products... {loadingProgress}%</small>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <CContainer>
          <div className="text-center text-white">
            <h1 className="display-4 fw-bold mb-4">Temukan Produk Terbaik dengan Harga Terjangkau</h1>
            <p className="lead mb-4">
              Platform belanja terpercaya dengan harga terjangkau dan pengiriman cepat.
              <br />
              <strong>Produk diupdate otomatis setiap 5 menit!</strong>
            </p>
            <div className="d-flex justify-content-center gap-3 mb-4">
              <CButton
                color="light"
                size="lg"
                onClick={() => productSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Zap size={20} className="me-2" />
                Jelajahi Produk
              </CButton>
              <CButton color="outline-light" size="lg">
                Pelajari Lebih Lanjut
              </CButton>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-4">
              {marketplaces.map((m) => (
                <div key={m.name} className="marketplace-logo-container">
                  <img
                    src={m.logo}
                    alt={m.name}
                    className="marketplace-hero-logo"
                    style={{ height: '35px', objectFit: 'contain' }}
                    title={m.name}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextElementSibling?.classList.remove('d-none')
                    }}
                  />
                  <div className="d-none marketplace-fallback fw-bold" style={{ color: m.color }}>
                    {m.name.substring(0, 2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CContainer>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <CContainer>
          <CRow className="g-4">
            <CCol md={4}>
              <div className="text-center feature-item">
                <div className="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <RefreshCw size={24} />
                </div>
                <h5>Auto Update Real-time</h5>
                <p className="text-muted">
                  Produk dan harga diupdate otomatis setiap 5 menit dari berbagai marketplace
                </p>
              </div>
            </CCol>
            <CCol md={4}>
              <div className="text-center feature-item">
                <div className="feature-icon bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <Truck size={24} />
                </div>
                <h5>Pengiriman Cepat</h5>
                <p className="text-muted">
                  Bekerja sama dengan kurir terpercaya untuk pengiriman aman dan tepat waktu
                </p>
              </div>
            </CCol>
            <CCol md={4}>
              <div className="text-center feature-item">
                <div className="feature-icon bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <Shield size={24} />
                </div>
                <h5>Terpercaya & Aman</h5>
                <p className="text-muted">
                  Transaksi aman dengan garansi uang kembali dan customer support 24/7
                </p>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-4 bg-light">
        <CContainer>
          <CRow className="text-center">
            <CCol md={3} className="mb-3">
              <div className="stat-item">
                <TrendingUp size={32} className="text-primary mb-2" />
                <h3 className="fw-bold text-primary">5000+</h3>
                <p className="text-muted mb-0">Produk Tersedia</p>
              </div>
            </CCol>
            <CCol md={3} className="mb-3">
              <div className="stat-item">
                <Users size={32} className="text-success mb-2" />
                <h3 className="fw-bold text-success">10,000+</h3>
                <p className="text-muted mb-0">Pelanggan Senang</p>
              </div>
            </CCol>
            <CCol md={3} className="mb-3">
              <div className="stat-item">
                <Award size={32} className="text-warning mb-2" />
                <h3 className="fw-bold text-warning">99.8%</h3>
                <p className="text-muted mb-0">Rating Positif</p>
              </div>
            </CCol>
            <CCol md={3} className="mb-3">
              <div className="stat-item">
                <Package size={32} className="text-info mb-2" />
                <h3 className="fw-bold text-info">50,000+</h3>
                <p className="text-muted mb-0">Pesanan Diproses</p>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-5">
        <CContainer>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Kategori Produk Populer</h2>
            <p className="text-muted">
              Temukan produk favorit Anda berdasarkan kategori terpopuler
            </p>
          </div>
          <CRow className="g-3">
            {categories.map((category, index) => (
              <CCol key={category.name} xs={6} md={3} lg={3}>
                <CCard
                  className="category-card text-center h-100 border-0 shadow-sm"
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderLeft: `4px solid ${category.color}`
                  }}
                  onClick={() => {
                    setSelectedCategory(category.name)
                    setCurrentPage(1)
                    setTimeout(() => {
                      productSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }}
                >
                  <CCardBody className="p-4">
                    <div
                      className="category-icon mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        fontSize: '2rem',
                        width: '80px',
                        height: '80px',
                        backgroundColor: `${category.color}20`,
                        color: category.color
                      }}
                    >
                      {category.icon}
                    </div>
                    <h6 className="fw-bold mb-2">{category.name}</h6>
                    <small className="text-muted">{category.count.toLocaleString()} produk</small>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CContainer>
      </section>

      {/* Hot Deals Section */}
      <section className="hot-deals-section py-5">
        <CContainer>
          <div className="text-center mb-5">
            <h2 className="fw-bold">🔥 Hot Deals Terbatas</h2>
            <p className="text-muted">
              Diskon spesial untuk Anda, buruan sebelum kehabisan!
            </p>
          </div>
          <CRow className="g-4">
            {hotDeals.map((deal) => (
              <CCol key={deal.id} md={6} lg={3}>
                <CCard className="hot-deal-card border-0 shadow position-relative">
                  <div className="position-relative">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <CBadge
                      color="danger"
                      className="position-absolute top-0 start-0 m-2 fs-6"
                    >
                      -{deal.discount}%
                    </CBadge>
                  </div>
                  <CCardBody className="p-4">
                    <h6 className="fw-bold mb-3">{deal.name}</h6>

                    <div className="mb-3">
                      <span className="text-primary fw-bold fs-5">
                        {formatPrice(deal.currentPrice)}
                      </span>
                      <del className="text-muted ms-2">
                        {formatPrice(deal.originalPrice)}
                      </del>
                    </div>

                    <div className="mb-3">
                      <CProgress
                        value={(deal.sold / (deal.sold + deal.stock)) * 100}
                        color="warning"
                        className="mb-2"
                      />
                      <small className="text-muted d-block">
                        Terjual: {deal.sold} dari {deal.sold + deal.stock}
                      </small>
                    </div>

                    <div className="deal-timer bg-dark text-white rounded p-2 text-center mb-3">
                      <small>
                        <Clock size={12} className="me-1" />
                        Berakhir dalam: {deal.endsIn}
                      </small>
                    </div>

                    <CButton color="primary" size="sm" className="w-100">
                      <Zap size={14} className="me-1" />
                      Ambil Promo
                    </CButton>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CContainer>
      </section>

      {/* Main Product Section */}
      <section id="products" ref={productSectionRef} className="product-section py-5 bg-light">
        <CContainer>
          {/* Search and Filters Section */}
          <CCard className="mb-4 search-bar-card border-0 shadow">
            <CCardBody className="p-4">
              <CRow className="align-items-center">
                <CCol lg={6} className="mb-3 mb-lg-0">
                  <CInputGroup size="lg">
                    <CInputGroupText>
                      <Search size={20} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Cari produk, merek, atau kategori..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                      }}
                    />
                    {searchTerm && (
                      <CButton
                        color="outline-secondary"
                        onClick={() => setSearchTerm('')}
                      >
                        <X size={16} />
                      </CButton>
                    )}
                  </CInputGroup>
                </CCol>
                <CCol lg={6} className="d-flex justify-content-lg-end align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-muted d-none d-md-block">Tampilan:</span>
                    <div className="view-controls btn-group">
                      <CButton
                        color={gridView === 'grid' ? 'primary' : 'outline-secondary'}
                        size="sm"
                        onClick={() => setGridView('grid')}
                      >
                        <Grid size={16} />
                      </CButton>
                      <CButton
                        color={gridView === 'list' ? 'primary' : 'outline-secondary'}
                        size="sm"
                        onClick={() => setGridView('list')}
                      >
                        <List size={16} />
                      </CButton>
                    </div>
                    <CButton
                      color="outline-primary"
                      onClick={() => setShowFilters(!showFilters)}
                      className="d-flex align-items-center"
                    >
                      <Filter size={16} className="me-2" />
                      Filter
                      <ChevronUp
                        size={16}
                        className={`ms-2 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                      />
                    </CButton>
                  </div>
                </CCol>
              </CRow>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="filter-section mt-4 pt-4 border-top">
                  <CRow className="g-4">
                    <CCol md={3}>
                      <h6 className="mb-3">Rentang Harga</h6>
                      <CFormInput
                        type="range"
                        min="0"
                        max="5000000"
                        step="100000"
                        value={priceRange[1]}
                        onChange={(e) => {
                          setPriceRange([0, parseInt(e.target.value)])
                          setCurrentPage(1)
                        }}
                        className="mb-2"
                      />
                      <div className="d-flex justify-content-between text-sm">
                        <span>{formatPrice(0)}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </CCol>
                    <CCol md={3}>
                      <h6 className="mb-3">Marketplace</h6>
                      <select
                        className="form-select"
                        value={selectedMarketplace || ''}
                        onChange={(e) => {
                          setSelectedMarketplace(e.target.value || null)
                          setCurrentPage(1)
                        }}
                      >
                        <option value="">Semua Marketplace</option>
                        {marketplaces.map((m) => (
                          <option key={m.name} value={m.name}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </CCol>
                    <CCol md={3}>
                      <h6 className="mb-3">Kategori</h6>
                      <select
                        className="form-select"
                        value={selectedCategory || ''}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value || null)
                          setCurrentPage(1)
                        }}
                      >
                        <option value="">Semua Kategori</option>
                        {categories.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </CCol>
                    <CCol md={3}>
                      <h6 className="mb-3">Urutkan</h6>
                      <select
                        className="form-select"
                        value={sortBy}
                        onChange={(e) => {
                          setSortBy(e.target.value)
                          setCurrentPage(1)
                        }}
                      >
                        <option value="relevance">Relevansi</option>
                        <option value="price_asc">Harga Terendah</option>
                        <option value="price_desc">Harga Tertinggi</option>
                        <option value="rating">Rating Tertinggi</option>
                        <option value="newest">Terbaru</option>
                        <option value="popular">Terpopuler</option>
                        <option value="featured">Featured</option>
                      </select>
                    </CCol>
                  </CRow>
                </div>
              )}
            </CCardBody>
          </CCard>

          {/* Active Filters */}
          <div className="active-filters mb-4 d-flex flex-wrap gap-2 align-items-center">
            {(selectedCategory || selectedMarketplace || shippingDestination || searchTerm) && (
              <>
                <span className="text-muted">Filter aktif:</span>
                {selectedCategory && (
                  <CBadge color="primary" className="p-2 d-flex align-items-center gap-1">
                    {selectedCategory}
                    <X
                      size={14}
                      onClick={() => {
                        setSelectedCategory(null)
                        setCurrentPage(1)
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </CBadge>
                )}
                {selectedMarketplace && (
                  <CBadge color="primary" className="p-2 d-flex align-items-center gap-1">
                    {selectedMarketplace}
                    <X
                      size={14}
                      onClick={() => {
                        setSelectedMarketplace(null)
                        setCurrentPage(1)
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </CBadge>
                )}
                {shippingDestination && (
                  <CBadge color="success" className="p-2 d-flex align-items-center gap-1">
                    📍 {shippingDestination}
                    <X
                      size={14}
                      onClick={() => setShippingDestination('')}
                      style={{ cursor: 'pointer' }}
                    />
                  </CBadge>
                )}
                {searchTerm && (
                  <CBadge color="info" className="p-2 d-flex align-items-center gap-1">
                    "{searchTerm}"
                    <X
                      size={14}
                      onClick={() => setSearchTerm('')}
                      style={{ cursor: 'pointer' }}
                    />
                  </CBadge>
                )}
                <CButton
                  color="outline-secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedMarketplace(null)
                    setShippingDestination('')
                    setSearchTerm('')
                    setPriceRange([0, 5000000])
                    setSortBy('relevance')
                    setCurrentPage(1)
                  }}
                >
                  Hapus Semua
                </CButton>
              </>
            )}
          </div>

          {/* Results Info */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <strong>{filteredProducts.length.toLocaleString()}</strong> produk ditemukan
              {searchTerm && (
                <span className="text-muted ms-2">untuk "{searchTerm}"</span>
              )}
            </div>
            <div className="text-muted d-flex align-items-center">
              <small>
                Menampilkan {paginatedProducts.length} dari {filteredProducts.length} produk
                {lastUpdated && (
                  <span className="ms-2">• Update: {new Date(lastUpdated).toLocaleTimeString('id-ID')}</span>
                )}
              </small>
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="text-center py-5">
              <CSpinner color="primary" size="lg" />
              <p className="mt-3">Memuat produk...</p>
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <CRow className="g-4">
                {paginatedProducts.map((product) => (
                  <CCol key={product.id} {...gridConfig}>
                    <ProductCard product={product} />
                  </CCol>
                ))}
              </CRow>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-5 d-flex justify-content-center align-items-center">
                  <CPagination aria-label="Product pagination">
                    <CPaginationItem
                      disabled={currentPage === 1}
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                    >
                      <ChevronLeft size={16} />
                    </CPaginationItem>

                    {getVisiblePages().map((page) => (
                      <CPaginationItem
                        key={page}
                        active={currentPage === page}
                        onClick={() => handlePageChange(page)}
                        style={{ cursor: 'pointer' }}
                      >
                        {page}
                      </CPaginationItem>
                    ))}

                    <CPaginationItem
                      disabled={currentPage === totalPages}
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                    >
                      <ChevronRight size={16} />
                    </CPaginationItem>
                  </CPagination>

                  <div className="ms-3 d-flex align-items-center text-muted">
                    <small>
                      Halaman {currentPage} dari {totalPages}
                    </small>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-5">
              <Package size={48} className="text-muted mb-3" />
              <h4>Produk Tidak Ditemukan</h4>
              <p className="text-muted mb-4">
                Coba ubah kata kunci pencarian atau filter yang digunakan.
              </p>
              <CButton
                color="primary"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory(null)
                  setSelectedMarketplace(null)
                  setShippingDestination('')
                  setPriceRange([0, 5000000])
                  setCurrentPage(1)
                }}
              >
                Reset Semua Filter
              </CButton>
            </div>
          )}
        </CContainer>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 text-white">
        <CContainer>
          <CRow className="text-center">
            <CCol lg={8} className="mx-auto">
              <h2 className="fw-bold mb-4">Siap Memulai Bisnis Dropshipping?</h2>
              <p className="lead mb-4">
                Bergabunglah dengan ribuan seller sukses dan mulai berkembang dengan platform terpercaya.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <CButton color="light" size="lg">
                  Daftar Sekarang Gratis
                </CButton>
                <CButton color="outline-light" size="lg">
                  Pelajari Cara Kerjanya
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </section>

      {/* Footer */}
      <footer className="main-footer bg-dark text-white pt-5 pb-4">
        <CContainer>
          <CRow>
            <CCol lg={4} className="mb-4">
              <h5 className="mb-3 d-flex align-items-center">
                <Package size={24} className="me-2" />
                DropshipHub
              </h5>
              <p className="text-muted mb-3">
                Platform belanja terpercaya dengan harga terjangkau dan pengiriman cepat.
                <br />
                <small className="text-warning">
                  <RefreshCw size={12} className="me-1" />
                  Produk diupdate otomatis setiap 5 menit
                </small>
              </p>
              <div className="d-flex gap-3">
                <CButton color="primary" size="sm">
                  <MessageCircle size={16} />
                </CButton>
                <CButton color="primary" size="sm">
                  <Mail size={16} />
                </CButton>
                <CButton color="primary" size="sm">
                  <Phone size={16} />
                </CButton>
              </div>
            </CCol>

            <CCol md={6} lg={2} className="mb-4">
              <h6 className="mb-3">Tautan Cepat</h6>
              <ul className="list-unstyled footer-links">
                <li className="mb-2">
                  <Link to="/landing" className="text-muted text-decoration-none">Beranda</Link>
                </li>
                <li className="mb-2">
                  <Link to="/landing#products" className="text-muted text-decoration-none">Produk</Link>
                </li>
                <li className="mb-2">
                  <Link to="/landing/categories" className="text-muted text-decoration-none">Kategori</Link>
                </li>
                <li>
                  <Link to="/login" className="text-muted text-decoration-none">Masuk</Link>
                </li>
              </ul>
            </CCol>

            <CCol md={6} lg={3} className="mb-4">
              <h6 className="mb-3">Bantuan</h6>
              <ul className="list-unstyled footer-links">
                <li className="mb-2">
                  <Link to="/faq" className="text-muted text-decoration-none">FAQ</Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact" className="text-muted text-decoration-none">Hubungi Kami</Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-muted text-decoration-none">Info Pengiriman</Link>
                </li>
              </ul>
            </CCol>

            <CCol lg={3} className="mb-4">
              <h6 className="mb-3">Partner Pengiriman</h6>
              <div className="d-flex flex-wrap gap-3 mb-3">
                {logisticsProviders.slice(0, 4).map((l) => (
                  <div key={l.name} className="footer-logo-item" title={l.name}>
                    <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center"
                         style={{ width: '50px', height: '50px' }}>
                      <span className="fw-bold text-dark small">{l.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <h6 className="mb-3 mt-4">Products & Categories</h6>
              <div className="text-muted small">
                <div>Electronics • Fashion • Home</div>
                <div>Beauty • Sports • Toys • Books</div>
              </div>
            </CCol>
          </CRow>

          <div className="text-center text-muted border-top border-secondary pt-3 mt-3">
            <small>&copy; {new Date().getFullYear()} DropshipHub. All Rights Reserved.</small>
          </div>
        </CContainer>
      </footer>

      {/* Quick View Modal */}
      <QuickViewModal />

      {/* Shipping Calculator Modal */}
      <CModal
        visible={showShippingCalculator}
        onClose={() => setShowShippingCalculator(false)}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Kalkulator Biaya Pengiriman</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* Shipping calculator content */}
        </CModalBody>
      </CModal>

      {/* Scroll to Top Button */}
      {isScrolled && (
        <CButton
          color="primary"
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp size={20} />
        </CButton>
      )}
    </div>
  )
}

export default LandingPage
