import { GatewayOutlined, HeartOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  return (
    <>
      <Row>
        <Col span={12} className="">
          <Card bordered={false}>
            <h1 className=" pb-4 border-b-2 border-b-zinc-200 font-bold">
              Product Info
            </h1>
            <Row className="justify-between py-4 border-b-2 border-b-zinc-200">
              <Col>
                <span className="font-semibold">Price</span>
              </Col>
              <Col>
                <span>27.000đ</span>
              </Col>
            </Row>
            <Row className="justify-between py-4 border-b-2 border-b-zinc-200">
              <Col>
                <span className="font-semibold">Product Category</span>
              </Col>
              <Col>
                <span>Noodle</span>
              </Col>
            </Row>
            <Row className="justify-between item-center py-4">
              <Col>
                <span className="font-semibold">Availiblity</span>
              </Col>
              <Col>
                <span className="bg-[#f16331] rounded px-2 py-1 text-white">
                  Instock
                </span>
              </Col>
            </Row>

            <Row className="justify-between mt-1">
              <Col>
                <Link
                  to=""
                  className="px-4 py-1 rounded bg-[#f16331] text-white hover:bg-red-600 hover:text-white"
                >
                  Edit
                </Link>
              </Col>
              <Col>
                <span className="px-4 py-1 rounded bg-black text-white hover:text-white">
                  Delete
                </span>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={12}>
          <Card bordered={false}>
            <h1 className=" pb-4 border-b-2 border-b-zinc-200 font-bold">
              Product Detail
            </h1>
            <Row className="my-3">
              <Col>
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
                  natus debitis rem saepe quasi ab, aliquid labore id
                  consectetur esse voluptates libero? Quidem, rem suscipit
                  dignissimos alias corporis blanditiis amet?
                </span>
              </Col>
            </Row>
            <Row className="justify-between items-center my-3">
              <Col className="border-r-2 border-r-gray-200 w-1/2 flex justify-center">
                <div className="text-center">
                  <GatewayOutlined className="text-5xl mb-2 text-[#f16331]" />
                  <p className="text-l font-semibold">1001</p>
                  <p className="text-l">Buyed</p>
                </div>
              </Col>
              <Col className="border-r-2 border-r-gray-200 w-1/2 flex justify-center">
                <div className="text-center">
                  <HeartOutlined className="text-5xl mb-2 text-[#f16331]" />
                  <p className="text-l font-semibold">101</p>
                  <p className="text-l">Like</p>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
