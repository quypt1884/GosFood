import { Pagination, Row } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined
} from "@ant-design/icons";
import Table, { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  PATH_ADMIN_CATEGORY_ADD,
  PATH_ADMIN_CATEGORY_EDIT
} from "routes/routes.paths";
import { AppDispatch, RootState } from "store";
import { getListCategories, getTotalCategories } from "store/categoriesSlice";
import { ICategory } from "types/category.model";

const CategoriList: FC = () => {
  const [index, setIndex] = useState<number>(1);
  const handleChangePanigate = (pageIndex: number) => {
    setIndex(pageIndex);
  };
  const dispatch = useDispatch<AppDispatch>();
  const { categories, total } = useSelector(
    (state: RootState) => state.category
  );

  const columns: ColumnsType<ICategory> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: "5%"
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
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
      render: () => (
        <>
          <Link to={PATH_ADMIN_CATEGORY_EDIT}>
            <EditOutlined className="text-emerald-400 text-lg ml-4 hover:translate-x-0.5 hover:translate-y-0.5" />
          </Link>
          <DeleteOutlined className="text-red-400 text-lg ml-4 hover:translate-x-0.5 hover:translate-y-0.5" />
        </>
      ),
      width: "5%"
    }
  ];

  const getData = useCallback(() => {
    dispatch(getListCategories({ page: index, limit: 3 }));
  }, [dispatch, index]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    dispatch(getTotalCategories());
  }, [dispatch]);

  return (
    <>
      <Row className="mb-3">
        <Link
          to={PATH_ADMIN_CATEGORY_ADD}
          className="px-2 py-1 rounded bg-[#f16331] text-white hover:text-white mb-3 flex items-center justify-between"
        >
          <FileAddOutlined className="mr-1 text-lg"/>
          Add Product
        </Link>
      </Row>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey={(record) => record.id}
        pagination={false}
      />
      <Pagination
        className="mt-3"
        current={index}
        total={total.length}
        pageSize={3}
        onChange={handleChangePanigate}
      />
    </>
  );
};

export default CategoriList;
