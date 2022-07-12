import { createSlice } from "@reduxjs/toolkit";
import { IOrder } from "types/order.model";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getListOrder = createAsyncThunk("order/getListOrder", async (status?: string) => {
  try {
    if(status)
    return await (await (axios.get(`http://localhost:3000/orders?status_like=${status}`))).data;
    return await (await (axios.get(`http://localhost:3000/orders`))).data;
  } catch (error: any) {
    console.log(error);
  }
});

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (newOrder: IOrder) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/orders/${newOrder.id}`,
        newOrder
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const getOrderbyId = createAsyncThunk(
  "order/getOrderbyId",
  async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/orders/${id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/orders/${id}`);
      return id;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/addProducts",
  async (newOrder: {
    userId?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    orderDetail: [
      {
        id: number;
        quantity: number;
        isReview: boolean;
      }
    ];
    totalMoney: number;
  }) => {
    try {
      const response = await axios.post("http://localhost:3000/orders", {
        ...newOrder,
        status: "Placed",
        dateOrder: Date.now()
      });
      console.log(newOrder);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export interface InitialStateType {
  orders: IOrder[];
  isLoading: boolean;
  total: number;
  orderDetail: IOrder;
}

const initialState: InitialStateType = {
  orders: [] as IOrder[],
  isLoading: false,
  total: 0,
  orderDetail: {} as IOrder
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(getListOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.reverse();
      })
      .addCase(getListOrder.rejected, (state) => {
        state.isLoading = false;
        state.orders = [] as IOrder[];
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return {
              ...action.payload
            };
          }
          return order;
        });
        state.orderDetail = { ...action.payload };
      })
      .addCase(getOrderbyId.fulfilled, (state, action) => {
        state.orderDetail = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const newOrdersList = state.orders.filter(
          (order) => order.id !== action.payload
        );
        state.orders = [...newOrdersList];
        state.total = newOrdersList.length;
      });
  }
});

export default ordersSlice.reducer;
