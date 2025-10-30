import React, { useState, useEffect } from 'react'
import orderService from '../../services/order.service'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

const OrderList = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    orderService.getOrders().then(
      (response) => {
        setOrders(response.data)
      },
      (error) => {
        console.log('Error fetching orders:', error)
      }
    )
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>My Orders</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orders.map((order) => (
                  <CTableRow key={order.id}>
                    <CTableHeaderCell scope="row">{order.id}</CTableHeaderCell>
                    <CTableDataCell>${order.totalAmount}</CTableDataCell>
                    <CTableDataCell>{order.status}</CTableDataCell>
                    <CTableDataCell>{new Date(order.createdAt).toLocaleDateString()}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default OrderList
