import React from 'react'
import { CContainer, CRow, CCol, CButton } from '@coreui/react'
import { Link } from 'react-router-dom'

const CTASection = () => {
  return (
    <div className="bg-primary text-white text-center py-5">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <h2 className="display-4 fw-bold mb-4">Ready to Build Your Empire?</h2>
            <p className="lead mb-4">
              Join thousands of entrepreneurs who are building successful online businesses. Sign up
              for free and start your dropshipping journey today.
            </p>
            <Link to="/register">
              <CButton color="light" size="lg" className="fw-bold">
                Get Started Now
              </CButton>
            </Link>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default CTASection
