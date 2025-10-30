import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import ProductService from '../../services/product.service'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilCart } from '@coreui/icons'
import { useCart } from '../../context/CartContext'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    ProductService.getAll()
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
      })
  }

  const handleDelete = (id) => {
    ProductService.delete(id)
      .then(() => {
        fetchProducts() // Refresh the list after deletion
      })
      .catch((error) => {
        console.error('Error deleting product:', error)
      })
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    // Optional: Add some user feedback, like a toast notification
    console.log('Added to cart:', product)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product List</strong>
            <CButton color="primary" className="float-end" onClick={() => navigate('/products/add')}>
              Add Product
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Original Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Selling Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Stock</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.map((product, index) => (
                  <CTableRow key={product.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{product.title}</CTableDataCell>
                    <CTableDataCell>{product.original_price}</CTableDataCell>
                    <CTableDataCell>{product.selling_price}</CTableDataCell>
                    <CTableDataCell>{product.stock}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        size="sm"
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                      >
                        Edit
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </CButton>
                      <CButton
                        color="success"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleAddToCart(product)}
                      >
                        <CIcon icon={cilCart} /> Add to Cart
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProductList
