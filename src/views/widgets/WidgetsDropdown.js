import React from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBox, cilMoney, cilChart, cilPeople } from '@coreui/icons'

const WidgetsDropdown = ({ className, stats }) => {
  const { totalProducts = 0, totalProfit = 'Rp 0', averageMargin = '0.00%' } = stats || {}

  return (
    <CRow className={className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={<>{totalProducts}</>}
          title="Total Produk"
          action={<CIcon icon={cilBox} height={48} />}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="success"
          value={<>{totalProfit}</>}
          title="Total Potensi Keuntungan"
          action={<CIcon icon={cilMoney} height={48} />}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={<>{averageMargin}</>}
          title="Rata-rata Margin"
          action={<CIcon icon={cilChart} height={48} />}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value="1,256" // Static for now
          title="Pengguna Terdaftar"
          action={<CIcon icon={cilPeople} height={48} />}
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  stats: PropTypes.shape({
    totalProducts: PropTypes.number,
    totalProfit: PropTypes.string,
    averageMargin: PropTypes.string,
  }),
}

export default WidgetsDropdown
