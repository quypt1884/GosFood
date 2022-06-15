import { Route, Routes } from "react-router-dom";

import "./App.css";
import AppLayout from "layout/app/AppLayout";
import HomePage from "./pages/app/HomePage/HomePage";
import AboutUsPage from "pages/app/AboutUsPage/AboutUsPage";
import LoginPage from "pages/auth/LoginPage/LoginPage";
import {
  PATH_UER_MENU,
  PATH_UER_ABOUTUS,
  PATH_REGISTER,
  PATH_LOGIN
} from "routes/routes.paths";

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path={PATH_UER_MENU} element={<HomePage />}></Route>
        <Route path={PATH_UER_ABOUTUS} element={<AboutUsPage />}></Route>
        <Route path={PATH_REGISTER} element={<HomePage />}></Route>
        <Route path={PATH_LOGIN} element={<LoginPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
