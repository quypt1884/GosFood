import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.less";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist'
import { getListProducts } from "store/productsSlice";
import { getTotals } from "store/cartSlice";

<link href="/dist/output.css" rel="stylesheet"></link>;

const container = document.getElementById("root")!;
const root = createRoot(container);
let persistor = persistStore(store);

store.dispatch(getListProducts());
store.dispatch(getTotals());
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
