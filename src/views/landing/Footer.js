import React from 'react'
import { CContainer, CRow, CCol } from '@coreui/react'
import './LandingPage.css'

const Footer = () => {
  return (
    <div className="landing-footer">
      <CContainer>
        <CRow className="text-center">
          <CCol>
            <p>&copy; {new Date().getFullYear()} Dropshipper. All Rights Reserved.</p>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Footer
