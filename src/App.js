import React, { Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner } from '@coreui/react'
import './scss/style.scss'
import { CartProvider } from './context/CartContext'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const LandingLayout = React.lazy(() => import('./layout/LandingLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const LandingPage = React.lazy(() => import('./views/landing/LandingPage'))
const ProductPage = React.lazy(() => import('./views/landing/ProductPage'))

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  return (
    <CartProvider>
      <HashRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="/landing/products" element={<ProductPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route
              path="*"
              name="Home"
              element={currentUser ? <DefaultLayout /> : <Navigate to="/landing" replace />}
            />
          </Routes>
        </Suspense>
      </HashRouter>
    </CartProvider>
  )
}

export default App
