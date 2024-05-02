// store.ts
import type { Category, Task } from "@/types/categories";
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
    addCategory(state, action: PayloadAction<Category>) {
      state.push(action.payload);
    },
    addTask(
      state,
      action: PayloadAction<{ checkCategory: string; task: Task }>,
    ) {
      const { checkCategory, task } = action.payload;

      const categoryToUpdate = state.find(
        (category: Category) => category.name === checkCategory,
      );
      if (categoryToUpdate) {
        categoryToUpdate.tasks = categoryToUpdate.tasks ?? [];
        categoryToUpdate.tasks.push(task);
      }
    },
  },
});

export const { addCategory, addTask } = categorySlice.actions;

const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
