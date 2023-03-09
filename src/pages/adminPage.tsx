import { useEffect } from 'react'
import { useAppSelector } from '../hooks/redux'
import { getAuthState } from '../store/slices/auth'
import { useNavigate } from 'react-router-dom'

const AdminPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { isAdmin, isAuthorized } = useAppSelector(getAuthState())
  useEffect(() => {
    if (!isAdmin || !isAuthorized) {
      navigate('/login')
    }
  }, [])
  return <div>Admin Page</div>
}

export default AdminPage
