import React, { Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'
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
const AboutUs = React.lazy(() => import('./views/landing/AboutUs'))

// Layout Wrapper Components
const PublicRoute = ({ children }) => {
  const { user: currentUser } = useSelector((state) => state.auth)
  return !currentUser ? children : <Navigate to="/dashboard" replace />
}

const ProtectedRoute = ({ children }) => {
  const { user: currentUser } = useSelector((state) => state.auth)
  return currentUser ? children : <Navigate to="/landing" replace />
}

// Layout Wrappers
const LandingLayoutWrapper = () => {
  return (
    <LandingLayout>
      <Outlet />
    </LandingLayout>
  )
}

const App = () => {
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
            {/* Auth Routes - Public Only */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            {/* Landing Routes with Layout */}
            <Route element={<LandingLayoutWrapper />}>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/landing/products" element={<ProductPage />} />
              <Route path="/landing/about" element={<AboutUs />} />
              <Route path="/landing/categories" element={<div>Categories Page</div>} />
              <Route path="/landing/deals" element={<div>Hot Deals Page</div>} />
            </Route>

            {/* Standalone Public Pages */}
            <Route path="/product/:id" element={<ProductPage />} />

            {/* Error Pages */}
            <Route path="/404" element={<Page404 />} />
            <Route path="/500" element={<Page500 />} />

            {/* Protected App Routes */}
            <Route path="/*" element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            } />

            {/* Root Redirect */}
            <Route path="/" element={<Navigate to="/landing" replace />} />

            {/* Catch all route */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </CartProvider>
  )
}

export default App
