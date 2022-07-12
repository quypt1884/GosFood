import { IProduct } from "./../types/product.model";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getListProducts = createAsyncThunk(
  "products/getList",
  async (status?:string) => {
    try {
      if(status)
       return await (await (axios.get(`http://localhost:3000/products?isStock=${status}`))).data;
      else
      return await (await (axios.get(`http://localhost:3000/products`))).data;
      
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProducts",
  async (newProduct: {
    categoryId: number;
    name: string;
    thumbnail?: string;
    price: number;
    size: string;
    decription?: string;
    discount?: number;
    newPrice?: number;
    isStock: boolean;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        newProduct
      );
      console.log(newProduct);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProducts",
  async (newProduct: {
    id: number;
    categoryId: number;
    name: string;
    thumbnail?: string;
    price: number;
    size: string;
    decription?: string;
    discount?: number;
    newPrice?: number;
    isStock: boolean;
  }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${newProduct.id}`,
        newProduct
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      return id;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export interface InitialStateType {
  products: IProduct[];
  isLoading: boolean;
  total: number;
  productDetail: IProduct;
}

const initialState: InitialStateType = {
  products: [] as IProduct[],
  isLoading: false,
  total: 0,
  productDetail: {} as IProduct
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.reverse();
      })
      .addCase(getListProducts.rejected, (state) => {
        state.isLoading = false;
        state.products = [] as IProduct[];
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const id = state.products.findIndex(
          (cate) => cate.id === action.payload.id
        );
        state.products[id] = {
          ...state.products[id],
          ...action.payload
        };
        state.productDetail = { ...action.payload };
      })
      .addCase(getProductById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productDetail = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.productDetail = {} as IProduct;
        state.isLoading = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const newProductsList = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.products = [...newProductsList];
        state.total = newProductsList.length;
      });
  }
});

export default productsSlice.reducer;
