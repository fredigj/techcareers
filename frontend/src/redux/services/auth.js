import {api} from './api'

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSignin: builder.mutation({
            query: (body) => ({
                url: `api/login`,
                method: 'POST',
                body,
            }),
        }),
        getSignout: builder.mutation({
            query: () => ({
                url: `api/logout`,
                method: 'POST'
            }),
        }),
        getRegister: builder.mutation({
            query: (body) => ({
                url: `api/register`,
                method: 'POST',
                body,
            }),
        }),
        getSignInWithGoogle: builder.query({
            query: (code) => (`api/auth/google/callback?code=${code}`),
        }),
        getResetPasswordLink: builder.mutation({
            query: (body) => ({
                url: `api/forgot-password`,
                method: 'POST',
                body,
            }),
        }),
        setNewPassword: builder.mutation({
            query: (body) => ({
                url: `api/reset`,
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
  })
  
  export const { useGetSigninMutation, 
    useGetSignoutMutation, 
    useGetRegisterMutation, 
    useLazyGetSignInWithGoogleQuery,
    useGetResetPasswordLinkMutation,
    useSetNewPasswordMutation
} = authApi