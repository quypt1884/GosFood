import { EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {  useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch} from "store";
import { updateCategories } from "store/categoriesSlice";
import { ICategory } from "types/category.model";

interface CategoryEditProps {
  initialValues?: ICategory;
}
const CategoriEdit = ({ initialValues }: CategoryEditProps) => {
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  
  const onFinish = (values: any) => {
    dispatch(updateCategories(values));
    setIsModalVisibleEdit(false);
  };

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };

  const handleCancel = () => {
    setIsModalVisibleEdit(false);
  };

  return (
    <>
      <EditOutlined
        className="text-emerald-400 text-lg ml-4 hover:translate-x-0.5 hover:translate-y-0.5"
        onClick={showModalEdit}
      />
      <Modal
        title="Category Edit"
        visible={isModalVisibleEdit}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          initialValues={initialValues}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item label="ID Category" name="id" className="block">
            <Input readOnly title="Read only no edit" />
          </Form.Item>

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

          <Form.Item>
              <button
                type="submit"
                className="ml-2 px-3 py-1 text-white bg-[#f16331] rounded box-border"
              >
                Save
              </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoriEdit;
