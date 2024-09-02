import { User } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<{ users: User[] }, string>({
      query: (searchValue) => ({
        url: `/user?search=${searchValue}`,
        method: 'GET'
      })
    }),

    updateUser: builder.mutation<{ message: string }, FormData >({
      query: (userData) => ({
        url: `/user`,
        method: 'PUT',
        body: userData
      })
    }),

  }),
})

export const { useGetAllUsersQuery, useLazyGetAllUsersQuery, useUpdateUserMutation } = userApi