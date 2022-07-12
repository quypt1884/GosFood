import { ICategory } from "./../types/category.model";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getListCategories = createAsyncThunk(
  "categories/getListCategories",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/categories`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const addCategories = createAsyncThunk(
  "categories/addCategories",
  async (newCategory: { name: string; description: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/categories",
        newCategory
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const updateCategories = createAsyncThunk(
  "categories/updateCategories",
  async (newCategory: { name: string; description: string; id: number }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/categories/${newCategory.id}`,
        newCategory
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const getCategorybyId = createAsyncThunk(
  "categories/getCategorybyId",
  async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/categories/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:3000/categories/${id}`
      );
      return id;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export interface InitialStateType {
  categories: ICategory[];
  isLoading: boolean;
  total: number;
  categoryDetail: ICategory;
}

const initialState: InitialStateType = {
  categories: [] as ICategory[],
  isLoading: false,
  total: 0,
  categoryDetail: {} as ICategory
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.reverse();
      })
      .addCase(getListCategories.rejected, (state) => {
        state.isLoading = false;
        state.categories = [] as ICategory[];
      })
      .addCase(addCategories.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategories.fulfilled, (state, action) => {
        const id = state.categories.findIndex(
          (cate) => cate.id === action.payload.id
        );
        state.categories[id] = {
          ...state.categories[id],
          ...action.payload
        };
        state.categoryDetail = {...action.payload}
      })
      .addCase(getCategorybyId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategorybyId.fulfilled, (state, action) => {
        state.categoryDetail = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategorybyId.rejected, (state) => {
        state.categoryDetail = {} as ICategory;
        state.isLoading = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const newCategoriesList = state.categories.filter(
          (category) => category.id !== action.payload
        );
        state.categories = [...newCategoriesList];
        state.total = newCategoriesList.length
      });
  }
});

export default categoriesSlice.reducer;
