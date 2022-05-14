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
    }),
    overrideExisting: false,
  })
  
  export const { useGetRecruiterDetailsQuery,
    useGetCompanyDetailsQuery,
    useCreateCompanyMutation
} = recruiterApi