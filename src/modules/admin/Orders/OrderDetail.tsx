import { Col, Descriptions, Image, Row, Table } from "antd";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

import { convertDateNowToDayMonthYear } from "helpers/convertDate";
import { convertMoney } from "helpers/convertMoney";
import { AppDispatch, RootState } from "store";
import { getOrderbyId } from "store/orderSlice";
import { IProduct } from "types/product.model";
import { PATH_ADMIN_ORDER } from "routes/routes.paths";
import ButtonLink from "components/Button/ButtonLink";

const OrderDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { products } = useSelector((state: RootState) => state.product);

  const { isLoading, orderDetail } = useSelector(
    (state: RootState) => state.order
  );
  const getData = useCallback(() => {
    dispatch(getOrderbyId(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      title: "Name",
      width: "50%",
      render: (ordersDetail: {
        id: number;
        quantity: number;
        total?: number;
        note?: string;
      }) => (
        <div className="flex items-center">
          <Image
            src={
              products.find(
                (product: IProduct) => product.id === Number(ordersDetail.id)
              )?.thumbnail
            }
            width={120}
          />
          <Link
            to={"/app/product/" + ordersDetail.id}
            target="_blank"
            className="block ml-3"
          >
            {
              products.find(
                (product: IProduct) => product.id === Number(ordersDetail.id)
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
      width: "15%",
      dataIndex: "quantity",
      key: "Quantity"
    },
    {
      title: "Amount",
      width: "20%",
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
    }
  ];
  return (
    <>
      {Object.keys(orderDetail).length > 0 && !isLoading && (
        <div>
          <ButtonLink
            to={PATH_ADMIN_ORDER}
            className="bg-[#7a7776] text-white hover:text-white w-20"
          >
            <RollbackOutlined className="mr-1 text-base" />
            <span>Back</span>
          </ButtonLink>
          <Descriptions title="Info detail order">
            <Descriptions.Item label="Name">
              {orderDetail.firstName} {orderDetail.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {orderDetail.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {orderDetail.address}
            </Descriptions.Item>
            <Descriptions.Item label="Date order">
              {convertDateNowToDayMonthYear(orderDetail.dateOrder)}
            </Descriptions.Item>
            <Descriptions.Item label="Status" className="flex items-center">
              {orderDetail.status === "Cancelled" && (
                <span className="bg-red-600 rounded px-2 py-1 text-white">
                  {orderDetail.status}
                </span>
              )}
              {orderDetail.status === "Completed" && (
                <span className="bg-green-600 rounded px-2 py-1 text-white">
                  {orderDetail.status}
                </span>
              )}
              {orderDetail.status === "Placed" && (
                <span className="bg-sky-500 rounded px-2 py-1 text-white">
                  {orderDetail.status}
                </span>
              )}
              {orderDetail.status === "Shipping" && (
                <span className="bg-sky-500 rounded px-2 py-1 text-white">
                  {orderDetail.status}
                </span>
              )}
              {orderDetail.status === "Processing" && (
                <span className="bg-sky-500 rounded px-2 py-1 text-white">
                  {orderDetail.status}
                </span>
              )}
            </Descriptions.Item>
          </Descriptions>
          <br />
          <br />
          <Table
            rowKey={(record) => record.id}
            dataSource={orderDetail.orderDetail}
            pagination={false}
            columns={columns}
            footer={() => (
              <>
                <Row>
                  <Col span={19}>
                    <p className="text-end mr-10 font-semibold">
                      Total amount:
                    </p>
                  </Col>
                  <Col span={5}>
                    <span className="ml-10">
                      {convertMoney(Number(orderDetail.totalMoney))}
                    </span>
                  </Col>
                </Row>
              </>
            )}
          />
        </div>
      )}
    </>
  );
};

export default OrderDetail;
