import React from 'react'
import { CContainer, CNavbar, CNavbarBrand, CHeaderNav, CNavItem, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const LandingNavbar = () => {
  const navigate = useNavigate()

  return (
    <CHeader position="sticky" className="landing-navbar">
      <CContainer fluid>
        <CNavbarBrand href="#">
          <strong>Dropshipper</strong>
        </CNavbarBrand>
        <CHeaderNav className="ms-auto">
          <CNavItem className="me-2">
            <CButton color="primary" variant="outline" onClick={() => navigate('/login')}>
              Login
            </CButton>
          </CNavItem>
          <CNavItem>
            <CButton color="primary" onClick={() => navigate('/register')}>
              Register
            </CButton>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default LandingNavbar
