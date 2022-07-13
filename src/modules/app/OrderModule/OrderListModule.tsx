import { CloseSquareOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Col, message, notification, Popconfirm, Row } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { convertMoney } from "helpers/convertMoney";
import { AppDispatch, RootState } from "store";
import { updateOrder } from "store/orderSlice";
import { IOrder } from "types/order.model";
import { convertDateNowToDayMonthYear } from "helpers/convertDate";

const OrderListModule = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { orders } = useSelector((state: RootState) => state.order);
  const { users } = useSelector((state: RootState) => state.auth);

  const handleClickCancelOrder = (value: IOrder) => {
    dispatch(updateOrder({ ...value, status: "Cancelled" }));
    message.success("Success cancel");
  };
  console.log(orders)
  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-center text-2xl font-semibold my-6">List Order</h1>
      <Row className="flex justify-between items-center font-semibold py-3 border-b-[1px] border-b-slate-300">
        <Col span={2}>Date</Col>
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
        {orders.map((order: IOrder) => {
          if (order.userId === Number(users.id))
            return (
              <div
                key={order.id}
                className="py-3 border-b-[1px] border-b-slate-300"
              >
                <Row className="flex justify-between items-center">
                  <Col span={2}>{convertDateNowToDayMonthYear(Number(order.dateOrder))}</Col>
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
  );
};

export default OrderListModule;
