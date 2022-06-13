import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";
import logo from "assets/logo.png";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-9">
      <div className="w-1/4 h-full">
        <img className="object-contain w-full h-full" src={logo} alt="logo" />
      </div>
      <nav className="p-0 m-0 flex w-1/4">
        <li className="transitions-header">
          <a className="font-semibold text-lg px-3 py-1" href="#">
            Home
          </a>
        </li>
        <li className="transitions-header">
          <a className="font-semibold text-lg px-3 py-1" href="">
            Menu
          </a>
        </li>
        <li className="transitions-header">
          <a className="font-semibold text-lg px-3 py-1" href="">
            About us
          </a>
        </li>
      </nav>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Nhập để tìm kiếm"
          className="border-gray-600 outline-none py-0.5 px-2 rounded-l-lg border border-solid"
        />
        <SearchOutlined
          style={{ color: "#f16331", fontSize: "20px" }}
          className="border-gray-600 outline-none py-1 px-2 rounded-r-lg border border-solid"
        />
      </div>
      <div className="flex w-1/4">
        <div className="flex items-center justify-between]">
          <UserOutlined className="text-[#f16331]" />
          <span className="pl-1">
            <a href="">Sign in </a>/<a href=""> Register</a>
          </span>
        </div>
        <div className="pl-6 relative">
          <ShoppingCartOutlined
            className="relative"
            style={{ color: "#f16331", fontSize: "20px" }}
          />
          <div className="w-4 h-4 rounded-2xl absolute top-0 -right-2.5 bg-gray-800">
            <span className="text-white text-xs flex justify-center items-center">
              1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
