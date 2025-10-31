import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CAlert,
  CSpinner,
  CBadge
} from '@coreui/react'

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart, getCartItemCount } = useCart()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Indonesia',
  })
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingInfo({ ...shippingInfo, [name]: value })
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      // Simulasi proses order
      await new Promise(resolve => setTimeout(resolve, 2000))

      const orderData = {
        shippingInfo,
        paymentMethod,
        orderItems: cartItems,
        total: getCartTotal(),
        orderDate: new Date().toISOString(),
        orderId: `ORD-${Date.now()}`
      }

      console.log('Order placed:', orderData)

      // Simpan order ke localStorage (simulasi)
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]')
      existingOrders.push(orderData)
      localStorage.setItem('userOrders', JSON.stringify(existingOrders))

      // Clear cart dan redirect
      clearCart()
      navigate('/orders', {
        state: {
          message: 'Order placed successfully!',
          orderId: orderData.orderId
        }
      })

    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'postalCode']
    const missingFields = requiredFields.filter(field => !shippingInfo[field])

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return false
    }

    if (!/^\d+$/.test(shippingInfo.postalCode)) {
      alert('Postal code must contain only numbers')
      return false
    }

    if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      alert('Please enter a valid email address')
      return false
    }

    return true
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const calculateShippingCost = () => {
    // Simple shipping calculation based on items count
    const baseShipping = 15000
    const additionalPerItem = 5000
    return baseShipping + (cartItems.length * additionalPerItem)
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotal = () => {
    return getSubtotal() + calculateShippingCost()
  }

  if (cartItems.length === 0) {
    return (
      <CContainer>
        <CAlert color="info" className="text-center">
          <h4>Your cart is empty</h4>
          <p>Please add some products to your cart before checkout.</p>
          <CButton color="primary" onClick={() => navigate('/products')}>
            Continue Shopping
          </CButton>
        </CAlert>
      </CContainer>
    )
  }

  return (
    <div className="checkout-page">
      <CRow>
        <CCol md={8}>
          {/* Shipping Information */}
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Shipping Information</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol md={6}>
                    <CFormLabel htmlFor="name">Full Name *</CFormLabel>
                    <CFormInput
                      type="text"
                      id="name"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleInputChange}
                      className="mb-3"
                      placeholder="Enter your full name"
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="email">Email *</CFormLabel>
                    <CFormInput
                      type="email"
                      id="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className="mb-3"
                      placeholder="your@email.com"
                      required
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md={6}>
                    <CFormLabel htmlFor="phone">Phone Number *</CFormLabel>
                    <CFormInput
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className="mb-3"
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="postalCode">Postal Code *</CFormLabel>
                    <CFormInput
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleInputChange}
                      className="mb-3"
                      placeholder="12345"
                      required
                    />
                  </CCol>
                </CRow>

                <CFormLabel htmlFor="address">Address *</CFormLabel>
                <CFormInput
                  type="text"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="mb-3"
                  placeholder="Street address, building, etc."
                  required
                />

                <CRow>
                  <CCol md={6}>
                    <CFormLabel htmlFor="city">City *</CFormLabel>
                    <CFormInput
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="mb-3"
                      placeholder="Your city"
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="province">Province</CFormLabel>
                    <CFormInput
                      type="text"
                      id="province"
                      name="province"
                      value={shippingInfo.province}
                      onChange={handleInputChange}
                      className="mb-3"
                      placeholder="Your province"
                    />
                  </CCol>
                </CRow>

                <CFormLabel htmlFor="country">Country</CFormLabel>
                <CFormInput
                  type="text"
                  id="country"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  className="mb-3"
                  disabled
                />
              </CForm>
            </CCardBody>
          </CCard>

          {/* Payment Method */}
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Payment Method</strong>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <CFormLabel>Select Payment Method</CFormLabel>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="bankTransfer"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="bankTransfer">
                      Bank Transfer
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="creditCard"
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="creditCard">
                      Credit Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="ewallet"
                      value="e_wallet"
                      checked={paymentMethod === 'e_wallet'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="ewallet">
                      E-Wallet (OVO, Gopay, Dana)
                    </label>
                  </div>
                </div>
              </div>

              {paymentMethod === 'bank_transfer' && (
                <CAlert color="info">
                  <strong>Bank Transfer Instructions:</strong><br />
                  Please transfer to:<br />
                  Bank: BCA<br />
                  Account: 1234567890<br />
                  Name: DropshipHub Store<br />
                  Include your order ID in the transfer description.
                </CAlert>
              )}

              {paymentMethod === 'credit_card' && (
                <CAlert color="info">
                  <strong>Credit Card Payment:</strong><br />
                  You will be redirected to our secure payment gateway after placing your order.
                </CAlert>
              )}

              {paymentMethod === 'e_wallet' && (
                <CAlert color="info">
                  <strong>E-Wallet Payment:</strong><br />
                  Available for OVO, Gopay, and Dana. You will receive a payment link after order confirmation.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard className="sticky-top" style={{ top: '20px' }}>
            <CCardHeader>
              <strong>Order Summary</strong>
              <CBadge color="primary" className="ms-2">
                {getCartItemCount()} items
              </CBadge>
            </CCardHeader>
            <CCardBody>
              {/* Order Items */}
              <div className="order-items mb-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{item.name}</div>
                      <small className="text-muted">
                        {formatPrice(item.price)} × {item.quantity}
                      </small>
                    </div>
                    <div className="text-end">
                      <div className="fw-semibold">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>{formatPrice(calculateShippingCost())}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong className="text-primary">{formatPrice(getTotal())}</strong>
                </div>
              </div>

              {/* Place Order Button */}
              <CButton
                color="success"
                className="w-100"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <CSpinner size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  `Place Order - ${formatPrice(getTotal())}`
                )}
              </CButton>

              {/* Continue Shopping */}
              <CButton
                color="outline-secondary"
                className="w-100 mt-2"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </CButton>

              {/* Security Notice */}
              <div className="mt-3 text-center">
                <small className="text-muted">
                  🔒 Your payment information is secure and encrypted
                </small>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Checkout
