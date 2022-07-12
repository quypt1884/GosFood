import {
  AppstoreOutlined,
  DropboxOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { PATH_ADMIN_CATEGORY, PATH_ADMIN_ORDER, PATH_ADMIN_PRODUCT, PATH_ADMIN_USER } from "routes/routes.paths";

import { AppDispatch, RootState } from "store";
import { getListCategories } from "store/categoriesSlice";
import { getListOrder } from "store/orderSlice";
import { getListProducts } from "store/productsSlice";
import { getListUsers } from "store/userSlice";
import CardDashboard from "./CardDashboard";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.user);
  const { categories } = useSelector((state: RootState) => state.category);
  const { orders } = useSelector((state: RootState) => state.order);
  const { products } = useSelector((state: RootState) => state.product);
  useEffect(() => {
    dispatch(getListCategories());
    dispatch(getListUsers());
    dispatch(getListProducts());
    dispatch(getListOrder());
  }, [dispatch]);

  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16}>
        <Col span={6}>
          <CardDashboard link={PATH_ADMIN_ORDER} color="#3f8600" name="Order" icon={<ShoppingCartOutlined className="text-2xl text-[#3f8600]"/>}  quantity={orders.length} />
        </Col>
        <Col span={6}>
          <CardDashboard link={PATH_ADMIN_USER} color="#f16331" name="User" icon={<UserOutlined className="text-2xl text-[#f16331]"/>}  quantity={users.length} />
        </Col>
        <Col span={6}>
          <CardDashboard link={PATH_ADMIN_PRODUCT} color="#3f8600" name="Product" icon={<DropboxOutlined className="text-2xl text-[#3f8600]"/>}  quantity={products.length} />
        </Col>
        <Col span={6}>
          <CardDashboard link={PATH_ADMIN_CATEGORY} color="#f16331" name="Category" icon={<AppstoreOutlined className="text-2xl text-[#f16331]"/>}  quantity={categories.length} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
