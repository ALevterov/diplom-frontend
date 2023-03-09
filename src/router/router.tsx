import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AuthProvider from '../components/AuthProvider'
import AdminPage from '../pages/adminPage'
import LoginPage from '../pages/loginPage'

const router = createBrowserRouter([
  {
    path: '*',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
])

export default router
