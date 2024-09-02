import { User, UserResponse } from "../types";
import { api } from "./api";


export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, { email: string, password: string }>({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body: userData
      })
    }),
    register: builder.mutation<UserResponse, { email: string, password: string, fullName: string }>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData
      })
    }),
    checkUser: builder.query<User, void>({
      query: () => ({
        url: '/auth/check',
        method: 'GET'
      })
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
      })
    })
  }),
})

export const { useLoginMutation, useRegisterMutation, useCheckUserQuery, useLogoutMutation, useLazyCheckUserQuery } = authApi
export const { endpoints: { login, register, checkUser, logout } } = authApi