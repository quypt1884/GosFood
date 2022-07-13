import {
  ArrowDownOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined
} from "@ant-design/icons";
import { Image, message, PaginationProps, Popconfirm, Row, Select, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { convertMoney } from "helpers/convertMoney";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  PATH_ADMIN_PRODUCT,
  PATH_ADMIN_PRODUCT_ADD
} from "routes/routes.paths";
import { AppDispatch, RootState } from "store";
import { getListCategories } from "store/categoriesSlice";
import { deleteProduct, getListProducts } from "store/productsSlice";
import { ICategory } from "types/category.model";
import { IProduct } from "types/product.model";

const ProductList = () => {
  const columns: ColumnsType<IProduct> = [
    {
      title: "No",
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => {
        return products.indexOf(record) + 1;
      },
      width: "2%"
    },
    {
      title: "img",
      dataIndex: "",
      render: (product) => (
        <>
          <Image src={product.thumbnail} alt="image product" />
        </>
      ),
      width: "5%"
    },
    {
      title: "Name",
      render: (product: IProduct) => (
        <Link to={PATH_ADMIN_PRODUCT + "/" + product.id}>{product.name}</Link>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: "20%"
    },
    {
      title: "Category",
      render: (product: IProduct) => (
        <>
          {
            categories.find(
              (category: ICategory) => category.id === product.categoryId
            )?.name
          }
        </>
      ),
      width: "10%"
    },
    {
      title: "Price",
      render: (product: IProduct) => (
        <>
          {convertMoney(Number(product.newPrice))}
          <div className="flex items-center">
            {product.discount ? (
              <>
                <ArrowDownOutlined className="text-red-600 mr-2" />
                <span className="text-red-600">{product.discount} %</span>
              </>
            ) : (
              ""
            )}
          </div>
        </>
      ),
      width: "5%"
    },
    {
      title: "Status",
      render: (product: IProduct) => (
        <>
          {product.isStock ? (
            <span className="bg-green-600 rounded px-2 py-1 text-white">
              Instock
            </span>
          ) : (
            <span className="bg-[#f16331] rounded px-2 py-1 text-white">
              Out of Stock
            </span>
          )}
        </>
      ),
      width: "8%"
    },
    {
      title: "",
      dataIndex: "",
      render: (product: IProduct) => (
        <>
          <Link to={"/admin/product/edit/" + product.id}>
            <EditOutlined
              className="text-emerald-400 text-lg ml-4 hover:translate-x-0.5 hover:translate-y-0.5"
              title="Edit"
            />
          </Link>
          <Popconfirm
            placement="bottomLeft"
            title={`Are you sure to delete ${product.name}?`}
            onConfirm={() => handleConfirmDelete(product.id)}
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

  const pageSize = 5;
  const [curent, setCurent] = useState<number>(1);
  const [status, setStatus] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { products, total } = useSelector((state: RootState) => state.product);
  const { categories } = useSelector((state: RootState) => state.category);

  const getData = useCallback(() => {
    dispatch(getListProducts(status))
    dispatch(getListCategories());
  }, [dispatch, status]);

  useEffect(() => {
    getData();
  }, [getData, total]);

  const handleConfirmDelete = (id: number) => {
    message.success("Delete success");
    dispatch(deleteProduct(id));
  };

  const handleChangePanigate: PaginationProps["onChange"] = (page) => {
    setCurent(page)
  };

  const handleChangStatus = (e: any) => {
    setStatus(e.target.value);
    setCurent(1);
  };

  return (
    <>
      <Row className="mb-3">
        <Link
          to={PATH_ADMIN_PRODUCT_ADD}
          className="px-2 py-1 rounded bg-[#f16331] text-white hover:text-white mb-3 flex items-center justify-between"
        >
          <FileAddOutlined className="mr-1 text-lg" />
          Add Product
        </Link>

        <select
          onChange={handleChangStatus}
          className="border-[1px] border-slate-300 h-9 ml-6 rounded-md"
        >
          <option value="">Select to filter status </option>
          <option value="true">InStock</option>
          <option value="false">Out of Stock</option>
        </select>
      </Row>
      <Table
        columns={columns}
        dataSource={products}
        rowKey={(record) => record.id}
        pagination={{
          current: curent,
          total: products.length,
          pageSize: pageSize,
          onChange: handleChangePanigate
        }}
      />
    </>
  );
};

export default ProductList;
