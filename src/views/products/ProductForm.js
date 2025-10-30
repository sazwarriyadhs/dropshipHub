import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import ProductService from '../../services/product.service'
import { useNavigate, useParams } from 'react-router-dom'

const ProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState({
    title: '',
    description: '',
    original_price: 0,
    selling_price: 0,
    stock: 0,
    imageUrl: '',
  })

  useEffect(() => {
    if (id) {
      ProductService.get(id).then((response) => {
        setProduct(response.data)
      })
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      ProductService.update(id, product)
        .then(() => {
          navigate('/products')
        })
        .catch((error) => {
          console.error('Error updating product:', error)
        })
    } else {
      ProductService.create(product)
        .then(() => {
          navigate('/products')
        })
        .catch((error) => {
          console.error('Error creating product:', error)
        })
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{id ? 'Edit Product' : 'Add Product'}</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Product Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormInput
                  type="text"
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="original_price">Original Price</CFormLabel>
                <CFormInput
                  type="number"
                  id="original_price"
                  name="original_price"
                  value={product.original_price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="selling_price">Selling Price</CFormLabel>
                <CFormInput
                  type="number"
                  id="selling_price"
                  name="selling_price"
                  value={product.selling_price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="stock">Stock</CFormLabel>
                <CFormInput
                  type="number"
                  id="stock"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="imageUrl">Image URL</CFormLabel>
                <CFormInput
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={product.imageUrl}
                  onChange={handleChange}
                />
              </div>
              <CButton type="submit" color="primary">
                Submit
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProductForm
