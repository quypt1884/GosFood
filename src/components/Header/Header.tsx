import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { notification } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";

import logo from "assets/logo.png";
import {
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_UER_ABOUTUS,
  PATH_UER_MENU
} from "routes/routes.paths";
import styles from "./Header.module.css";
import { logout, reset } from "store/authSlice";
import { AppDispatch } from "store";

interface User {
  address: string;
  email: string;
  firstName: string;
  isAdmin: boolean | null;
  lastName: string;
  phone: string;
}
const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User>({
    address: "",
    email: "",
    firstName: "",
    isAdmin: null,
    lastName: "",
    phone: ""
  });

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      setUsers(JSON.parse(user));
    }
  }, []);
  const handleClickLogout = () => {
    notification.success({
      message: "Success logout"
    });
    dispatch(logout());
    dispatch(reset());
    navigate("/auth/login");
  };
  return (
    <div className="mx-auto my-0 max-w-7xl">
      <div className="flex justify-between items-center h-16">
        <div className="h-full">
          <img className="object-contain w-auto h-full" src={logo} alt="logo" />
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
            <NavLink
              to={PATH_UER_ABOUTUS}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-lg px-2 mx-2 py-1 hover:text-[#f16331] text-[#f16331]"
                  : "font-semibold text-lg px-2 mx-2 py-1 hover:text-[#f16331]"
              }
            >
              About Us
            </NavLink>
          </li>
        </nav>
        <div className="w-2/5 flex items-center justify-between">
          <div className=" flex items-center mr-2">
            <input
              type="text"
              placeholder="Enter to search..."
              className="border-gray-600 outline-none py-1 px-2 rounded-l-lg border border-solid text-base"
            />
            <SearchOutlined className="border-gray-600 outline-none py-0.5 px-2 rounded-r-lg border border-solid text-[#f16331] text-lg cursor-pointer" />
          </div>
          <div className="flex justify-between items-center">
            <div className={styles["sign-in"]}>
              <UserOutlined className="text-[#f16331] text-base" />
              {users ? (
                <span className="pl-2 flex items-center w-36">
                  {users?.firstName + " " + users?.lastName}
                </span>
              ) : (
                <span className="pl-2 flex items-center w-36">
                  Sign in / Sign up
                </span>
              )}
              <div className={styles["sign-in-hover"]}>
                {users.firstName && users.lastName && users.email ? (
                  <>
                    <Link to={PATH_LOGIN}>My Account</Link>
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
            <div className="pl-6 relative mr-6">
              <ShoppingCartOutlined className="relative text-[#f16331] text-xl cursor-pointer" />
              <div className="w-4 h-4 rounded-2xl absolute top-0 -right-2.5 bg-gray-800">
                <span className="text-white text-xs flex justify-center items-center">
                  1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
