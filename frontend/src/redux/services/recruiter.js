import {api} from './api'

const recruiterApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRecruiterDetails: builder.query({
            query: (id) => (`api/recruiter/${id}`),
        }),
        getCompanyDetails: builder.query({
            query: (id) => (`api/company/${id}`),
        }),
        createCompany: builder.mutation({
            query: (body) => ({
                url: `api/create-company`,
                method: 'POST',
                body,
            }),
        }),
        createJobPost: builder.mutation({
            query: (body) => ({
                url: `api/create-post`,
                method: 'POST',
                body,
            }),
        }),
        updateJobPost: builder.mutation({
            query: ({body, id}) => ({
                url: `api/update-post/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteJobPost: builder.mutation({
            query: (id) => ({
                url: `api/delete-post/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false,
  })
  
  export const { useGetRecruiterDetailsQuery,
    useGetCompanyDetailsQuery,
    useCreateCompanyMutation,
    useCreateJobPostMutation,
    useUpdateJobPostMutation,
    useDeleteJobPostMutation
} = recruiterApi