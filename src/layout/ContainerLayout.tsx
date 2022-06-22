import { Route, Routes } from "react-router-dom";

import AuthLayout from "layout/auth/AuthLayout";
import AppLayout from "layout/app/AppLayout";
import AdminLayout from "layout/admin/AdminLayout";
import {
  PATH_UER_MENU,
  PATH_UER_ABOUTUS,
  PATH_REGISTER,
  PATH_LOGIN,
  PATH_ADMIN,
  PATH_ADMIN_CATEGORY,
  PATH_ADMIN_USER,
  PATH_ADMIN_ORDER,
  PATH_ADMIN_PRODUCT,
  PATH_ADMIN_PRODUCT_ADD,
  PATH_ADMIN_PRODUCT_EDIT,
  PATH_ADMIN_PRODUCT_DETAIL,
  PATH_ADMIN_CATEGORY_EDIT,
  PATH_ADMIN_CATEGORY_DETAIL,
  PATH_ADMIN_CATEGORY_ADD
} from "routes/routes.paths";
import HomePage from "pages/app/HomePage/HomePage";
import LoginPage from "pages/auth/LoginPage/LoginPage";
import Dashboard from "pages/admin/Dashboard/Dashboard";
import RegisterPage from "pages/auth/LoginPage/RegisterPage";
import ProductListPage from "pages/admin/ProductsPage/ProductListPage";
import ProductAddPage from "pages/admin/ProductsPage/ProductAddPage";
import ProductDetailPage from "pages/admin/ProductsPage/ProductDetailPage";
import CategoriListPage from "pages/admin/Categories/CategoriListPage";
import CategoriDetailPage from "pages/admin/Categories/CategoriDetailPage";
import CategoriAddPage from "pages/admin/Categories/CategoriAddPage";
import CategoriEditPage from "pages/admin/Categories/CategoriEditPage";

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
          
          <Route path={PATH_ADMIN_CATEGORY} element={<CategoriListPage />} />
          <Route path={PATH_ADMIN_CATEGORY_DETAIL} element={<CategoriDetailPage />} />
          <Route path={PATH_ADMIN_CATEGORY_ADD} element={<CategoriAddPage />} />
          <Route path={PATH_ADMIN_CATEGORY_EDIT} element={<CategoriEditPage/>} />

          <Route path={PATH_ADMIN_USER} element={<Dashboard />} />

          <Route path={PATH_ADMIN_PRODUCT} element={<ProductListPage />} />
          <Route path={PATH_ADMIN_PRODUCT_ADD} element={<ProductAddPage />} />
          <Route path={PATH_ADMIN_PRODUCT_EDIT} element={<ProductAddPage />} />
          <Route path={PATH_ADMIN_PRODUCT_DETAIL} element={<ProductDetailPage />} />

          <Route path={PATH_ADMIN_ORDER} element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default ContainerLayout;
