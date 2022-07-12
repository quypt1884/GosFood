import { ICart } from "./../types/cart.model";
import { createSlice } from "@reduxjs/toolkit";

export interface InitialStateType {
  cartItems: ICart[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState: InitialStateType = {
  cartItems: [] as ICart[],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const id = action.payload.id;

      const itemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += Number(action.payload.quantity);
      } else
        state.cartItems.push({
          quantity: action.payload.quantity,
          ...action.payload
        });
    },

    updateQuantity(state, action) {
      const id = action.payload.id;

      const itemIndex = state.cartItems.findIndex((item) => item.id === id);
      state.cartItems[itemIndex].quantity = Number(action.payload.quantity);
    },

    removeItem(state, action) {
      const nextCartItems = state.cartItems.filter((cartItem: ICart) => {
        return cartItem.id !== action.payload.id;
      });
      state.cartItems = nextCartItems;
    },

    decrement(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );

        state.cartItems = nextCartItems;
      }
    },

    clearCart(state) {
      state.cartItems = [];
    },

    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { newPrice, quantity } = cartItem;
          const itemTotal = newPrice * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    }
  }
});

export const {
  addToCart,
  removeItem,
  decrement,
  clearCart,
  getTotals,
  updateQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
