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
                url: `api/create-experience`,
                method: 'POST',
                body,
            }),
        }),
        updateSeekerExperience: builder.mutation({
            query: ({body, id}) => ({
                url: `api/update-experience/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteSeekerExperience: builder.mutation({
            query: (id) => ({
                url: `api/delete-experience/${id}`,
                method: 'DELETE'
            }),
        }),
    }),
    overrideExisting: false,
  })
  
  export const { useGetSeekerProfileQuery, 
    useUpdateSeekerProfileMutation, 
    useAddSeekerExperienceMutation, 
    useUpdateSeekerExperienceMutation,
    useDeleteSeekerExperienceMutation
} = profileApi