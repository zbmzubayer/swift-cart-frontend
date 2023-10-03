import { api } from '@/redux/api/apiSlice';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: payload => ({ url: '/auth/login', method: 'POST', body: payload }),
      transformErrorResponse: error => {
        return error.data;
      },
    }),
    getUserByToken: builder.query({
      query: (token: string) => ({
        url: '/auth/user-profile',
        method: 'GET',
        headers: { authorization: token },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserByTokenQuery } = authApi;
