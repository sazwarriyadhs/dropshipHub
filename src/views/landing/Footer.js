import React from 'react'
import { Link } from 'react-router-dom'
import { CContainer, CRow, CCol } from '@coreui/react'
import { Package } from 'lucide-react'

const LandingFooter = () => {
  return (
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
            </p>
          </CCol>
          <CCol md={6} lg={2} className="mb-4">
            <h6 className="mb-3">Tautan Cepat</h6>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link to="/landing" className="text-muted text-decoration-none">
                  Beranda
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/landing/products" className="text-muted text-decoration-none">
                  Produk
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/landing/categories" className="text-muted text-decoration-none">
                  Kategori
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted text-decoration-none">
                  Masuk
                </Link>
              </li>
            </ul>
          </CCol>
          <CCol md={6} lg={3} className="mb-4">
            <h6 className="mb-3">Bantuan</h6>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link to="/landing/faq" className="text-muted text-decoration-none">
                  FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/landing/about" className="text-muted text-decoration-none">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/landing/shipping" className="text-muted text-decoration-none">
                  Info Pengiriman
                </Link>
              </li>
            </ul>
          </CCol>
          <CCol lg={3} className="mb-4">
            <h6 className="mb-3">Partner Pengiriman</h6>
            <div className="text-muted small">JNE • J&T • SiCepat • FedEx</div>
          </CCol>
        </CRow>
        <div className="text-center text-muted border-top border-secondary pt-3 mt-3">
          <small>&copy; {new Date().getFullYear()} DropshipHub. All Rights Reserved.</small>
        </div>
      </CContainer>
    </footer>
  )
}

export default LandingFooter
