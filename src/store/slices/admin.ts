import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'

interface IAdminState {
  isLogsAnalyzed: boolean
  isLoading: boolean
}

const initialState: IAdminState = {
  isLogsAnalyzed: false,
  isLoading: false,
}

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logsAnalysis(state, action: PayloadAction<boolean>) {
      state.isLogsAnalyzed = action.payload
    },
    logsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  },
})

export default menu.reducer

export function getAdminState() {
  return (state: RootState): IAdminState => {
    return state.admin
  }
}

export const { logsAnalysis, logsLoading } = menu.actions
