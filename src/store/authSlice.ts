import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "types/user.model";

export const tokenLocal = localStorage.getItem("token");

export const login = createAsyncThunk(
  "auth/login",
  async (params: { email: string; password: string }, thunkApi) => {
    try {
      const response = await axios.post("http://localhost:3000/login", params);
      if (response.data) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
        if(response.data.user.isAdmin === true) {
          window.location.href = "/admin";
        }
        if(response.data.user.isAdmin === false) {
          window.location.href = "/";
        }
      }
      return response.data;
    } catch (error: any) {
      const message = error.response.data;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (params: IUser, thunkApi) => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        email: params.email,
        password: params.password,
        avatar: params.avatar,
        firstName: params.firstName,
        lastName: params.lastName,
        phone: params.phone,
        address: params.address,
        isAdmin: false
      });
      if (response.data) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
        window.location.href = "/";
      }
      return response.data;
    } catch (error: any) {
      const message = error.response.data;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// export const getUsers = createAsyncThunk(
//   "auth/users",
//   async (tokenLocal: string, thunkApi) => {
//     try {
//       const response = await axios.get("http://localhost:3000/660/users", {
//         headers: {
//           Authorization: `Bearer ${tokenLocal}`
//         },
//       });
//       return response.data;
//     } catch (error: any) {
//       const message = error.response.data;
//       return thunkApi.rejectWithValue(message);
//     }
//   }
// );
export interface InitialStateType {
  users: IUser;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
  token: string | null;
}

const initialState: InitialStateType = {
  users: {} as IUser,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  token: tokenLocal ? tokenLocal : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    logout: (state) => {
      state.token = null;
      state.users = {} as IUser;
      localStorage.removeItem("user");
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.users = {} as IUser;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.users = {} as IUser;
      });
      
  }
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
