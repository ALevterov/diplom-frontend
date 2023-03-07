import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AuthProvider from '../components/AuthProvider'
import AdminPage from '../pages/adminPage'
import HomePage from '../pages/homePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    ),
  },
  {
    path: '/admin',
    element: (
      <AuthProvider>
        <AdminPage />
      </AuthProvider>
    ),
  },
])

export default router
