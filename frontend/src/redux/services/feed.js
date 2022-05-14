import {api} from './api'

const feedApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getJobPostDetails: builder.query({
            query: (id) => (`api/post/${id}`),
        }),
    }),
    overrideExisting: false,
  })
  
  export const {
      useGetJobPostDetailsQuery,
} = feedApi