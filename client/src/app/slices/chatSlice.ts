import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "../types";


export interface IInitialState {
  chat: Chat | null,
  isChatSelected: boolean
}


const initialState: IInitialState = {
  chat: null,
  isChatSelected: false
}

const chatSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    join: (state, {payload}: {payload: Chat}) => {
      state.chat = payload
      state.isChatSelected = true
    },
    leave: (state) => {
      state.chat = null
      state.isChatSelected = false
    },
  },
})

export const {join, leave} = chatSlice.actions

export default chatSlice.reducer