import { SearchOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { convertDateNowToDayMonthYear } from "helpers/convertDate";
import { convertMoney } from "helpers/convertMoney";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store";
import { IOrder } from "types/order.model";

const CheckOrder = () => {
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
      {listOrderCheck.length > 0 && (
        <div className="w-[80%] mx-auto">
          <h1 className="text-center text-2xl font-semibold my-6">
            List Order
          </h1>
          <Row className="flex justify-between items-center font-semibold py-3 border-b-[1px] border-b-slate-300">
            <Col span={2}>ID</Col>
            <Col span={4}>Phone</Col>
            <Col span={3}>Name</Col>
            <Col span={2}>Status</Col>
            <Col span={8} className="ml-1">
              Address
            </Col>
            <Col span={2}>Total</Col>
            <Col span={2}></Col>
          </Row>
          {listOrderCheck.map((order: IOrder) => {
            return (
              <Row
                key={order.id}
                className="flex justify-between items-center py-3 border-b-[1px] border-b-slate-300"
              >
                <Col span={2}>
                  {convertDateNowToDayMonthYear(Number(order.dateOrder))}
                </Col>
                <Col span={4}>{order.phone}</Col>
                <Col span={3}>
                  {order.firstName} {order.lastName}
                </Col>
                {order.status === "Cancelled" && (
                  <Col
                    span={2}
                    className="bg-red-600 rounded px-2 py-1 text-white"
                  >
                    {order.status}
                  </Col>
                )}
                {order.status === "Completed" && (
                  <Col
                    span={2}
                    className="bg-green-600 rounded px-2 py-1 text-white"
                  >
                    {order.status}
                  </Col>
                )}
                {order.status === "Placed" && (
                  <Col
                    span={2}
                    className="bg-sky-500 rounded px-2 py-1 text-white"
                  >
                    {order.status}
                  </Col>
                )}
                {order.status === "Shipping" && (
                  <Col
                    span={2}
                    className="bg-sky-500 rounded px-2 py-1 text-white"
                  >
                    {order.status}
                  </Col>
                )}
                {order.status === "Processing" && (
                  <Col
                    span={2}
                    className="bg-sky-500 rounded px-2 py-1 text-white"
                  >
                    {order.status}
                  </Col>
                )}
                <Col span={8} className="ml-1">
                  {order.address}
                </Col>
                <Col span={2}>{convertMoney(Number(order.totalMoney))}</Col>
                <Col span={2}>
                  <Link
                    to={`/app/order/${order.id}`}
                    className="inline-block p-1 bg-[#f16331] text-white hover:bg-opacity-95 rounded"
                  >
                    Detail
                  </Link>
                </Col>
              </Row>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CheckOrder;
