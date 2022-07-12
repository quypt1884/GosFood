import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "store";
import { deleteUser, getListUsers } from "store/userSlice";
import { IUser } from "types/user.model";
import UserDetail from "./UserDetail";
import UserEdit from "./UserEdit";

const UserList = () => {
  const [selectUser, setSelectUser] = useState<IUser>({
    id: 0,
    email: "",
    password: "",
    avatar: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    isAdmin: false
  });

  const pageSize = 3;
  const [pagination, setpagination] = useState<{
    data: IUser[];
    curent: number;
    minIndex: number;
    maxIndex: number;
  }>({
    data: [],
    curent: 1,
    minIndex: 0,
    maxIndex: 0
  });
  const [isModalVisibleDetail, setIsModalVisibleDetail] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { users, total } = useSelector((state: RootState) => state.user);

  const handleChangePanigate = (page: number) => {
    setpagination({
      data: users,
      curent: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize
    });
  };
  const getData = useCallback(() => {
    dispatch(getListUsers());
  }, [dispatch]);

  useEffect(() => {
    getData();
    setpagination({
      data: users,
      curent: 1,
      minIndex: 1,
      maxIndex: pageSize
    });
  }, [getData, total]);

  const confirm = (id: any) => {
    message.success("Delete success");
    dispatch(deleteUser(id));
  };

  const showModalDetail = (user: IUser) => {
    setSelectUser(user);
    setIsModalVisibleDetail(true);
  };

  const handleCancel = () => {
    setIsModalVisibleDetail(false);
  };

  const handleOk = () => {
    setIsModalVisibleDetail(false);
  };
  const columns: ColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: "5%"
    },
    {
      title: "Name",
      render: (user: IUser) => (
        <>
          <span
            onClick={() => showModalDetail(user)}
            className="hover:text-[#f16331]"
          >
            {user.firstName} {user.lastName}
          </span>
        </>
      ),

      width: "10%"
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "10%"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "10%"
    },
    {
      title: "Role",
      render: (user: IUser) => (
        <>
          {user.isAdmin ? (
            <span className="bg-green-600 rounded px-2 py-1 text-white">
              Admin
            </span>
          ) : (
            <span className="bg-[#f16331] rounded px-2 py-1 text-white">
              User
            </span>
          )}
        </>
      ),
      width: "10%"
    },
    {
      title: "",
      render: (user: IUser) => (
        <>
          <UserEdit initialValues={user} />
          <Popconfirm
            placement="bottomLeft"
            title={`Are you sure to delete ${user.firstName}  ${user.lastName} ?`}
            onConfirm={() => confirm(user.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="text-red-400 text-lg ml-4 hover:translate-x-0.5 hover:translate-y-0.5" />
          </Popconfirm>
        </>
      ),
      width: "5%"
    }
  ];
  return (
    <>
      {users && (
        <Table
          columns={columns}
          dataSource={users}
          rowKey={(record) => record.id}
          pagination={{
            current: pagination.curent,
            total: pagination.data.length,
            pageSize: pageSize,
            onChange: handleChangePanigate
          }}
        />
      )}
      <UserDetail
        title="User Detail"
        visible={isModalVisibleDetail}
        handleCancel={handleCancel}
        handleOk={handleOk}
        user={selectUser}
      />
    </>
  );
};

export default UserList;
