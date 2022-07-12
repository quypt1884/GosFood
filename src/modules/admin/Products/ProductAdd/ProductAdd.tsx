import { RollbackOutlined } from "@ant-design/icons";
import { Card, Checkbox, Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import ButtonLink from "components/Button/ButtonLink";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PATH_ADMIN_PRODUCT } from "routes/routes.paths";
import { AppDispatch, RootState } from "store";
import { getListCategories } from "store/categoriesSlice";
import { addProduct } from "store/productsSlice";
import { ICategory } from "types/category.model";
import { IProduct } from "types/product.model";

const ProductAdd = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { categories } = useSelector((state: RootState) => state.category);

  const getData = useCallback(() => {
    dispatch(getListCategories());
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onFinish = (values: IProduct) => {
    const newPrice = values.discount
      ? values.price - (values.discount * values.price) / 100
      : values.price;
    dispatch(addProduct({ ...values, newPrice: newPrice }))
      .unwrap()
      .then(() => {
        navigate(PATH_ADMIN_PRODUCT);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Form
        name="basic"
        initialValues={{ isStock: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row className="justify-between site-card-border-less-wrapper">
          <Col span={12} className="mr-2">
            <Card bordered={true} title="ADD PRODUCT FORM">
              <Form.Item
                label="Product name"
                name="name"
                className="block"
                rules={[
                  { required: true, message: "Please input product name!" }
                ]}
              >
                <Input />
              </Form.Item>

              <Row className="justify-between">
                <Col span={11}>
                  <Form.Item
                    name="categoryId"
                    label="Category"
                    className="block"
                    rules={[
                      { required: true, message: "Please select category!" }
                    ]}
                  >
                    <Select placeholder="select category">
                      {categories.map((category: ICategory) => {
                        return (
                          <Select.Option value={category.id} key={category.id}>
                            {category.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="size"
                    label="Size"
                    className="block"
                    rules={[{ required: true, message: "Please input size!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row className="justify-between">
                <Col span={11}>
                  <Form.Item
                    name="price"
                    label="Price"
                    className="block"
                    rules={[
                      { required: true, message: "Please input price!" },
                      {
                        pattern: /^[0-9][0-9]*$/,
                        message: "Price is number"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="discount"
                    label="Discount (%)"
                    className="block"
                    rules={[
                      {
                        pattern: /^[1-9][0-9]?$|^100$/,
                        message: "Discount from 0 to 100"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="justify-between">
                <Col span={24}>
                  <Form.Item
                    name="decription"
                    label="Description"
                    className="block"
                    rules={[
                      { required: true, message: "Please input description!" }
                    ]}
                  >
                    <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={11}>
            <Card title="Product" bordered={true}>
              <Row>
                <Col className="h-40 w-auto mx-auto my-0">
                  {/* <Image height="100%" src={} /> */}
                </Col>
              </Row>
              <Row className="justify-between">
                <Col span={24}>
                  <Form.Item label="Image" className="block" name="thumbnail">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <Form.Item
                    name="isStock"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                  >
                    <Checkbox>IsStock</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <div className="flex justify-between items-center">
                  <ButtonLink
                    to={PATH_ADMIN_PRODUCT}
                    className="bg-[#7a7776] text-white hover:text-white w-20"
                  >
                    <RollbackOutlined className="mr-1 text-base" />
                    <span>Back</span>
                  </ButtonLink>
                  <button
                    type="submit"
                    className="ml-2 px-3 py-1 text-white bg-[#f16331] rounded box-border"
                  >
                    Add
                  </button>
                </div>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ProductAdd;
