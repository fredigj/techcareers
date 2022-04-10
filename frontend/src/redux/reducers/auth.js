import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    addUserInfo: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    removeUserInfo: (state) => {
      state.user = null;
      state.token = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUserInfo, removeUserInfo } = authSlice.actions

export default authSlice.reducer