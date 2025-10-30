import React from 'react'
import { CContainer, CRow, CCol, CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilChartLine, cilTruck } from '@coreui/icons'
import './LandingPage.css'

const FeaturesSection = () => {
  const features = [
    {
      icon: cilCloudDownload,
      title: 'Integrasi Produk Mudah',
      text: 'Impor ratusan produk ke toko Anda hanya dengan beberapa klik.',
    },
    {
      icon: cilTruck,
      title: 'Pengiriman Otomatis',
      text: 'Pesanan akan otomatis diteruskan ke supplier dan dikirim ke pelanggan Anda.',
    },
    {
      icon: cilChartLine,
      title: 'Analitik Penjualan',
      text: 'Pantau performa penjualan dan keuntungan Anda melalui dashboard yang intuitif.',
    },
  ]

  return (
    <div className="features-section">
      <CContainer>
        <CRow className="text-center mb-5">
          <CCol>
            <h2>Kenapa Memilih Kami?</h2>
            <p className="lead">Fitur yang dirancang untuk kesuksesan bisnis dropshipping Anda.</p>
          </CCol>
        </CRow>
        <CRow>
          {features.map((feature, index) => (
            <CCol md={4} key={index} className="mb-4">
              <CCard className="h-100 text-center feature-card">
                <CCardBody>
                  <CIcon icon={feature.icon} className="feature-icon mb-3" />
                  <CCardTitle>{feature.title}</CCardTitle>
                  <CCardText>{feature.text}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CContainer>
    </div>
  )
}

export default FeaturesSection
