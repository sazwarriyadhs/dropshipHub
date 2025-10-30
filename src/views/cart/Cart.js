import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import OrderService from '../../services/order.service'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    const orderData = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    }

    OrderService.createOrder(orderData)
      .then(() => {
        alert('Order placed successfully!')
        clearCart()
        navigate('/orders') // Arahkan ke halaman My Orders
      })
      .catch((error) => {
        console.error('Error placing order:', error)
        alert('Failed to place order. Please try again.')
      })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Shopping Cart</strong>
          </CCardHeader>
          <CCardBody>
            {cartItems.length === 0 ? (
              <div className="text-center">
                <h4>Your cart is empty.</h4>
                <CButton color="primary" onClick={() => navigate('/products')}>
                  Continue Shopping
                </CButton>
              </div>
            ) : (
              <>
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Product</CTableHeaderCell>
                      <CTableHeaderCell>Price</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Quantity</CTableHeaderCell>
                      <CTableHeaderCell>Total</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cartItems.map((item) => (
                      <CTableRow key={item.id}>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(item.price)}
                        </CTableDataCell>
                        <CTableDataCell className="text-center" style={{ maxWidth: '120px' }}>
                          <CFormInput
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                            min="1"
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(item.price * item.quantity)}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton color="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
                <CRow className="mt-4 justify-content-end">
                  <CCol md={4}>
                    <h4>
                      Grand Total:
                      <span className="float-end">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(totalPrice)}
                      </span>
                    </h4>
                    <div className="d-grid">
                      <CButton color="success" size="lg" onClick={handleCheckout}>
                        Proceed to Checkout
                      </CButton>
                    </div>
                  </CCol>
                </CRow>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Cart
