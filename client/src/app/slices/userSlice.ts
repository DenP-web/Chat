import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "../services/authApi";

import { User } from "../types";

export interface IInitialState {
  user: User | null,
  isAuthenticated: boolean,
}

const initialState: IInitialState = {
  user: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action: { payload: { message: string, user: User } }) => {
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action: { payload: { message: string, user: User } }) => {
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addMatcher(authApi.endpoints.checkUser.matchFulfilled, (state, action: { payload: User }) => {
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addMatcher(authApi.endpoints.checkUser.matchRejected, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export default userSlice.reducer

