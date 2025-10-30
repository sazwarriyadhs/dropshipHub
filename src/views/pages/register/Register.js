import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilEnvelopeClosed } from '@coreui/icons'
import AuthService from '../../../services/auth.service'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()

    setMessage('')
    setSuccessful(false)

    if (password !== repeatPassword) {
      setMessage('Passwords do not match.')
      return
    }

    AuthService.signup(username, email, password).then(
      (response) => {
        setMessage('Registration successful! You can now log in.')
        setSuccessful(true)
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        setMessage(resMessage)
        setSuccessful(false)
      },
    )
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4 p-md-5">
                <CForm onSubmit={handleRegister}>
                  {!successful ? (
                    <>
                      <h1>Get Started</h1>
                      <p className="text-body-secondary">Create your account to start dropshipping</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          autoComplete="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilEnvelopeClosed} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          value={repeatPassword}
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          required
                        />
                      </CInputGroup>
                      <div className="d-grid">
                        <CButton type="submit" color="success">
                          Create Account
                        </CButton>
                      </div>
                      <div className="text-center mt-3">
                        <p>
                          Already have an account? <Link to="/login">Login</Link>
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <h3>Registration Successful!</h3>
                      <p>Welcome aboard! You can now log in to access your dashboard.</p>
                      <CButton color="primary" onClick={() => navigate('/login')}>
                        Go to Login
                      </CButton>
                    </div>
                  )}

                  {message && !successful && (
                    <CAlert color={'danger'} className="mt-3">
                      {message}
                    </CAlert>
                  )}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
