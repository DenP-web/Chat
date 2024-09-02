import { RootState } from "../store"

export const selectChat = (state: RootState) => state.chat.chat
export const selectIsChatSelected = (state: RootState) => state.chat.isChatSelected