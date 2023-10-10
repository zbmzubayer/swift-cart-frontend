import { api } from '@/redux/api/apiSlice';

const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: payload => ({
        url: '/order',
        method: 'POST',
        body: payload,
      }),
    }),
    getOrders: builder.query({
      query: () => '/order',
    }),
    getOrderById: builder.query({
      query: (id: string) => `/order/${id}`,
    }),
    updateOrder: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/order/${id}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    deleteOrder: builder.mutation({
      query: id => ({
        url: `/order/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
