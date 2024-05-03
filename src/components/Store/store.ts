import type { Category } from "./../../types/categories.d";
// store.ts
import type { Task } from "@/types/categories";
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
    deleteCategory(state, action: PayloadAction<{ CategoryName: string }>) {
      const { CategoryName } = action.payload;
      return state.filter((x) => x.name !== CategoryName);
    },
    EditCategory(
      state,
      action: PayloadAction<{
        OldCategoryName: string;
        NewCategoryName: string;
      }>,
    ) {
      const { OldCategoryName, NewCategoryName } = action.payload;
      const CategoryToEdit = state.find(
        (category: Category) => category.name === OldCategoryName,
      );
      if (CategoryToEdit) {
        CategoryToEdit.name = NewCategoryName;
      }
    },
    DeleteTask(
      state,
      action: PayloadAction<{ Category: string; Task: string }>,
    ) {
      const { Category, Task } = action.payload;
      const TaskToDelete = state.find((category) => category.name === Category);
      if (TaskToDelete) {
        TaskToDelete.tasks = TaskToDelete.tasks?.filter(
          (x) => x.issue_title !== Task,
        );
      }
    },
    EditEachTask(state, action: PayloadAction<{ task: Task }>) {
      const { task } = action.payload;
      const FindCategory = state.find(
        (category) => category.name === task.categoryName,
      );
      if (FindCategory) {
        FindCategory.tasks = FindCategory.tasks?.map((x) =>
          x.issue_number === task.issue_number ? task : x,
        );
      }
    },
  },
});

export const {
  addCategory,
  addTask,
  deleteCategory,
  EditCategory,
  DeleteTask,
  EditEachTask,
} = categorySlice.actions;

const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
