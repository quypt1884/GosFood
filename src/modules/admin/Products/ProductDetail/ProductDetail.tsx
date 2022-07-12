import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  RollbackOutlined
} from "@ant-design/icons";
import { Card, Col, Image, Row, Tag } from "antd";

import ButtonLink from "components/Button/ButtonLink";
import { convertMoney } from "helpers/convertMoney";
import { PATH_ADMIN_PRODUCT } from "routes/routes.paths";
import { AppDispatch, RootState } from "store";
import { getProductById } from "store/productsSlice";
import { ICategory } from "types/category.model";

const ProductDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { isLoading, productDetail } = useSelector(
    (state: RootState) => state.product
  );
  const { categories } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(getProductById(Number(id)));
  }, [dispatch, id]);
  return (
    <>
      {Object.keys(productDetail).length > 0 && !isLoading && (
        <Row>
          <Col span={12} className="">
            <Card bordered={false}>
              <h1 className=" pb-4 border-b-2 border-b-zinc-200 font-bold">
                Product Info :{" "}
                <span className="uppercase">{productDetail.name}</span>
              </h1>
              {productDetail.discount > 0 ? (
                <Row className="justify-between py-4 border-b-2 border-b-zinc-200">
                  <Col>
                    <span className="font-semibold">Old price</span>
                  </Col>
                  <Col>
                    <span>{convertMoney(Number(productDetail.price))}</span>
                  </Col>
                </Row>
              ) : (
                <Row className="justify-between py-4 border-b-2 border-b-zinc-200">
                  <Col>
                    <span className="font-semibold">Price</span>
                  </Col>
                  <Col>
                    <span>{convertMoney(Number(productDetail.newPrice))}</span>
                  </Col>
                </Row>
              )}

              {productDetail.discount && (
                <Row className="justify-between py-4 border-b-2 border-b-zinc-200">
                  <Col>
                    <span className="font-semibold">Discount</span>
                  </Col>
                  <Col>
                    <span>
                      <Tag className="rounded-lg ml-4" color="#16a34a">
                        -{productDetail.discount}%
                      </Tag>
                    </span>
                  </Col>
                </Row>
              )}

              {productDetail.discount && (
                <Row className="justify-between py-4 border-b-2 border-b-zinc-200">
                  <Col>
                    <span className="font-semibold">New Price</span>
                  </Col>
                  <Col>
                    <span>{convertMoney(Number(productDetail.newPrice))}</span>
                  </Col>
                </Row>
              )}
              <Row className="justify-between py-4 border-b-2 border-b-zinc-200">
                <Col>
                  <span className="font-semibold">Product Category</span>
                </Col>
                <Col>
                  <span>
                    {
                      categories.find(
                        (category: ICategory) =>
                          category.id === productDetail.categoryId
                      )?.name
                    }
                  </span>
                </Col>
              </Row>
              <Row className="justify-between item-center py-4">
                <Col>
                  <span className="font-semibold">Availiblity</span>
                </Col>
                <Col>
                  {productDetail.isStock ? (
                    <span className="bg-green-600 rounded px-2 py-1 text-white">
                      Instock
                    </span>
                  ) : (
                    <span className="bg-[#f16331] rounded px-2 py-1 text-white">
                      Out of Stock
                    </span>
                  )}
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
                  <span>{productDetail.decription}</span>
                </Col>
              </Row>
              <Row className="my-3">
                <Col className="h-40 w-auto mx-auto my-0">
                  <Image height="100%" src={productDetail.thumbnail} />
                </Col>
              </Row>
              <div className="flex justify-between items-center mt-6">
                <ButtonLink
                  to={PATH_ADMIN_PRODUCT}
                  className="bg-[#7a7776] text-white hover:text-white w-20"
                >
                  <RollbackOutlined className="mr-1 text-base" />
                  <span>Back</span>
                </ButtonLink>
                <Link
                  to={PATH_ADMIN_PRODUCT + `/edit/${productDetail.id}`}
                  className="block px-4 py-1 rounded bg-[#f16331] text-white hover:bg-red-600 hover:text-white"
                >
                  Edit
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductDetail;
