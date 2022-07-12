import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { notification } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

import logo from "assets/logo.png";
import {
  PATH_ADMIN,
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_UER_MENU,
  PATH_USER_CART,
  PATH_USER_CHECK_ORDER,
  PATH_USER_ORDER_LIST
} from "routes/routes.paths";
import styles from "./Header.module.css";
import { logout, reset } from "store/authSlice";
import { AppDispatch, RootState } from "store";
import { useSelector } from "react-redux";
import { getTotals } from "store/cartSlice";
import Search from "components/Search/Search";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { token, users } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems]);

  const handleClickLogout = () => {
    notification.success({
      message: "Success logout"
    });
    dispatch(logout());
    dispatch(reset());
  };
  return (
    <div className="mx-auto my-0 max-w-7xl">
      <div className="flex justify-between items-center h-16">
        <div className="h-full">
          <Link to="/">
          <img className="object-contain w-auto h-full" src={logo} alt="logo" />
          </Link>
        </div>
        <nav className="p-0 m-0 flex ">
          <li className={styles["transitions-header"]}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-lg px-2 mx-2 py-1 hover:text-[#f16331] text-[#f16331]"
                  : "font-semibold text-lg px-2 mx-2 py-1 hover:text-[#f16331]"
              }
            >
              Home
            </NavLink>
          </li>
          <li className={styles["transitions-header"]}>
            <NavLink
              to={PATH_UER_MENU}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-lg px-2 mx-2 py-1 hover:text-[#f16331] text-[#f16331]"
                  : "font-semibold text-lg px-2 mx-2 py-1 hover:text-[#f16331]"
              }
            >
              Menu
            </NavLink>
          </li>
          <li className={styles["transitions-header"]}>
            {token ? (
              <NavLink
                to={PATH_USER_ORDER_LIST}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-lg px-2 mx-2 py-1 hover:text-[#f16331] text-[#f16331]"
                    : "font-semibold text-lg px-2 mx-2 py-1 hover:text-[#f16331]"
                }
              >
                My Order
              </NavLink>
            ) : (
              <NavLink
                to={PATH_USER_CHECK_ORDER}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-lg px-2 mx-2 py-1 hover:text-[#f16331] text-[#f16331]"
                    : "font-semibold text-lg px-2 mx-2 py-1 hover:text-[#f16331]"
                }
              >
                Check Order
              </NavLink>
            )}
          </li>
        </nav>
        <div className="w-2/5 flex items-center justify-between">
          <Search />
          <div className="flex justify-between items-center">
            <div className={styles["sign-in"]}>
              <UserOutlined className="text-[#f16331] text-base" />
              {token ? (
                <span className="pl-2 flex items-center w-36">
                  {users.firstName + " " + users.lastName}
                </span>
              ) : (
                <span className="pl-2 flex items-center w-36">
                  Sign in / Sign up
                </span>
              )}
              <div className={styles["sign-in-hover"]}>
                {users.firstName && users.lastName && users.email ? (
                  <>
                    {users.isAdmin ? (
                      <Link to={PATH_ADMIN}>Go to Admin</Link>
                    ) : (
                      ""
                    )}
                    <a onClick={handleClickLogout}>Logout</a>
                  </>
                ) : (
                  <>
                    <Link to={PATH_LOGIN}>Sign in</Link>
                    <Link to={PATH_REGISTER}>Register</Link>
                  </>
                )}
              </div>
            </div>
            <Link to={PATH_USER_CART} className="block pl-6 relative mr-6">
              <ShoppingCartOutlined className="relative text-[#f16331] text-xl cursor-pointer" />
              {cartItems.length > 0 && (
                <div className="w-4 h-4 rounded-2xl absolute top-0 -right-2.5 bg-gray-800">
                  <span className="text-white text-xs flex justify-center items-center">
                    {cartItems.length}
                  </span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
