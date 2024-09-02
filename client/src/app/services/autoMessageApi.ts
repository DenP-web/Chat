import { api } from "./api";

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    startAutoMessages: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/message/auto-start',
        method: 'POST',
      })
    }),
    stopAutoMessages: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/message/auto-stop',
        method: 'POST',
      })
    }),
  }),
})

export const { useStopAutoMessagesMutation, useStartAutoMessagesMutation,  } = messageApi