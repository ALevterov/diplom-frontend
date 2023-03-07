import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
	isAdmin: boolean,
	isAuthorized: boolean,
	username: String | null
}
const initialState: AuthState = {
	isAdmin: false,
	isAuthorized: false,
	username: null
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {

	}
})

export default slice.reducer
