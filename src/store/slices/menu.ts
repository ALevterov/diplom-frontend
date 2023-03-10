import { createSlice } from '@reduxjs/toolkit'

interface IMenuState {
  selectedItem: string[]
  drawerOpen: boolean
}

const initialState: IMenuState = {
  selectedItem: ['dashboard'],
  drawerOpen: true,
}

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.selectedItem = action.payload
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload
    },
  },
})

export default menu.reducer

export const { activeItem, openDrawer } = menu.actions
