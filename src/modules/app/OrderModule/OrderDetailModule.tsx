import { Col, Descriptions, Image, Row, Table } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

import { convertDateNowToDayMonthYear } from "helpers/convertDate";
import { convertMoney } from "helpers/convertMoney";
import { AppDispatch, RootState } from "store";
import { getListOrder } from "store/orderSlice";
import { IProduct } from "types/product.model";
import { IOrder } from "types/order.model";
import ReviewModule from "../ReviewModule/ReviewModule";
import { PATH_USER_ORDER_LIST } from "routes/routes.paths";
import ButtonLink from "components/Button/ButtonLink";

const OrderDetailModule = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  const { orders,isLoading } = useSelector((state: RootState) => state.order);

  const orderItem = orders.find((order: IOrder) => {
    return order.id === Number(id);
  });
  useEffect(() => {
    dispatch(getListOrder());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      width: "50%",
      render: (orderDetail: {
        id: number;
        quantity: number;
        total?: number;
        note?: string;
      }) => (
        <div className="flex items-center">
          <Image
            src={
              products.find(
                (product: IProduct) => product.id === Number(orderDetail.id)
              )?.thumbnail
            }
            width={120}
          />
          <Link
            to={"/app/product/" + orderDetail.id}
            target="_blank"
            className="block ml-3"
          >
            {
              products.find(
                (product: IProduct) => product.id === Number(orderDetail.id)
              )?.name
            }
          </Link>
        </div>
      ),
      key: "name"
    },

    {
      title: "Price",
      width: "15%",
      render: (ordersDetail: {
        id: number;
        quantity: number;
        total?: number;
        note?: string;
      }) => (
        <>
          {convertMoney(
            Number(
              products.find(
                (product: IProduct) => product.id === Number(ordersDetail.id)
              )?.newPrice
            )
          )}
        </>
      ),
      key: "price"
    },
    {
      title: "Quantity",
      width: "10%",
      dataIndex: "quantity",
      key: "Quantity"
    },

    {
      title: "Amount",
      width: "15%",
      key: "Amount",
      render: (ordersDetail: {
        id: number;
        quantity: number;
        total?: number;
        note?: string;
      }) => (
        <>
          {convertMoney(
            Number(
              products.find(
                (product: IProduct) => product.id === Number(ordersDetail.id)
              )?.newPrice * ordersDetail.quantity
            )
          )}
        </>
      )
    },

    {
      title: "",
      width: "10%",
      key: "Review",
      render: (ordersDetail: {
        id: number;
        quantity: number;
        total?: number;
        note?: string;
        isReview: boolean;
      }) => (
        <>
          {!ordersDetail.isReview && orderItem.status === "Completed" && (
            <ReviewModule orderItem={orderItem} productDetail={ordersDetail} />
          )}

          {ordersDetail.isReview && orderItem.status === "Completed" && (
            <span className="p-2 rounded-md inline-block border-[1px] border-neutral-200">
              Reviewed
            </span>
          )}
        </>
      )
    }
  ];
  return (
    <>
      {Object.keys(orderItem).length > 0 && !isLoading && (
        <div className="mt-5">
          <Descriptions title="Info detail order">
            <Descriptions.Item label="Name">
              {orderItem.firstName} {orderItem.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {orderItem.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {orderItem.address}
            </Descriptions.Item>
            <Descriptions.Item label="Date order">
              {convertDateNowToDayMonthYear(Number(orderItem.dateOrder))}
            </Descriptions.Item>
            <Descriptions.Item label="Status" className="flex items-center">
              {orderItem.status === "Cancelled" && (
                <span className="bg-red-600 rounded px-2 py-1 text-white">
                  {orderItem.status}
                </span>
              )}
              {orderItem.status === "Completed" && (
                <span className="bg-green-600 rounded px-2 py-1 text-white">
                  {orderItem.status}
                </span>
              )}
              {orderItem.status === "Placed" && (
                <span className="bg-sky-500 rounded px-2 py-1 text-white">
                  {orderItem.status}
                </span>
              )}
              {orderItem.status === "Shipping" && (
                <span className="bg-sky-500 rounded px-2 py-1 text-white">
                  {orderItem.status}
                </span>
              )}
              {orderItem.status === "Processing" && (
                <span className="bg-sky-500 rounded px-2 py-1 text-white">
                  {orderItem.status}
                </span>
              )}
            </Descriptions.Item>
          </Descriptions>
          <br />
          <br />
          <Table
            rowKey={(record) => record.id}
            dataSource={orderItem.orderDetail}
            pagination={false}
            columns={columns}
            footer={() => (
              <>
                <Row>
                  <Col span={18}>
                    <p className="text-end mr-10 font-semibold">
                      Total amount:
                    </p>
                  </Col>
                  <Col span={5}>
                    <span className="ml-8">
                      {convertMoney(Number(orderItem.totalMoney))}
                    </span>
                  </Col>
                </Row>
              </>
            )}
          />
          <ButtonLink
            to={PATH_USER_ORDER_LIST}
            className="bg-[#f16331] text-white hover:text-white mt-3 w-20"
          >
            <RollbackOutlined className="mr-1 text-base" />
            <span>Back</span>
          </ButtonLink>
        </div>
      )}
    </>
  );
};

export default OrderDetailModule;
