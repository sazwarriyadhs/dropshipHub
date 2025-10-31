import React, { useState } from 'react'
import {
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CButton,
  CCollapse,
  CNavbarToggler
} from '@coreui/react'
import { useNavigate, Link } from 'react-router-dom'
import { Package, Menu, X, LogIn, UserPlus } from 'lucide-react'
import './LandingPage.css'

const LandingNavbar = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  return (
    <CNavbar colorScheme="light" className="bg-white shadow-sm landing-navbar" placement="sticky">
      <CContainer>
        <CNavbarBrand
          as={Link}
          to="/"
          className="d-flex align-items-center text-decoration-none"
        >
          <div className="bg-primary rounded me-2 d-flex align-items-center justify-content-center"
               style={{ width: '32px', height: '32px' }}>
            <Package size={18} className="text-white" />
          </div>
          <span className="logo-text fw-bold fs-4 text-primary">DropshipHub</span>
        </CNavbarBrand>

        {/* Mobile Toggle */}
        <CNavbarToggler
          onClick={() => setVisible(!visible)}
          className="d-md-none border-0"
        >
          {visible ? <X size={20} /> : <Menu size={20} />}
        </CNavbarToggler>

        {/* Navigation - Collapsible for mobile */}
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav className="me-auto mb-2 mb-lg-0">
            <CNavItem>
              <CNavLink
                as={Link}
                to="/products"
                className="fw-semibold text-dark py-2"
                onClick={() => setVisible(false)}
              >
                Products
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                as={Link}
                to="/categories"
                className="fw-semibold text-dark py-2"
                onClick={() => setVisible(false)}
              >
                Categories
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                as={Link}
                to="/deals"
                className="fw-semibold text-dark py-2"
                onClick={() => setVisible(false)}
              >
                Hot Deals
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                as={Link}
                to="/about"
                className="fw-semibold text-dark py-2"
                onClick={() => setVisible(false)}
              >
                About
              </CNavLink>
            </CNavItem>
          </CNavbarNav>

          {/* Auth Buttons - Stack on mobile */}
          <div className="d-flex flex-column flex-md-row gap-2 mt-3 mt-md-0">
            <CButton
              color="outline-primary"
              onClick={() => {
                navigate('/login')
                setVisible(false)
              }}
              className="d-flex align-items-center justify-content-center"
            >
              <LogIn size={16} className="me-1" />
              Login
            </CButton>
            <CButton
              color="primary"
              onClick={() => {
                navigate('/register')
                setVisible(false)
              }}
              className="d-flex align-items-center justify-content-center"
            >
              <UserPlus size={16} className="me-1" />
              Register
            </CButton>
          </div>
        </CCollapse>
      </CContainer>
    </CNavbar>
  )
}

export default LandingNavbar
