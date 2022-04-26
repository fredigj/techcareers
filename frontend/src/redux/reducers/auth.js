import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    removeUserInfo: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUserInfo, removeUserInfo, updateUserInfo } = authSlice.actions

export default authSlice.reducer