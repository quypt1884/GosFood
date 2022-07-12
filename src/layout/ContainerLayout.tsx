import { Route, Routes } from "react-router-dom";

import AuthLayout from "layout/auth/AuthLayout";
import AppLayout from "layout/app/AppLayout";
import AdminLayout from "layout/admin/AdminLayout";
import {
  PATH_UER_MENU,
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
  PATH_ADMIN_CATEGORY_ADD,
  PATH_ADMIN_ORDER_DETAIL,
  PATH_UER_PRODUCT_DETAIL,
  PATH_USER_CART,
  PATH_USER_CHECKOUT,
  PATH_USER_ORDERDETAIL,
  PATH_USER_ORDER_LIST,
  PATH_USER_CHECK_ORDER
} from "routes/routes.paths";
import HomePage from "pages/app/HomePage/HomePage";
import LoginPage from "pages/auth/LoginPage/LoginPage";
import Dashboard from "pages/admin/Dashboard/DashboardPage";
import RegisterPage from "pages/auth/LoginPage/RegisterPage";
import ProductListPage from "pages/admin/ProductsPage/ProductListPage";
import ProductAddPage from "pages/admin/ProductsPage/ProductAddPage";
import ProductDetailPage from "pages/admin/ProductsPage/ProductDetailPage";
import CategoriListPage from "pages/admin/Categories/CategoriListPage";
import CategoriDetailPage from "pages/admin/Categories/CategoriDetailPage";
import CategoriAddPage from "pages/admin/Categories/CategoriAddPage";
import CategoriEditPage from "pages/admin/Categories/CategoriEditPage";
import ProductEditPage from "pages/admin/ProductsPage/ProductEditPage";
import OrderDetailPage from "pages/admin/OrdersAdminPage/OrderDetailPage";
import UserListPage from "pages/admin/UsersAdminPage/UserListPage";
import OrderListPage from "pages/admin/OrdersAdminPage/OrderListPage";
import MenuPage from "pages/app/MenuPage/MenuPage";
import ProductDetailPageApp from "pages/app/MenuPage/ProductDetailPage";
import CartPage from "pages/app/CartPage/CartPage";
import CheckoutPage from "pages/app/CartPage/CheckoutPage";
import MyOrderListPage from "pages/app/OrderPage/MyOrderListPage";
import CheckOrderPage from "pages/app/OrderPage/CheckOrderPage";
import OrderDetaiUserPage from "pages/app/OrderPage/OrderDetaiUserPage";

const ContainerLayout = () => {
  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path={PATH_UER_MENU} element={<MenuPage />} />
          <Route path={PATH_UER_PRODUCT_DETAIL} element={<ProductDetailPageApp />} />
          <Route path={PATH_USER_CHECK_ORDER} element={<CheckOrderPage />} />
          <Route path={PATH_USER_CART} element={<CartPage />} />
          <Route path={PATH_USER_CHECKOUT} element={<CheckoutPage />} />
          <Route path={PATH_USER_ORDERDETAIL} element={<OrderDetaiUserPage />} />
          <Route path={PATH_USER_ORDER_LIST} element={<MyOrderListPage />} />
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

          <Route path={PATH_ADMIN_USER} element={<UserListPage />} />

          <Route path={PATH_ADMIN_PRODUCT} element={<ProductListPage />} />
          <Route path={PATH_ADMIN_PRODUCT_ADD} element={<ProductAddPage />} />
          <Route path={PATH_ADMIN_PRODUCT_EDIT} element={<ProductEditPage />} />
          <Route path={PATH_ADMIN_PRODUCT_DETAIL} element={<ProductDetailPage />} />

          <Route path={PATH_ADMIN_ORDER} element={<OrderListPage />} />
          <Route path={PATH_ADMIN_ORDER_DETAIL} element={<OrderDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default ContainerLayout;
