import { Col, List, Pagination, PaginationProps, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import CardProduct from "components/Card/CardProduct";
import request from "helpers/request";
import { AppDispatch } from "store";
import { addToCart } from "store/cartSlice";
import { ICategory } from "types/category.model";
import { IProduct } from "types/product.model";

const MenuPageModule = () => {
  const pageSize = 8;
  const [current, setCurrent] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectOrder, setSelectOrder] = useState<string>("asc");
  const [selectSort, setSelectSort] = useState<string>("name");
  const [selectCategory, setSelectCategory] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams()

  const getProduct = useCallback(() => {
    if (selectCategory === "") return request.get(`/products`);
    else return request.get(`categories/${selectCategory}/products`);
  }, [selectCategory]);

  const getCategory = () => {
    return request.get(`/categories`);
  };

  const getProductList = useCallback(() => {
    if (selectCategory === "") {
      if(searchParams.get("search") != null) {
        return request.get(
          `/products?_limit=${pageSize}&_page=${current}&_order=${selectOrder}&_sort=${selectSort}&name_like=${searchParams.get("search")}`
        );
      }
      else 
      {
        return request.get(
          `/products?_limit=${pageSize}&_page=${current}&_order=${selectOrder}&_sort=${selectSort}`
        );
      }
    } else {
      if(searchParams.get("search") != null) {
        return request.get(
          `categories/${selectCategory}/products?_limit=${pageSize}&_page=${current}&_order=${selectOrder}&_sort=${selectSort}&name_like=${searchParams.get("search")}`
        );
      }
      else {
        return request.get(
          `categories/${selectCategory}/products?_limit=${pageSize}&_page=${current}&_order=${selectOrder}&_sort=${selectSort}`
        );
      }
    }
  }, [pageSize, current, selectCategory, selectOrder, selectSort, searchParams]);

  useEffect(() => {
    getProduct().then((response) => setTotalProduct(response.data.length));
  }, [getProduct]);

  useEffect(() => {
    getCategory().then((response) => setCategories(response.data));
  }, []);

  useEffect(() => {
    getProductList().then((response) => setProducts(response.data));
  }, [getProductList]);

  const handleChangepagination: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  const handleChangeSort = (e: any) => {
    setSelectSort(e.target.value);
  };

  const handleChangeOrder = (e: any) => {
    setSelectOrder(e.target.value);
  };

  const handleChangeFilterCategory = (e: any) => {
    setSelectCategory(e.target.value);
    setCurrent(1);
  };

  const handleClickAddtoCart = (product: IProduct) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <>
      <div className="text-center mt-9 mb-12">
        <h1 className="text-[2.5rem] text-[#414549] uppercase">
          WHAT’S POPULAR
        </h1>
        <p className="text-[#9a9a9a] mt-1 mb-5">Clients’ Most Popular Choise</p>
      </div>

      <Row>
        <Col span={19}>
          <List
            className="mt-4"
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 3
            }}
            dataSource={products}
            renderItem={(item: IProduct) => (
              <List.Item>
                <CardProduct
                  data={item}
                  onClick={() => handleClickAddtoCart(item)}
                />
              </List.Item>
            )}
          />
          {searchParams.get('search')!= null ? pageSize < products.length : pageSize < totalProduct && (
            <div className="flex justify-center">
              <Pagination
                current={current}
                pageSize={pageSize}
                onChange={handleChangepagination}
                total={searchParams.get('search') != null ? products.length : totalProduct}
              />
            </div>
          )}
        </Col>
        <Col span={5} className="p-3">
          <div className="mb-3">
            <p className="text-lg font-semibold mb-3">Category</p>
            <select
              onChange={handleChangeFilterCategory}
              className="w-full border-[1px] border-slate-300 p-1 rounded-md"
              placeholder="Select to category"
            >
              <option value="">All</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <p className="text-lg font-semibold mb-3">Sort</p>
            <select
              onChange={handleChangeSort}
              className="w-full border-[1px] border-slate-300 p-1 rounded-md"
              placeholder="Select to sort"
            >
              <option value="name">Name</option>
              <option value="newPrice">Price</option>
              <option value="discount">Discount</option>
            </select>
          </div>
          <div className="mb-3">
            <p className="text-lg font-semibold mb-3">Order</p>
            <select
              onChange={handleChangeOrder}
              className="w-full border-[1px] border-slate-300 p-1 rounded-md"
              placeholder="Select to sort"
            >
              <option value="desc">High to low</option>
              <option value="asc">Low to high</option>
            </select>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MenuPageModule;
