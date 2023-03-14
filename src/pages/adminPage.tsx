import { useEffect } from 'react'
import { useAppSelector } from '../hooks/redux'
import { getAuthState } from '../store/slices/auth'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/mainLayout'

const Page: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { isAdmin, isAuthorized } = useAppSelector(getAuthState())
  useEffect(() => {
    if (!isAdmin || !isAuthorized) {
      navigate('/login')
    }
  }, [isAdmin, isAuthorized])
  return <div>asdasdas</div>
}
const AdminPage = () => (
  <MainLayout>
    <Page />
  </MainLayout>
)

export default AdminPage
