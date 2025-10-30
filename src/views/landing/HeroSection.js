import React from 'react'
import { CContainer, CRow, CCol, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <div className="hero-section">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <h1>Mulai Bisnis Dropshipping Anda Hari Ini</h1>
            <p>
              Akses ribuan produk dari supplier terpercaya. Fokus pada penjualan, kami yang urus
              sisanya.
            </p>
            <CButton color="light" size="lg" onClick={() => navigate('/register')}>
              Daftar Sekarang, Gratis!
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default HeroSection
