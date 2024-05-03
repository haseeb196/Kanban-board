import type { store } from "@/pages/_app";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string | null;
  password: string | null;
  loggedIn: boolean;
}

const initialState: User = {
  username: null,
  password: null,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(
      state,
      action: PayloadAction<{ username: string; password: string }>,
    ) {
      const { username, password } = action.payload;
      state.password = password;
      state.username = username;
    },
    checkUser(
      state,
      action: PayloadAction<{ username: string; password: string }>,
    ) {
      const { username, password } = action.payload;
      // Add logic to check if username and password match
      const isLoggedIn =
        state.username === username && state.password === password;
      return {
        ...state,
        loggedIn: isLoggedIn,
      };
    },
    checkLocal(state, action: PayloadAction<User>) {
      const { username, password, loggedIn } = action.payload;
      return {
        username,
        password,
        loggedIn,
      };
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});

export const { addUser, checkUser, checkLocal, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;

export type UserRootState = ReturnType<typeof store.getState>;
