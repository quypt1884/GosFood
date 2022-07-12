import { RollbackOutlined } from "@ant-design/icons";
import { Card, Checkbox, Col, Form, Image, Input, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import ButtonLink from "components/Button/ButtonLink";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_ADMIN_PRODUCT } from "routes/routes.paths";
import { AppDispatch, RootState } from "store";
import { getProductById, updateProduct } from "store/productsSlice";
import { ICategory } from "types/category.model";

const ProductEdit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, productDetail } = useSelector(
    (state: RootState) => state.product
  );
  const { categories } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(getProductById(Number(id)));
  }, [id, dispatch]);

  const onFinish = (values: any) => {
    const newPrice = values.discount ?  values.price - (values.discount*values.price/100) : values.price;
    dispatch(updateProduct({...values, price: Number(values.price) ,newPrice: newPrice }))
      .unwrap()
      .then(() => {
        navigate(PATH_ADMIN_PRODUCT);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {Object.keys(productDetail).length > 0 && !isLoading && (
        <Form
          name="basic"
          initialValues={productDetail}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row className="justify-between site-card-border-less-wrapper">
            <Col span={12} className="mr-2">
              <Card bordered={true} title="ADD PRODUCT FORM">
                <Form.Item
                  name="id"
                  className="block"
                  hidden
                  rules={[
                    { required: true, message: "Please input product name!" }
                  ]}
                >
                  <Input />
                </Form.Item>
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
                        {categories.map((category:ICategory) => {
                          return (
                            <Select.Option
                              value={category.id}
                              key={category.id}
                            >
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
                      rules={[
                        { required: true, message: "Please input size!" }
                      ]}
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
                      label="Discount"
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
                    <Image height="100%" src={productDetail.thumbnail} />
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
                      <Checkbox checked={productDetail.isStock}>
                        IsStock
                      </Checkbox>
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
                    Save
                  </button>
                </div>
              </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default ProductEdit;
