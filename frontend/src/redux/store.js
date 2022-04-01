import { configureStore } from '@reduxjs/toolkit'
import signinReducer from './reducers/signin'
import { api } from './services/api'

export const store = configureStore({
  reducer: {
    signin: signinReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})