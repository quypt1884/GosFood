import { ICategory } from "./../types/category.model";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getListCategories = createAsyncThunk(
  "categories/getListCategories",
  async (param?: { page?: number; limit?: number }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/categories?_page=${param?.page}&_limit=${param?.limit}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const getTotalCategories = createAsyncThunk(
  "categories/getTotalCategories",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export interface InitialStateType {
  categories: ICategory[];
  isLoading: boolean;
  total: ICategory[];
}

const initialState: InitialStateType = {
  categories: [] as ICategory[],
  isLoading: false,
  total: [] as ICategory[]
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
        state.categories = action.payload;
      })
      .addCase(getListCategories.rejected, (state) => {
        state.isLoading = false;
        state.categories = [] as ICategory[];
      })
      .addCase(getTotalCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.total = action.payload;
      });
  }
});

export default categoriesSlice.reducer;
