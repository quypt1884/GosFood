import { RollbackOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ButtonLink from "components/Button/ButtonLink";
import { PATH_ADMIN_CATEGORY } from "routes/routes.paths";
import { AppDispatch } from "store";
import { addCategories } from "store/categoriesSlice";

const CategoriAdd = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    dispatch(addCategories(values))
      .unwrap()
      .then(() => {
        navigate(PATH_ADMIN_CATEGORY);
      })
      .catch((e) => console.log(e));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
        <Form.Item
          label="Name Category"
          name="name"
          className="block"
          rules={[{ required: true, message: "Please input name category!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          className="block"
          rules={[
            {
              required: true,
              message: "Please input description category!"
            }
          ]}
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>

        <Form.Item
        >
          <div className="flex justify-between items-center">
          <ButtonLink
            to={PATH_ADMIN_CATEGORY}
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
      </Form>
    </>
  );
};

export default CategoriAdd;
