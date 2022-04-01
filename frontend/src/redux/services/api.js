import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:8000/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
        
            if (token) {
            headers.set('authorization', `Bearer ${token}`)
            }
        
            return headers
        },
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getLogin: builder.mutation({
            query: (body) => ({
                url: `api/login`,
                method: 'POST',
                body,
            }),
        }),
        getCsrfCookie: builder.query({
            query: () => (`sanctum/csrf-cookie`),
        }),
    }),
})

export const { useGetLoginMutation, useLazyGetCsrfCookieQuery } = api;