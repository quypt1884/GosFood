import { message, Popconfirm, Row } from "antd";
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/lib/table";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { PATH_ADMIN_CATEGORY_ADD } from "routes/routes.paths";
import { AppDispatch, RootState } from "store";
import { deleteCategory, getListCategories } from "store/categoriesSlice";
import { ICategory } from "types/category.model";
import CategoriEdit from "../CategoriEdit/CategoriEdit";

const CategoriList: FC = () => {
  const pageSize = 3;
  const [pagination, setpagination] = useState<{
    data: ICategory[];
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
  const { categories, total } = useSelector(
    (state: RootState) => state.category
  );

  const handleChangePanigate = (page: number) => {
    setpagination({
      data: categories,
      curent: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize
    });
  };
  const confirm = (id: any) => {
    message.success("Delete success.");
    dispatch(deleteCategory(id));
  };

  const getData = useCallback(() => {
    dispatch(getListCategories());
  }, [dispatch]);

  useEffect(() => {
    getData();
    setpagination({
      data: categories,
      curent: 1,
      minIndex: 1,
      maxIndex: pageSize
    });
  }, [getData, total, categories]);

  const columns: ColumnsType<ICategory> = [
    {
      title: "ID",
      render: (text, record) => {
        return categories.indexOf(record) + 1;
      },
      sorter: (a, b) => a.id - b.id,
      width: "5%"
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: "10%"
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "20%"
    },
    {
      title: "",
      dataIndex: "",
      render: (category) => (
        <>
          <CategoriEdit initialValues={category} />
          <Popconfirm
            placement="bottomLeft"
            title={`Are you sure to delete ${category.name}?`}
            onConfirm={() => confirm(category.id)}
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
      <Row className="mb-3">
        <Link
          to={PATH_ADMIN_CATEGORY_ADD}
          className="px-2 py-1 rounded bg-[#f16331] text-white hover:text-white mb-3 flex items-center justify-between"
        >
          <FileAddOutlined className="mr-1 text-lg" />
          Add category
        </Link>
      </Row>
      <Table
        columns={columns}
        dataSource={categories}
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

export default CategoriList;
