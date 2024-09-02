
import { Message } from "../types";
import { api } from "./api";

type ChatId = string

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<{ message: string }, { chatId: string, message: string }>({
      query: (messageData) => ({
        url: '/message',
        method: 'POST',
        body: messageData
      })
    }),
    updateMessage: builder.mutation<{ message: string }, { messageId: string, message: string }>({
      query: (messageData) => ({
        url: '/message',
        method: 'PUT',
        body: messageData
      })
    }),
    getMessages: builder.query<{ messages: Message[] }, ChatId | undefined>({
      query: (chatId) => {
        if (!chatId) {
          return { url: '', method: 'GET', skip: true };
        }
        return {
          url: `/message/${chatId}`,
          method: 'GET',
        };
      },
    }),

  }),
})

export const { useGetMessagesQuery, useSendMessageMutation, useUpdateMessageMutation, useLazyGetMessagesQuery } = messageApi