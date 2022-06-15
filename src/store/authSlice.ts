import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
    }
  }
});

const { loginSuccess } = authSlice.actions;

export const login = createAsyncThunk(
  "login",
  async (params: { email: string; password: string}) => {
    const res = await axios.post("http://localhost:3000/login", params);
  }
);

export default authSlice.reducer;
