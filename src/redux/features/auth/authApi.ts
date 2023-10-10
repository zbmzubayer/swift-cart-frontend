import { api } from '@/redux/api/apiSlice';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: payload => ({ url: '/auth/login', method: 'POST', body: payload, credentials: 'include' }),
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
    getRefreshToken: builder.mutation({
      query: () => ({ url: '/auth/refresh-token', method: 'GET', credentials: 'include' }),
      transformErrorResponse: error => {
        return error.data;
      },
    }),
  }),
});

export const { useLoginMutation, useGetUserByTokenQuery } = authApi;
