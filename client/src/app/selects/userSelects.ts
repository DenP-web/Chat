import { RootState } from "../store"

export const selectUser = (state: RootState) => state.user.user
export const selectUserIsAuthenticated = (state: RootState) => state.user.isAuthenticated