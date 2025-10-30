import React from 'react'
import { CContainer, CRow, CCol, CCard, CCardBody, CAvatar } from '@coreui/react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah J.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'This platform revolutionized my dropshipping business. The product import tool is a game-changer!',
    },
    {
      name: 'Mike T.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: 'I was up and running in a day. The seamless integration with my store and automated fulfillment saved me so much time.',
    },
    {
      name: 'Chen W.',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
      text: 'The variety of products is incredible. My customers love the quality, and I love the profit margins.',
    },
  ]

  return (
    <div className="py-5">
      <CContainer>
        <h2 className="text-center mb-5">What Our Users Say</h2>
        <CRow>
          {testimonials.map((testimonial, index) => (
            <CCol md="4" key={index} className="mb-4">
              <CCard className="h-100 border-0 shadow-sm">
                <CCardBody className="d-flex flex-column">
                  <p className="flex-grow-1">"{testimonial.text}"</p>
                  <div className="d-flex align-items-center mt-3">
                    <CAvatar src={testimonial.avatar} size="md" />
                    <div className="ms-3">
                      <strong>{testimonial.name}</strong>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CContainer>
    </div>
  )
}

export default TestimonialsSection
