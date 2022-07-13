import { message, PaginationProps, Popconfirm, Row } from "antd";
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
  const [curent, setCurent] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  const { categories, total } = useSelector(
    (state: RootState) => state.category
  );

  const getData = useCallback(() => {
    dispatch(getListCategories());
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData, total]);

  

  const handleConfirmDelete = (id: any) => {
    message.success("Delete success.");
    dispatch(deleteCategory(id));
  };

  const handleChangePanigate: PaginationProps["onChange"] = (page) => {
    setCurent(page)
  };

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
            onConfirm={() => handleConfirmDelete(category.id)}
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
          current: curent,
          total: categories.length,
          pageSize: pageSize,
          onChange: handleChangePanigate
        }}
      />
    </>
  );
};

export default CategoriList;
