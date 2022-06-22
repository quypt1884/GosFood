import { Card, Col, Image, List, Row } from "antd";
import food1 from "assets/food/food-1.jpg";
import food2 from "assets/food/food-2.jpg";
import food3 from "assets/food/food-3.jpg";
import food4 from "assets/food/food-4.jpg";
import { Link } from "react-router-dom";
import {
  PATH_ADMIN_PRODUCT_ADD,
  PATH_ADMIN_PRODUCT_DETAIL
} from "routes/routes.paths";
const data = [
  {
    title: "Title 1",
    img: food1,
    name: "Pizza"
  },
  {
    title: "Title 2",
    img: food2,
    name: "Veg Sandwich"
  },
  {
    title: "Title 3",
    img: food3,
    name: "Beef Grilled"
  },
  {
    title: "Title 4",
    img: food4,
    name: "Pizza Grilled"
  },
  {
    title: "Title 4",
    img: food4,
    name: "Pizza Grilled"
  },
  {
    title: "Title 4",
    img: food4,
    name: "Pizza Grilled"
  },
  {
    title: "Title 4",
    img: food4,
    name: "Pizza Grilled"
  },
  {
    title: "Title 4",
    img: food4,
    name: "Pizza Grilled"
  },
  {
    title: "Title 4",
    img: food4,
    name: "Pizza Grilled"
  },
  {
    title: "Title 4",
    img: food4,
    name: "Pizza Grilled"
  }
];
const ProductList = () => {
  return (
    <>
      <Link
        to={PATH_ADMIN_PRODUCT_ADD}
        className="px-2 py-1 rounded bg-[#f16331] text-white hover:text-white"
      >
        Add Product
      </Link>
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
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Image height={150} preview={true} src={item.img} />
            <Card>
              <Row>
                <Col span={12}>
                  <Link
                    to={PATH_ADMIN_PRODUCT_DETAIL}
                    className="hover:text-[#f16331]"
                  >
                    Beef Grilled
                  </Link>
                </Col>
                <Col span={12} className="text-right">
                  27.000đ
                </Col>
              </Row>
              <Row className="mt-3">
                <Col span={24} className="text-right">
                  <span className="bg-green-600 text-white px-2 rounded">
                    In Stock
                  </span>
                </Col>
              </Row>
              <Row className="mt-3 h-16 overflow-hidden text-ellipsis ">
                <Col>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                  ipsa at delectus? Aut libero nihil voluptatum, iste
                  consectetur nobis, perferendis cum facere provident ipsum,
                  sequi at! Eveniet est nam porro?
                </Col>
              </Row>
              <Row className="mt-3">
                <Col span={12}>
                  <Link
                    to=""
                    className="px-2 py-1 rounded bg-[#f16331] text-white hover:bg-red-600 hover:text-white"
                  >
                    Remove
                  </Link>
                </Col>
                <Col span={12} className="text-right">
                  <Link
                    to=""
                    className="px-2 py-1 rounded bg-black text-white hover:text-white"
                  >
                    Edit
                  </Link>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default ProductList;
