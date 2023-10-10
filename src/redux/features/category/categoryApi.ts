import { api } from '@/redux/api/apiSlice';

const categoryApi = api.injectEndpoints({
  endpoints: builder => ({
    createCategory: builder.mutation({
      query: payload => ({
        url: '/category',
        method: 'POST',
        body: payload,
      }),
    }),
    getCategories: builder.query({
      query: () => '/category',
    }),
    getCategoryById: builder.query({
      query: (id: string) => `/category/${id}`,
    }),
    updateCategory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/category/${id}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
