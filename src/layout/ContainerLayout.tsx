import { Route, Routes } from "react-router-dom";

import AuthLayout from "layout/auth/AuthLayout";
import AppLayout from "layout/app/AppLayout";
import AdminLayout from "layout/admin/AdminLayout";
import {
  PATH_UER_MENU,
  PATH_UER_ABOUTUS,
  PATH_REGISTER,
  PATH_LOGIN,
  PATH_ADMIN
} from "routes/routes.paths";
import HomePage from "pages/app/HomePage/HomePage";
import LoginPage from "pages/auth/LoginPage/LoginPage";
import Dashboard from "pages/admin/Dashboard/Dashboard";
import RegisterPage from "pages/auth/LoginPage/RegisterPage";

const ContainerLayout = () => {
  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path={PATH_UER_MENU} element={<HomePage />} />
          <Route path={PATH_UER_ABOUTUS} element={<HomePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={PATH_LOGIN} element={<LoginPage />} />
          <Route path={PATH_REGISTER} element={<RegisterPage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={PATH_ADMIN} element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default ContainerLayout;
