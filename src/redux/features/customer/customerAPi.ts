import { api } from '@/redux/api/apiSlice';

const customerApi = api.injectEndpoints({
  endpoints: builder => ({
    getCustomers: builder.query({
      query: () => '/customer',
    }),
    getCustomerById: builder.query({
      query: (id: string) => `/customer/${id}`,
    }),
    updateCustomer: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/customer/${id}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const { useGetCustomersQuery, useGetCustomerByIdQuery, useUpdateCustomerMutation } = customerApi;
