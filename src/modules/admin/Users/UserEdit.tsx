import { EditOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "store";
import { updateUser } from "store/userSlice";
import { IUser } from "types/user.model";

interface UserEditProps {
  initialValues?: IUser;
}

const UserEdit = ({
  initialValues,
}: UserEditProps) => {
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: IUser) => {
    dispatch(updateUser(values)).catch((e) => console.log(e));
    setIsModalVisibleEdit(false)
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
        title="User Edit"
        visible={isModalVisibleEdit}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Form
          name="basic"
          initialValues={initialValues}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="password" hidden>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>x

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="isAdmin"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>IsAdmin</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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

export default UserEdit;
