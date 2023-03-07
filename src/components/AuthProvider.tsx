import * as React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate()
  let isAuth = false
  React.useEffect(() => {
    if (!isAuth) {
      navigate('/')
    } else {
      navigate('/admin')
    }
  }, [isAuth])

  return children
}

export default AuthProvider
