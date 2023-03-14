import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import $host from '../utils/axios'
import refreshToken from '../utils/refreshToken'
import {
  authorized,
  getAuthState,
  hasError,
  logOut,
  loggedInAsAdmin,
  setInitialized,
} from '../store/slices/auth'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import Loader from './Loader'
import { Role } from '../http/auth'

interface IAccessTokenData {
  exp: number
  iat: number
  id: number
  username: string
  roles: Role[]
}

interface IAuthProvider {
  children: React.ReactElement
}

export const verifyToken: Function = (token: string): Boolean => {
  if (!token) {
    return false
  }
  const decoded: { exp: number } = jwtDecode(token)
  return decoded.exp > Date.now() / 1000
}

export const setSession = (access: string): void => {
  if (access) {
    localStorage.setItem('access', access)
    $host.defaults.headers.common.Authorization = `Bearer ${access}`
  } else {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh'),
      delete $host.defaults.headers.common.Authorization
  }
}

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const init = async () => {
      console.log('init')

      try {
        const access = window.localStorage.getItem('access')
        if (access && verifyToken(access)) {
          console.log('okay')

          setSession(access)

          const { roles, username }: IAccessTokenData = jwtDecode(access)
          if (roles.includes('Admin')) {
            dispatch(loggedInAsAdmin(username))
          } else {
            dispatch(authorized(username))
          }
        } else {
          const refresh = window.localStorage.getItem('refresh')

          if (refresh && verifyToken(refresh)) {
            const access = await refreshToken()
            setSession(access)

            const { roles, username }: IAccessTokenData = jwtDecode(access)
            if (roles.includes('Admin')) {
              dispatch(loggedInAsAdmin(username))
            } else {
              dispatch(authorized(username))
            }
          } else {
            dispatch(logOut())
          }
        }
      } catch (e) {
        dispatch(hasError(e as string))
        dispatch(logOut())
      }
    }
    init()
  }, [])

  return children
}

export default AuthProvider
