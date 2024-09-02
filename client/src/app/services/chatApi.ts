import { Chat, ChatResponse } from "../types";
import { api } from "./api";


export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation<ChatResponse, { receiverId: string }>({
      query: (receiverId) => ({
        url: '/chat',
        method: 'POST',
        body: receiverId
      })
    }),

    getChats: builder.query<{ chats: Chat[] }, void>({
      query: () => ({
        url: '/chat',
        method: 'GET'
      })
    }),

    deleteChat: builder.mutation<{ message: string }, string>({
      query: (chatId) => ({
        url: `/chat/${chatId}`,
        method: 'DELETE',
      })
    }),
  }),
})

export const { useCreateChatMutation, useGetChatsQuery, useDeleteChatMutation, useLazyGetChatsQuery } = chatApi