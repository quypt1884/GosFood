import {
  AimOutlined,
  CoffeeOutlined,
  DoubleRightOutlined,
  RightOutlined,
  UserOutlined,
  WifiOutlined
} from "@ant-design/icons";
import { List, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Banner from "components/Banner/Banner";
import CardProduct from "components/Card/CardProduct";
import request from "helpers/request";
import { PATH_UER_MENU } from "routes/routes.paths";
import { AppDispatch } from "store";
import { addToCart } from "store/cartSlice";
import { IProduct } from "types/product.model";

const HomePageModule = () => {
  const [popular, setPopular] = useState({
    popular: [0],
    newDishes: [0]
  });
  const [products, setProducts] = useState<IProduct[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const getProductPopular = async () => {
    return await request.get("/homePage");
  };
  const getProduct = () => {
    return request.get("products");
  };

  const handleClickAddtoCart = (id: number) => {
    const productItem = products.find((product:IProduct)=> product.id === id)
    dispatch(addToCart({...productItem,quantity: 1}));
    message.success("Add to cart success")

  };
  useEffect(() => {
    getProductPopular().then((response) => setPopular(response.data));
    getProduct().then((response) => setProducts(response.data));
  }, []);

  return (
    <div className="p-2 mr-2">
      <Banner />
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-xl text-[#2e2e2e] font-semibold">Popular Dishes</h2>
        <Link
          to={PATH_UER_MENU}
          className="flex items-center text-[#f16331] hover:text-[#fb8960]"
        >
          View all <RightOutlined className="ml-1" />
        </Link>
      </div>
      <List
        className="mt-4"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 3
        }}
        dataSource={popular.popular}
        renderItem={(item: number) => (
          <List.Item>
            <CardProduct
              data={
                products.find((product) => product.id === item) &&
                products.find((product) => product.id === item)
              }
              onClick={()=>handleClickAddtoCart(item)}
            />
          </List.Item>
        )}
      />

      <section className="text-center mt-9 mb-16">
        <h1 className="text-[3rem] text-[#414549]">How to order?</h1>
        <p className="text-[#9a9a9a] mt-1 mb-5">Follow the step</p>
        <div className="flex justify-between items-center">
          <div>
            <AimOutlined className="text-4xl mb-3" />
            <p className="text-[#414549] text-lg">Choose your dish</p>
          </div>
          <DoubleRightOutlined className="text-2xl " />
          <div>
            <WifiOutlined className="text-4xl mb-3" />
            <p className="text-[#414549] text-lg">Choose your location</p>
          </div>
          <DoubleRightOutlined className="text-2xl " />
          <div>
            <CoffeeOutlined className="text-4xl mb-3" />
            <p className="text-[#414549] text-lg">Make your order</p>
          </div>
          <DoubleRightOutlined className="text-2xl " />
          <div>
            <UserOutlined className="text-4xl mb-3" />
            <p className="text-[#414549] text-lg">Food is on the way</p>
          </div>
        </div>
      </section>

      <section className="mb-3">
        <h1 className=" text-center text-[3rem] text-[#414549]">NEW DISHES</h1>
        <p className=" text-center text-[#9a9a9a] mt-1 mb-5">
          Clients’ Most Popular Choise
        </p>
        <List
          className="mt-4"
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 3
          }}
          dataSource={popular.newDishes}
          renderItem={(item: number) => (
            <List.Item>
              <CardProduct
                data={
                  products.find((product) => product.id === item) &&
                  products.find((product) => product.id === item)
                }
                onClick={() => handleClickAddtoCart(item)}
              />
            </List.Item>
          )}
        />
      </section>
    </div>
  );
};

export default HomePageModule;
