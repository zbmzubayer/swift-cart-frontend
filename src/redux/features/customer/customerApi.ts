import { api } from '@/redux/api/apiSlice';

const customerApi = api.injectEndpoints({
  endpoints: builder => ({
    createCustomer: builder.mutation({
      query: payload => ({
        url: '/user/create-customer',
        method: 'POST',
        body: payload,
      }),
    }),
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

export const { useCreateCustomerMutation, useGetCustomersQuery, useGetCustomerByIdQuery, useUpdateCustomerMutation } =
  customerApi;
