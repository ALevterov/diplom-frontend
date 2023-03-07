import jwtDecode from 'jwt-decode'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export const verifyToken: Function = (token: string): Boolean => {
  if (!token) {
    return false
  }
  const decoded: { exp: number } = jwtDecode(token)
  return decoded.exp > Date.now() / 1000
}

export const setSession = (access: string): void => {
  if (access) {
    localStorage.setItem('token', access)
    axios.defaults.headers.common.Authorization = `Bearer ${access}`
  } else {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh'), localStorage.removeItem('users')
    delete axios.defaults.headers.common.Authorization
  }
}

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate()
  let isAuth = false
  React.useEffect(() => {
    const init = async () => {
      try {
        const access = window.localStorage.getItem('access')
        if (access && verifyToken(access)) {
        }
      } catch (e) {}
    }
    if (!isAuth) {
      navigate('/')
    } else {
      navigate('/admin')
    }
  }, [isAuth])

  return children
}

export default AuthProvider
