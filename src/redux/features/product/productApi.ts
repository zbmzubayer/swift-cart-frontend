import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => '/product',
    }),
    getProductById: builder.query({
      query: (id: string) => `/product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
