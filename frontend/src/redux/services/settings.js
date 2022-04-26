import {api} from './api'

const settingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        editProfile: builder.mutation({
            query: (body) => ({
                url: `api/update-profile`,
                method: 'PUT',
                body,
            }),
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: `api/change-password`,
                method: 'POST',
                body,
            }),
        }),
        deleteAccount: builder.mutation({
            query: (body) => ({
                url: `api/reset`,
                method: 'POST',
                body,
            }),
        }),
        updateAvatar: builder.mutation({
            query: (body) => ({
                url: `api/reset`,
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
  })
  
  export const { useEditProfileMutation, 
    useChangePasswordMutation, 
    useDeleteAccountMutation, 
    useUpdateAvatarMutation 
} = settingsApi