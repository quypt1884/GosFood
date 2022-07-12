import { EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "store";
import { updateOrder } from "store/orderSlice";
import { IOrder } from "types/order.model";

interface OrderDetailProps {
  initialValues?: IOrder;
}
const OrderEdit = ({ initialValues }: OrderDetailProps) => {
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: IOrder) => {
    dispatch(updateOrder(values)).catch((e) => console.log(e));
    setIsModalVisibleEdit(false);
  };

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };

  const handleCancel = () => {
    setIsModalVisibleEdit(false);
  };

  const dataStatus = [
    "Order Placed",
    "Processing",
    "Shipping",
    "Completed",
    "Cancelled"
  ];
  return (
    <>
      <EditOutlined
        className="text-emerald-400 text-lg ml-4 hover:translate-x-0.5 hover:translate-y-0.5"
        onClick={showModalEdit}
      />
      <Modal
        title="Change status"
        visible={isModalVisibleEdit}
        footer={false}
        onCancel={handleCancel}
      >
        <Form
          name="change status order"
          initialValues={initialValues}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="id"
            label="id"
            rules={[{ required: true, message: "Please select status!" }]}
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <select
              placeholder="Select status"
              className="w-full border-[1px] border-slate-300 p-1 rounded-md outline-none"
            >
              {dataStatus.map((status, index) => {
                return (
                  <option value={status} key={index}>
                    {status}
                  </option>
                );
              })}
            </select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-2 px-3 py-1 text-white bg-[#f16331] rounded box-border"
              >
                Save
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OrderEdit;
