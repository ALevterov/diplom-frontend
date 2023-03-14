import { combineReducers } from 'redux'
import authReducer from './slices/auth'
import snackbarReducer from './slices/snackbar'
import menuReducer from './slices/menu'
import adminReducer from './slices/admin'

const reducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  menu: menuReducer,
  admin: adminReducer,
})

export default reducer
