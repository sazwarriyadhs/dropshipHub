import React from 'react'
import { CContainer, CRow, CCol, CCard, CCardBody, CCardTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFindInPage, cilCart, cilSend } from '@coreui/icons'

const HowItWorksSection = () => {
  return (
    <div className="bg-light py-5">
      <CContainer>
        <h2 className="text-center mb-5">How It Works</h2>
        <CRow className="text-center">
          <CCol md="4">
            <CCard className="border-0 shadow-sm mb-4">
              <CCardBody>
                <div className="feature-icon bg-primary text-white mb-3">
                  <CIcon icon={cilFindInPage} size="xxl" />
                </div>
                <CCardTitle>1. Find Products</CCardTitle>
                <p>Browse millions of products from top marketplaces and add them to your import list with one click.</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md="4">
            <CCard className="border-0 shadow-sm mb-4">
              <CCardBody>
                <div className="feature-icon bg-primary text-white mb-3">
                  <CIcon icon={cilCart} size="xxl" />
                </div>
                <CCardTitle>2. Import to Your Store</CCardTitle>
                <p>Customize product details, pricing, and images before pushing them to your online store.</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md="4">
            <CCard className="border-0 shadow-sm mb-4">
              <CCardBody>
                <div className="feature-icon bg-primary text-white mb-3">
                  <CIcon icon={cilSend} size="xxl" />
                </div>
                <CCardTitle>3. Fulfill Orders</CCardTitle>
                <p>When you receive an order, we handle the inventory, packaging, and shipping directly to your customer.</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default HowItWorksSection
