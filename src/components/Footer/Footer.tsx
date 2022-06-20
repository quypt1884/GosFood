import {
  FacebookFilled,
  InstagramOutlined,
  PhoneOutlined,
  TwitterOutlined
} from "@ant-design/icons";

import logo from "assets/logo.png";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="flex items-center justify-center">
        <div className="">
          <p className="mb-2">18 Tôn Thất Thuyết</p>
          <p className="mb-2">IDMC Buildding</p>
        </div>
        <div className="w-40 mx-8">
          <img src={logo} alt="Ảnh Logo" />
        </div>
        <div>
          <p className="mb-2">Call us 24/7</p>
          <PhoneOutlined className="text-[#f16331] rotate-90" />{" "}
          <span className="font-bold">0918982234</span>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <p className="flex items-center justify-center w-10 h-10 rounded-[40px] bg-neutral-200 ml-4">
          <TwitterOutlined className="text-[#f16331]"/>
        </p>
        <p className="flex items-center justify-center w-10 h-10 rounded-[40px] bg-neutral-200 ml-4">
          <FacebookFilled className="text-[#f16331]"/>
        </p>
        <p className="flex items-center justify-center w-10 h-10 rounded-[40px] bg-neutral-200 ml-4">
          <InstagramOutlined className="text-[#f16331]"/>
        </p>
      </div>
      <p className="flex items-center justify-center mt-4">Phan Thị Quy &copy; 2022</p>
    </div>
  );
};

export default Footer;
