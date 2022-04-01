import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import { api } from './services/api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})