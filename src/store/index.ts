import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";

import authSlice from "./authSlice";
import categoriesSlice from "./categoriesSlice";
import orderSlice from "./orderSlice";
import productsSlice from "./productsSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";

const persistConfig = {
  key: "root",
  storage
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    auth: authSlice,
    category: categoriesSlice,
    product: productsSlice,
    user: userSlice,
    order: orderSlice,
    cart: cartSlice
  })),
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


