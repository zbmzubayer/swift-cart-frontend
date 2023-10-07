import envConfig from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: envConfig.API_BASE_URL }),
  endpoints: () => ({}),
});
