import {api} from './api'

const settingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        editProfile: builder.mutation({
            query: (body) => ({
                url: `api/login`,
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
  })
  
  export const { useEditProfileMutation } = settingsApi