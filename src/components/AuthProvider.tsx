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

interface IUserData {
  isAdmin: boolean
  username: string | null
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
  const { isLoading } = useAppSelector(getAuthState())
  console.log(isLoading)

  useEffect(() => {
    const init = async () => {
      try {
        const access = window.localStorage.getItem('access')
        if (access && verifyToken(access)) {
          setSession(access)
          const { isAdmin, username }: IUserData = jwtDecode(access)
          if (isAdmin) {
            dispatch(loggedInAsAdmin(username))
          } else {
            dispatch(authorized())
          }
        } else {
          console.log(1)

          const refresh = window.localStorage.getItem('refresh')

          if (refresh && verifyToken(refresh)) {
            const access = await refreshToken()
            setSession(access)

            const { isAdmin, username }: IUserData = jwtDecode(access)
            if (isAdmin) {
              dispatch(loggedInAsAdmin(username))
            } else {
              dispatch(authorized())
            }
          } else {
            console.log(2)

            dispatch(logOut())
          }
        }
      } catch (e) {
        console.log(3)

        dispatch(hasError(e as string))
        dispatch(logOut())
      }
    }
    init()
  }, [])

  return children
}

export default AuthProvider
