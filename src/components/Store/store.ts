// store.ts
import type { Category } from "@/types/categories";
import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const initialState: Category[] = [];

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.push(action.payload);
    },
  },
});

export const { addCategory } = categorySlice.actions;

const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
