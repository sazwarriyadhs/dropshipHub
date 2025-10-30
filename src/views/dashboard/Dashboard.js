import React, { useState, useEffect, useMemo } from 'react'
import {
  CAvatar,
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
  CSpinner,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilWarning } from '@coreui/icons'
import ProductService from '../../services/product.service'
import WidgetsDropdown from '../widgets/WidgetsDropdown' // Keep for now

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    ProductService.getAll()
      .then((response) => {
        setProducts(response.data.products || response.data || [])
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
        setError('Gagal memuat data produk. Silakan coba lagi nanti.')
        setIsLoading(false)
      })
  }, [])

  const formatCurrency = (number) => {
    if (typeof number !== 'number') return 'N/A'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number)
  }

  const summaryData = useMemo(() => {
    if (!products || products.length === 0) {
      return {
        totalProducts: 0,
        totalProfit: 0,
        averageMargin: 0,
      }
    }

    const totalProducts = products.length
    const totalProfit = products.reduce((acc, product) => {
      const profit = (product.selling_price || 0) - (product.original_price || 0)
      return acc + (profit > 0 ? profit : 0)
    }, 0)

    const totalMargin = products.reduce((acc, product) => {
      const originalPrice = product.original_price || 0
      if (originalPrice > 0) {
        const margin = ((product.selling_price - originalPrice) / originalPrice) * 100
        return acc + margin
      }
      return acc
    }, 0)

    const averageMargin = products.length > 0 ? totalMargin / products.length : 0

    return {
      totalProducts,
      totalProfit,
      averageMargin,
    }
  }, [products])

  const renderProductTable = () => {
    if (isLoading) {
      return (
        <div className="text-center p-5">
          <CSpinner color="primary" />
          <p className="mt-2">Memuat data produk...</p>
        </div>
      )
    }

    if (error) {
      return (
        <CAlert color="danger" className="d-flex align-items-center">
          <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
          <div>{error}</div>
        </CAlert>
      )
    }

    if (products.length === 0) {
      return <div className="text-center p-5">Tidak ada data produk untuk ditampilkan.</div>
    }

    return (
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Nama Produk</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Marketplace</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Harga Jual</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Harga Dasar</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Keuntungan Admin</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {products.map((item, index) => {
            const keuntungan = (item.selling_price || 0) - (item.original_price || 0)
            return (
              <CTableRow key={item.id || index}>
                <CTableDataCell className="text-center">
                  <CAvatar
                    size="md"
                    src={item.image_url}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150'
                    }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.title || 'Tanpa Judul'}</div>
                </CTableDataCell>
                <CTableDataCell>{item.marketplace || 'N/A'}</CTableDataCell>
                <CTableDataCell>{formatCurrency(item.selling_price)}</CTableDataCell>
                <CTableDataCell>{formatCurrency(item.original_price)}</CTableDataCell>
                <CTableDataCell>
                  <div className={`fw-semibold ${keuntungan >= 0 ? 'text-success' : 'text-danger'}`}>
                    {formatCurrency(keuntungan)}
                  </div>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    )
  }

  return (
    <>
      <WidgetsDropdown
        className="mb-4"
        stats={{
          totalProducts: summaryData.totalProducts,
          totalProfit: formatCurrency(summaryData.totalProfit),
          averageMargin: `${summaryData.averageMargin.toFixed(2)}%`,
        }}
      />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Keuntungan Produk</CCardHeader>
            <CCardBody>{renderProductTable()}</CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
