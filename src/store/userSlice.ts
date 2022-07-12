import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { IUser } from "types/user.model";

export const getListUsers = createAsyncThunk("users/getListUsers", async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users`);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async (newUser: IUser) => {
    try {
      const response = await axios.post("http://localhost:3000/users", newUser);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (newUser: IUser) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${newUser.id}`,
        newUser
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const getUserbyId = createAsyncThunk(
  "users/getUserbyId",
  async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      return id;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export interface InitialStateType {
  users: IUser[];
  isLoading: boolean;
  total: number;
  userDetail: IUser;
}

const initialState: InitialStateType = {
  users: [] as IUser[],
  isLoading: false,
  total: 0,
  userDetail: {} as IUser
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.reverse();
      })
      .addCase(getListUsers.rejected, (state) => {
        state.isLoading = false;
        state.users = [] as IUser[];
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const id = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        state.users[id] = {
          ...state.users[id],
          ...action.payload
        };
        state.userDetail = { ...action.payload };
      })
      .addCase(getUserbyId.fulfilled, (state, action) => {
        state.userDetail = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const newUserList = state.users.filter(
          (user: IUser) => user.id !== action.payload
        );
        state.users = [...newUserList];
        state.total = newUserList.length;
      });
  }
});

export default usersSlice.reducer;
