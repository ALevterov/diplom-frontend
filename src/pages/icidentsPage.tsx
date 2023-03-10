import { useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/mainLayout'
import { useAppSelector } from '../hooks/redux'
import { getAuthState } from '../store/slices/auth'
import { useEffect } from 'react'
const Page: React.FC = () => {
  const navigate = useNavigate()
  const { isAdmin, isAuthorized } = useAppSelector(getAuthState())
  useEffect(() => {
    if (!isAdmin || !isAuthorized) {
      navigate('/login')
    }
  }, [])
  return <div>Инциденты</div>
}
const IncidentsPage = () => (
  <MainLayout>
    <Page />
  </MainLayout>
)
export default IncidentsPage
