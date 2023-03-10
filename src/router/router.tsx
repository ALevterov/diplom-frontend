import { createBrowserRouter } from 'react-router-dom'
import AdminPage from '../pages/adminPage'
import LoginPage from '../pages/loginPage'
import IncidentsPage from '../pages/icidentsPage'

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
  {
    path: '/incidents',
    element: <IncidentsPage />,
  },
])

export default router
