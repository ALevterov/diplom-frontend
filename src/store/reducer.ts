import { combineReducers } from 'redux'
import authReducer from './slices/auth'
import snackbarReducer from './slices/snackbar'

const reducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
})

export default reducer
