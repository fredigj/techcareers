import {api} from './api'

const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSeekerProfile: builder.query({
            query: (id) => (`api/profile/${id}`),
        }),
    }),
    overrideExisting: false,
  })
  
  export const { useGetSeekerProfileQuery } = profileApi