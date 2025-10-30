import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import AuthService from '../../services/auth.service' // <-- PERBAIKAN ADA DI SINI

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  const logOut = () => {
    AuthService.logout()
    setCurrentUser(undefined)
    navigate('/login')
    window.location.reload()
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          {currentUser ? currentUser.username : 'Account'}
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={logOut} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
