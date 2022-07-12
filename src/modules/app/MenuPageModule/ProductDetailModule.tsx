import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  StarFilled,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Col, Image, message, Progress, Rate, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { convertMoney } from "helpers/convertMoney";
import request from "helpers/request";
import { AppDispatch } from "store";
import { addToCart } from "store/cartSlice";
import { IProduct } from "types/product.model";
import { IRate } from "types/rate.model";
import { convertDateNowToDayMonthYear } from "helpers/convertDate";
import { pointAvg } from "helpers/pointAvg";
import { pointPercent } from "helpers/pointPercent";

const ProductDetailModule = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [productDetail, setProductDetail] = useState<IProduct>({
    id: 0,
    categoryId: 0,
    name: "",
    thumbnail: "",
    price: 0,
    size: "",
    decription: "",
    discount: 0,
    newPrice: 0,
    isStock: true
  });
  const [rates, setRates] = useState<IRate[]>([
    {
      id: 0,
      userId: 0,
      firstName: "",
      lastName: "",
      phone: "",
      foodId: 0,
      point: 0,
      review: "",
      isAnonymous: true,
      dateRate: ""
    }
  ]);

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const getProductDetail = (id: Number) => {
    return request.get(`products/${id}`);
  };

  useEffect(() => {
    getProductDetail(Number(id)).then((response) =>
      setProductDetail(response.data)
    );
    setQuantity(1);
  }, [id]);
  const handleChangeQuantity = (e: any) => {
    setQuantity(e.target.value);
  };

  const handleClickMinus = () => {
    setQuantity(quantity - 1);
  };

  const handleClickPlus = () => {
    setQuantity(quantity + 1);
  };

  const handleClickAddtoCart = (product: IProduct) => {
    dispatch(addToCart({ ...product, quantity: quantity }));
    message.success("Add to cart success")
    setQuantity(1);
  };

  const getRates = () => {
    return request.get("/rates");
  };

  useEffect(() => {
    getRates().then((response) => {
      const rateByFoodId = response.data.filter(
        (res: IRate) => res.foodId === Number(id)
      );
      setRates(rateByFoodId);
    });
  }, [id]);

  const getRateByPoint = (pointRate: number) => {
    return rates.filter((rate: IRate) => {
      return rate.point === pointRate;
    });
  };
  const pointList = [1, 2, 3, 4, 5];
  return (
    <>
      <Row className="h-[270px] mt-5 flex justify-between">
        <Col span={10}>
          <div className="w-full h-full px-2 py-4">
            <Image className="h-full" src={productDetail.thumbnail} />
          </div>
        </Col>
        <Col span={13}>
          <div className="w-full h-full px-2 py-4">
            <p className="text-xl mb-2">{productDetail.name}</p>
            <div className="flex justify-start items-center mb-4">
              <p className="text-[#f16331] text-lg">
                {convertMoney(Number(productDetail.newPrice))}
              </p>
              {productDetail.discount && (
                <Tag className="rounded-lg ml-4" color="#16a34a">
                  -{productDetail.discount}%
                </Tag>
              )}
            </div>
            <p className="mb-6">{productDetail.decription}</p>

            <form className="flex items-center">
              <div className="flex items-center">
                <MinusOutlined
                  className="hover:text-[#f16331] p-3 "
                  onClick={handleClickMinus}
                />
                <input
                  type="text"
                  onChange={handleChangeQuantity}
                  value={quantity}
                  className="w-10 text-center rounded-md border-gray-500 border-[1px]"
                />
                <PlusOutlined
                  className="hover:text-[#f16331] p-3"
                  onClick={handleClickPlus}
                />
              </div>
              <div
                className="flex items-center ml-4 text-white bg-[#f16331] rounded-md py-3 px-2 hover:opacity-90 hover:text-white cursor-pointer"
                onClick={() => handleClickAddtoCart(productDetail)}
              >
                <ShoppingCartOutlined className="mr-2" />
                Add to cart
              </div>
            </form>
          </div>
        </Col>
      </Row>

      <Row className="w-full my-10">
        <Col span={24}>
          <p className="font-semibold">REVIEW</p>
          <Row className="flex justify-between mt-2">
            <Col span={10}>
              <div>
                <span>
                  <>{pointAvg(rates.length, rates).toFixed(1)}</>{" "}
                  <Rate
                    className="text-[#f16331] mr-3"
                    disabled
                    value={Math.round(Number(pointAvg(rates.length, rates)))}
                  />
                  <span>{rates.length} review</span>
                </span>
                <div>
                  {pointList.map((point: number) => {
                    return (
                      <div
                        className="flex justify-between items-center mt-2"
                        key={point}
                      >
                        {point}{" "}
                        <StarFilled className="ml-1 mr-3 text-[#f16331]" />
                        <Progress
                          percent={pointPercent(
                            getRateByPoint(point).length,
                            rates.length
                          )}
                          format={(percent) => `${percent?.toFixed(1)} %`}
                          size="small"
                          strokeColor="#f16331"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col span={13}>
              <div className="my-6">
                {rates.length > 0 &&
                  rates.map((rate: IRate) => {
                    return (
                      <Row className="my-4" key={rate.id}>
                        <Col span={1}>
                          <Avatar size="small" icon={<UserOutlined />} />
                        </Col>
                        <Col span={23}>
                          <div className="ml-3">
                            <div className="flex justify-between items-center mb-3  border-b-[1px] border-zinc-100">
                              <div>
                                {rate.isAnonymous ? (
                                  <span className="mr-3 font-semibold">
                                    {rate.firstName + " " + rate.lastName}
                                  </span>
                                ) : (
                                  <span className="mr-3 font-semibold text-zinc-500">
                                    Anonymous
                                  </span>
                                )}
                                <span>
                                  {convertDateNowToDayMonthYear(
                                    Number(rate.dateRate)
                                  )}
                                </span>
                              </div>
                              <div>
                                <Rate
                                  className="text-[#f16331] text-base"
                                  disabled
                                  value={rate?.point}
                                />
                              </div>
                            </div>
                            <p>{rate?.review}</p>
                          </div>
                        </Col>
                      </Row>
                    );
                  })}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailModule;
