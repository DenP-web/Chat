import { createApi, fetchBaseQuery, retry, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { authApi } from './authApi'; // Import authApi
// import { toast } from 'react-toastify';

type BaseQueryFnType = BaseQueryFn<
  string | { url: string; method?: string; body?: any; headers?: any; },
  unknown,
  FetchBaseQueryError
>;

const baseQuery: BaseQueryFnType = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    credentials: 'include',
  })(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // const logoutMutation = authApi.endpoints.logout.initiate();
    // toast.error('Your session time expired, please login')
    // await api.dispatch(logoutMutation);
  }

  return result;
};

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
