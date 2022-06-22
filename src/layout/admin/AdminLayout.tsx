import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import { Layout } from "antd";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  PATH_ADMIN,
  PATH_ADMIN_CATEGORY,
  PATH_ADMIN_ORDER,
  PATH_ADMIN_PRODUCT,
  PATH_ADMIN_USER
} from "routes/routes.paths";
import "./AdminLayout.style.css";
import logo from "assets/logo.png";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="p-0 m-0">
          <li className="list-none my-1 text-black hover:bg-[#fbe0d6]">
            <NavLink
              to={PATH_ADMIN}
              className={({ isActive }) =>
                isActive
                  ? "py-3 px-4 border-r-4 border-r-[#f16331] text-[#f16331] hover:text-[#f16331] flex items-center"
                  : "py-3 px-4 hover:text-[#f16331] flex items-center"
              }
            >
              <ShoppingCartOutlined className="mr-2" />
              {collapsed ? "" : "Dashboard"}
            </NavLink>
          </li>
          <li className="list-none my-1 text-black hover:bg-[#fbe0d6]">
            <NavLink
              to={PATH_ADMIN_CATEGORY}
              className={({ isActive }) =>
                isActive
                  ? "py-3 px-4 border-r-4 border-r-[#f16331] text-[#f16331] hover:text-[#f16331] flex items-center"
                  : "py-3 px-4 hover:text-[#f16331] flex items-center"
              }
            >
              <UploadOutlined className="mr-2" />
              {collapsed ? "" : "Category"}
            </NavLink>
          </li>
          <li className="list-none my-1 text-black hover:bg-[#fbe0d6]">
            <NavLink
              to={PATH_ADMIN_PRODUCT}
              className={({ isActive }) =>
                isActive
                  ? "py-3 px-4 border-r-4 border-r-[#f16331] text-[#f16331] hover:text-[#f16331] flex items-center"
                  : "py-3 px-4 hover:text-[#f16331] flex items-center"
              }
            >
              <VideoCameraOutlined className="mr-2" />
              {collapsed ? "" : "Product"}
            </NavLink>
          </li>
          <li className="list-none my-1 text-black hover:bg-[#fbe0d6]">
            <NavLink
              to={PATH_ADMIN_ORDER}
              className={({ isActive }) =>
                isActive
                  ? "py-3 px-4 border-r-4 border-r-[#f16331] text-[#f16331] hover:text-[#f16331] flex items-center"
                  : "py-3 px-4 hover:text-[#f16331] flex items-center"
              }
            >
              <ShoppingCartOutlined className="mr-2" />
              {collapsed ? "" : "Order"}
            </NavLink>
          </li>
          <li className="list-none my-1 text-black hover:bg-[#fbe0d6]">
            <NavLink
              to={PATH_ADMIN_USER}
              className={({ isActive }) =>
                isActive
                  ? "py-3 px-4 border-r-4 border-r-[#f16331] text-[#f16331] hover:text-[#f16331] flex items-center"
                  : "py-3 px-4 hover:text-[#f16331] flex items-center"
              }
            >
              <VideoCameraOutlined className="mr-2" />
              {collapsed ? "" : "User"}
            </NavLink>
          </li>
        </ul>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed)
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;