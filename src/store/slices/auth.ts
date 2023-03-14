import { AppDispatch } from './../index'
import { loginReq, registerReq } from './../../http/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'

interface AuthState {
  isAdmin: boolean
  isAuthorized: boolean
  username: string | null
  isLoading: boolean
  error: string | null
  isInitialized: boolean
}

interface ReturnedAuthState {
  auth: AuthState
}

const initialState: AuthState = {
  isAdmin: false,
  isAuthorized: false,
  username: null,
  isLoading: true,
  error: null,
  isInitialized: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requested: state => {
      state.isLoading = true
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    authorized: (state, action: PayloadAction<string | null>) => {
      state.isAuthorized = true
      state.isLoading = false
      state.error = null
      state.isLoading = false
      state.username = action.payload
    },
    setAdmin: state => {
      state.isAdmin = true
    },
    loggedOut: state => {
      state.isAdmin = false
      state.isAuthorized = false
      state.username = null
      state.error = null
      state.isLoading = false
    },
    loggedInAsAdmin: (state, action: PayloadAction<string | null>) => {
      state.isAdmin = true
      state.isAuthorized = true
      state.username = action.payload
      state.isLoading = false
      state.error = null
      state.isLoading = false
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
  },
})
const { reducer, actions } = slice
export const {
  authorized,
  hasError,
  loggedInAsAdmin,
  loggedOut,
  setAdmin,
  requested,
  setInitialized,
} = actions

export function logOut() {
  return async (dispatch: AppDispatch) => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    dispatch(loggedOut())
  }
}

export function getAuthState() {
  return (state: RootState): AuthState => {
    return state.auth
  }
}
export default reducer
