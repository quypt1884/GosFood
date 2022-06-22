import { Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

const CategoriAdd = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name Category"
          name="name"
          rules={[{ required: true, message: "Please input name category!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input description category!" }
          ]}
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <button
            type="submit"
            className="ml-2 px-3 py-1 text-white bg-[#f16331] rounded box-border"
          >
            Add
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CategoriAdd;
