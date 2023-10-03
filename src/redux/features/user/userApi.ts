import { tokenKey } from '@/constants/storageKeys';
import { api } from '@/redux/api/apiSlice';
import { getFromLocalStorage } from '@/utils/local-storage';

const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: 'GET',
        headers: { authorization: getFromLocalStorage(tokenKey)! },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        body: payload,
        headers: { authorization: getFromLocalStorage(tokenKey)! },
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;
