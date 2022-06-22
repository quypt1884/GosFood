import { Card, Checkbox, Col, Form, Image, Input, Row, Select } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import TextArea from "antd/lib/input/TextArea";

import food1 from "assets/food/food-1.jpg";

const ProductAdd = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row className="justify-between site-card-border-less-wrapper">
          <Col span={12} className="mr-2">
            <Card bordered={true} title="ADD PRODUCT FORM">
              <Form.Item
                label="Product name"
                name="productName"
                className="block"
                rules={[
                  { required: false, message: "Please input product name!" }
                ]}
              >
                <Input />
              </Form.Item>

              <Row className="justify-between">
                <Col span={11}>
                  <Form.Item
                    name="category"
                    label="Category"
                    className="block"
                    rules={[
                      { required: false, message: "Please select category!" }
                    ]}
                  >
                    <Select placeholder="select category">
                      <Select.Option value="category1">
                        Category 1
                      </Select.Option>
                      <Select.Option value="category2">
                        Category 2
                      </Select.Option>
                      <Select.Option value="category3">
                        Category 3
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="size"
                    label="Size"
                    className="block"
                    rules={[{ required: false, message: "Please input size!" }]}
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
                      { required: false, message: "Please input price!" }
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
                      { required: false, message: "Please input discount!" }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="justify-between">
                <Col span={24}>
                  <Form.Item
                    name="descript"
                    label="Descript"
                    className="block"
                    rules={[
                      { required: false, message: "Please input descript!" }
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
                  <Image height="100%" src={food1} />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                  >
                    <Checkbox onChange={onChange}>IsStock</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <button
                      type="submit"
                      className="ml-2 px-3 py-1 text-white bg-[#f16331] rounded box-border"
                    >
                      Add
                    </button>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ProductAdd;
