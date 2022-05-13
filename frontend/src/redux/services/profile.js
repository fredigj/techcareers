import {api} from './api'

const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSeekerProfile: builder.query({
            query: (id) => (`api/profile/${id}`),
        }),
        updateSeekerProfile: builder.mutation({
            query: (body) => ({
                url: `api/update-seeker`,
                method: 'PUT',
                body,
            }),
        }),
        addSeekerExperience: builder.mutation({
            query: (body) => ({
                url: `api/create-education`,
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
  })
  
  export const { useGetSeekerProfileQuery, useUpdateSeekerProfileMutation, useAddSeekerExperienceMutation } = profileApi