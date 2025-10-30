import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CSpinner,
  CAlert,
} from '@coreui/react'
import ProductService from '../../services/product.service'
import { useCart } from '../../context/CartContext' // Impor useCart

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart() // Dapatkan fungsi addToCart

  useEffect(() => {
    ProductService.getProductById(id)
      .then((response) => {
        setProduct(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching product:', error)
        setError('Failed to fetch product details. Please try again later.')
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      alert(`${product.name} has been added to your cart!`)
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  if (error) {
    return (
      <CContainer className="mt-5">
        <CAlert color="danger">{error}</CAlert>
      </CContainer>
    )
  }

  if (!product) {
    return (
      <CContainer className="mt-5">
        <CAlert color="warning">Product not found.</CAlert>
      </CContainer>
    )
  }

  return (
    <div className="bg-light min-vh-100">
      <CContainer className="py-5">
        <CCard className="p-4">
          <CRow className="g-0">
            <CCol md={5}>
              <CCardImage
                src={product.imageUrl || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="img-fluid rounded"
              />
            </CCol>
            <CCol md={7}>
              <CCardBody>
                <CCardTitle as="h2" className="mb-3">
                  {product.name}
                </CCardTitle>
                <CCardText className="text-muted mb-4">{product.description}</CCardText>
                <div className="d-flex align-items-center mb-4">
                  <h3 className="mb-0 me-3">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(product.price)}
                  </h3>
                  {product.originalPrice && (
                    <span className="text-decoration-line-through text-muted">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <CButton color="primary" size="lg" onClick={handleAddToCart}>
                    Add to Cart
                  </CButton>
                  <CButton color="secondary" variant="outline" size="lg">
                    Buy Now
                  </CButton>
                </div>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </CContainer>
    </div>
  )
}

export default ProductPage
