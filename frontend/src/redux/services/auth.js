import {api} from './api'

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLogin: builder.mutation({
            query: (body) => ({
                url: `login`,
                method: 'POST',
                body,
            }),
        }),
        getLogout: builder.mutation({
            query: () => ({
                url: `logout`,
                method: 'POST'
            }),
        }),
        getRegister: builder.mutation({
            query: (body) => ({
                url: `register`,
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
  })
  
  export const { useGetLoginMutation, useGetLogoutMutation, useGetRegisterMutation } = authApi