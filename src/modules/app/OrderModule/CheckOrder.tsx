import { CloseSquareOutlined, DoubleRightOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Empty, message, notification, Popconfirm, Row } from "antd";
import { convertDateNowToDayMonthYear } from "helpers/convertDate";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { convertMoney } from "helpers/convertMoney";
import { AppDispatch, RootState } from "store";
import { updateOrder } from "store/orderSlice";
import { IOrder } from "types/order.model";

const CheckOrder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [checkOrder, setCheckOrder] = useState<string>("");
  const [listOrderCheck, setListOrderCheck] = useState<IOrder[]>([]);
  const { orders } = useSelector((state: RootState) => state.order);
  const handleChangeCheckOrder = (e: any) => {
    setCheckOrder(e.target.value);
  };

  const handleClickCheck = () => {
    setListOrderCheck(
      orders.filter((order: IOrder) => {
        return order.phone === checkOrder || order.id === Number(checkOrder);
      })
    );
  };

  const handleKeyDownCheck = (e: any) => {
    if (e.keyCode === 13) {
      setListOrderCheck(
        orders.filter((order: IOrder) => {
          return order.phone === checkOrder || order.id === Number(checkOrder);
        })
      );
    }
  };

  const handleClickCancelOrder = (value: IOrder) => {
    dispatch(updateOrder({ ...value, status: "Cancelled" }));
    message.success("Success cancel");
  };
  return (
    <>
      <div className="flex justify-center items-center mt-3">
        <div>
          <p className="text-lg font-semibold my-2">
            Input id or phone to check order
          </p>
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Id or phone"
              value={checkOrder}
              onChange={handleChangeCheckOrder}
              onKeyDown={handleKeyDownCheck}
              className="px-2 py-1 border-[1px] border-neutral-200 rounded-tl-lg rounded-bl-lg text-base"
            />
            <SearchOutlined
              onClick={handleClickCheck}
              className="px-2 py-0.5 border-[1px] bg-[#f16331] text-white border-neutral-200 rounded-tr-lg rounded-br-lg border-l-0 text-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
      {listOrderCheck.length > 0 ? (
        <div className="w-[80%] mx-auto">
          <h1 className="text-center text-2xl font-semibold my-6">
            List Order
          </h1>
          <Row className="flex justify-between items-center font-semibold py-3 border-b-[1px] border-b-slate-300">
            <Col span={2}>ID</Col>
            <Col span={3}>Phone</Col>
            <Col span={4}>Name</Col>
            <Col span={3}>Status</Col>
            <Col span={7} className="ml-1">
              Address
            </Col>
            <Col span={2}>Total</Col>
            <Col span={2}>Cancel order</Col>
          </Row>
          <>
            {listOrderCheck.map((order: IOrder) => {
              return (
                <div className="py-3 border-b-[1px] border-b-slate-300">
                  <Row
                  key={order.id}
                  className="flex justify-between items-center "
                >
                  <Col span={2}>
                    {convertDateNowToDayMonthYear(Number(order.dateOrder))}
                  </Col>
                  <Col span={3}>{order.phone}</Col>
                  <Col span={4}>
                    {order.firstName} {order.lastName}
                  </Col>
                  {order.status === "Cancelled" && (
                    <Col span={3}>
                      <p className="bg-red-600 inline-block rounded px-0.5 py-1 text-white">
                        {order.status}
                      </p>
                    </Col>
                  )}
                  {order.status === "Completed" && (
                    <Col span={3}>
                      <p className="bg-green-600 inline-block rounded px-0.5 py-1 text-white">
                        {order.status}
                      </p>
                    </Col>
                  )}
                  {order.status === "Placed" && (
                    <Col span={3}>
                      <span className="bg-sky-500 inline-block rounded px-0.5 py-1 text-white">
                        {order.status}
                      </span>
                    </Col>
                  )}
                  {order.status === "Shipping" && (
                    <Col span={3}>
                      <p className="bg-sky-500 inline-block rounded px-0.5 py-1 text-white">
                        {order.status}
                      </p>
                    </Col>
                  )}
                  {order.status === "Processing" && (
                    <Col span={3}>
                      <p className="bg-sky-500 inline-block rounded px-0.5 py-1 text-white">
                        {order.status}
                      </p>
                    </Col>
                  )}
                  <Col span={7} className="ml-1">
                    <p>{order.address}</p>
                  </Col>
                  <Col span={2}>
                    <p>{convertMoney(Number(order.totalMoney))}</p>
                  </Col>
                  <Col span={2}>
                    {order.status === "Placed" ? (
                      <div>
                        <Popconfirm
                          title="Are you cancle order"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => handleClickCancelOrder(order)}
                        >
                          <span className="text-lg text-red-500 p-0.5">
                            <CloseSquareOutlined />
                          </span>
                        </Popconfirm>
                      </div>
                    ) : order.status === "Completed" ? (
                      <div>
                        <span
                          className="text-lg text-red-500 p-0.5 cursor-pointer"
                          onClick={() => {
                            notification.warning({
                              message: "Warring",
                              description: "Order has been completed "
                            });
                          }}
                        >
                          <CloseSquareOutlined />
                        </span>
                      </div>
                    ) : order.status === "Cancelled" ? (
                      <div>
                        <span className="text-lg text-red-200 p-0.5 cursor-pointer ">
                          <CloseSquareOutlined />
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span
                          className="text-lg text-red-500 p-0.5 cursor-pointer"
                          onClick={() => {
                            notification.warning({
                              message: "Warring",
                              description:
                                "Order has been processed and cannot be canceled "
                            });
                          }}
                        >
                          <CloseSquareOutlined />
                        </span>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="flex justify-end">
                  <Link
                    to={`/app/order/${order.id}`}
                    className="flex items-center justify-self-end text-end p-1 text-[#f16331]"
                  >
                    Info detail <DoubleRightOutlined />
                  </Link>
                </Row>
                </div>
              );
            })}
          </>
        </div>
      ): <div className="flex justify-center items-center mt-10">
      <Empty description={"No data"} />
    </div>}
    </>
  );
};

export default CheckOrder;
