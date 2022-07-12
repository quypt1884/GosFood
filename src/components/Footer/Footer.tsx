import {
  FacebookFilled,
  InstagramOutlined,
  MailFilled,
  PhoneOutlined,
  TwitterOutlined
} from "@ant-design/icons";

import logo from "assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto p-5 h-96 flex items-center justify-center">
      <div>
        <div className="flex items-center justify-between">
          <div className="w-1/4">
            <p className="mb-2">18 Tôn Thất Thuyết</p>
            <p className="mb-2">IDMC Buildding</p>
          </div>
          <div className="w-1/2 mx-8 flex items-center justify-center">
            <img src={logo} className="w-9/12" alt="Ảnh Logo" />
          </div>
          <div className="w-1/4">
            <p className="mb-2">Call us 24/7</p>
            <div className="flex items-center mb-2">
              <PhoneOutlined className="text-[#f16331] rotate-90 mr-3" />
              <span className="font-bold">0918982234</span>
            </div>
            <div className="flex items-center">
              <MailFilled className="text-[#f16331] mr-3" />
              <span className="font-bold">quypt@vmodev.com</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Link
            to="/"
            className="flex items-center justify-center w-12 h-12 rounded-[40px] bg-neutral-200 ml-4"
          >
            <TwitterOutlined className="text-[#f16331] text-lg" />
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center w-12 h-12 rounded-[40px] bg-neutral-200 ml-4"
          >
            <FacebookFilled className="text-[#f16331] text-lg" />
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center w-12 h-12 rounded-[40px] bg-neutral-200 ml-4"
          >
            <InstagramOutlined className="text-[#f16331] text-lg" />
          </Link>
        </div>
        <p className="flex items-center justify-center mt-4">
          &copy; 2022 Phan Thị Quy 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
