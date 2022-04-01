import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:8000/api/' }),
    endpoints: (builder) => ({
        getLogin: builder.mutation({
            query: (body) => ({
                url: `login`,
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useGetLoginMutation } = api;