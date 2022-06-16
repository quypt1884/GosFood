import { Link } from "react-router-dom";
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

const Header = () => {
  return (
    <div className="mx-auto my-0 max-w-7xl">
      <div className="flex justify-between items-center h-9">
        <div className="w-1/4 h-full">
          <img className="object-contain w-full h-full" src={logo} alt="logo" />
        </div>
        <nav className="p-0 m-0 flex w-1/4">
          <li className={styles["transitions-header"]}>
            <Link
              to="/"
              className="font-semibold text-lg px-3 py-1 hover:text-[#f16331]"
            >
              Home
            </Link>
          </li>
          <li className={styles["transitions-header"]}>
            <Link
              to={PATH_UER_MENU}
              className="font-semibold text-lg px-3 py-1 hover:text-[#f16331]"
            >
              Menu
            </Link>
          </li>
          <li className={styles["transitions-header"]}>
            <Link
              to={PATH_UER_ABOUTUS}
              className="font-semibold text-lg px-3 py-1 hover:text-[#f16331]"
            >
              About Us
            </Link>
          </li>
        </nav>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Nhập để tìm kiếm"
            className="border-gray-600 outline-none py-0.5 px-2 rounded-l-lg border border-solid"
          />
          <SearchOutlined className="border-gray-600 outline-none py-0.5 px-2 rounded-r-lg border border-solid text-[#f16331] text-sm" />
        </div>
        <div className="flex w-1/4 ml-2">
          <div className={styles["sign-in"]}>
            <UserOutlined className="text-[#f16331] text-base" />
            <span className="w-6"></span>
            <div className={styles["sign-in-hover"]}>
              <Link to={PATH_LOGIN}>Sign in</Link>
              <Link to={PATH_REGISTER}>Register</Link>
            </div>
          </div>
          <div className="pl-6 relative">
            <ShoppingCartOutlined className="relative text-[#f16331] text-xl" />
            <div className="w-4 h-4 rounded-2xl absolute top-0 -right-2.5 bg-gray-800">
              <span className="text-white text-xs flex justify-center items-center">
                1
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
