import { combineReducers } from 'redux'
import authReducer from './slices/auth'
import snackbarReducer from './slices/snackbar'
import menuReducer from './slices/menu'

const reducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  menu: menuReducer,
})

export default reducer
