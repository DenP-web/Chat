import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import chatSlice from "./slices/chatSlice"
import { api } from "./services/api"
import userSlice from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    chat: chatSlice,
    user: userSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
