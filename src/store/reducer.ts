import {combineReducers} from 'redux'
import authReducer from './slices/auth'

const reducer = combineReducers({
	auth: authReducer
})

export default reducer