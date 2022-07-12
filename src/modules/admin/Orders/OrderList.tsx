import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { convertMoney } from "helpers/convertMoney";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { PATH_ADMIN_ORDER } from "routes/routes.paths";
import { AppDispatch, RootState } from "store";
import { deleteOrder, getListOrder } from "store/orderSlice";
import { getListUsers } from "store/userSlice";
import { IOrder } from "types/order.model";
import OrderEdit from "./OrderEdit";

const OrderList = () => {
  const pageSize = 5;
  const [status, setStatus] = useState<string>("");
  const [pagination, setpagination] = useState<{
    data: IOrder[];
    curent: number;
    minIndex: number;
    maxIndex: number;
  }>({
    data: [],
    curent: 1,
    minIndex: 0,
    maxIndex: 0
  });

  const dispatch = useDispatch<AppDispatch>();
  const { orders, total } = useSelector((state: RootState) => state.order);

  const getData = useCallback(() => {
    dispatch(getListOrder(status));
    dispatch(getListUsers());
  }, [dispatch, status]);

  useEffect(() => {
    getData();
    setpagination({
      data: orders,
      curent: 1,
      minIndex: 1,
      maxIndex: pageSize
    });
  }, [getData, total, orders]);

  const handleConfirmDelete = (id: any) => {
    message.success("Delete success");
    dispatch(deleteOrder(id));
  };

  const handleChangePanigate = (page: number) => {
    setpagination({
      data: orders,
      curent: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize
    });
  };

  const handleChangeStatus = (e: any) => {
    setStatus(e.target.value);
  };
  
  const columns: ColumnsType<IOrder> = [
    {
      title: "No",
      render: (text, record) => {
        return orders.indexOf(record) + 1;
      },
      sorter: (a, b) => a.id - b.id,
      width: "5%"
    },
    {
      title: "Info user",
      render: (order: IOrder) => (
        <>
          <Link className="block" to={PATH_ADMIN_ORDER + "/" + order.id}>
            <p className="font-semibold">
              {order.firstName} {order.lastName}
            </p>
            <p className="my-1">{order.phone}</p>
            <p>{order.address}</p>{" "}
          </Link>
        </>
      ),
      width: "20%"
    },
    {
      title: "Total",
      render: (order: IOrder) => <>{convertMoney(Number(order.totalMoney))}</>,
      width: "10%"
    },
    {
      title: "Status",
      render: (order: IOrder) => (
        <>
          {order.status === "Cancelled" && (
            <span className="bg-red-600 rounded px-2 py-1 text-white">
              {order.status}
            </span>
          )}
          {order.status === "Completed" && (
            <span className="bg-green-600 rounded px-2 py-1 text-white">
              {order.status}
            </span>
          )}
          {order.status === "Placed" && (
            <span className="bg-sky-500 rounded px-2 py-1 text-white">
              {order.status}
            </span>
          )}
          {order.status === "Shipping" && (
            <span className="bg-sky-500 rounded px-2 py-1 text-white">
              {order.status}
            </span>
          )}
          {order.status === "Processing" && (
            <span className="bg-sky-500 rounded px-2 py-1 text-white">
              {order.status}
            </span>
          )}
        </>
      ),
      width: "20%"
    },
    {
      title: "",
      render: (order: IOrder) => (
        <>
          <OrderEdit initialValues={order} />
          <Popconfirm
            placement="bottomLeft"
            title={`Are you sure to delete ${order.id}?`}
            onConfirm={() => handleConfirmDelete(order.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              className="text-red-400 text-lg ml-4 hover:translate-x-0.5 hover:translate-y-0.5"
              title="Delete"
            />
          </Popconfirm>
        </>
      ),
      width: "7%"
    }
  ];

  return (
    <>
      <div>
        <select
          onChange={handleChangeStatus}
          className="border-[1px] border-slate-300 h-9 mb-3 rounded-md"
        >
          <option value="">Select to filter status </option>
          <option value="Placed">Placed</option>
          <option value="Processing">Processing</option>
          <option value="Shipping">Shipping</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey={(record) => record.id}
        pagination={{
          current: pagination.curent,
          total: pagination.data.length,
          pageSize: pageSize,
          onChange: handleChangePanigate
        }}
      />
    </>
  );
};

export default OrderList;
