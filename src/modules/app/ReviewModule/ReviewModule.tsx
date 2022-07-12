import { Checkbox, Form, Modal, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { useDispatch } from "react-redux";

import request from "helpers/request";
import { AppDispatch } from "store";
import { updateOrder } from "store/orderSlice";
import { IOrder } from "types/order.model";

interface ReviewModuleProps {
  orderItem: IOrder;
  productDetail: {
    id: number;
    quantity: number;
    note?: string;
    isReview: boolean;
  };
}

const ReviewModule = ({ orderItem, productDetail }: ReviewModuleProps) => {
  const [isModalVisibleReview, setIsModalVisibleReview] = useState(false);

  const dispatch = useDispatch<AppDispatch>()
  
  const showModalReview = () => {
    setIsModalVisibleReview(true);
  };

  const handleSubmitReview = (value: any) => {
    request
      .post("/rates", {
        ...value,
        foodId: productDetail.id,
        userId: orderItem.userId ? orderItem.userId : null,
        firstName: orderItem.firstName,
        lastName: orderItem.lastName,
        phone: orderItem.phone,
        dateRate: Date.now()
      })
      .then(() => {
        const list = orderItem.orderDetail.map((order) => {
          if (order.id === productDetail.id) {
            return { ...order, isReview: true };
          }
          return order;
        });
        dispatch(updateOrder({...orderItem,
          orderDetail: list,}))
          setIsModalVisibleReview(false);
      });
  };

  const handleCancel = () => {
    setIsModalVisibleReview(false);
  };

  return (
    <>
      <span
        className="bg-[#f16331] p-2 rounded-md inline-block text-white cursor-pointer"
        onClick={showModalReview}
      >
        Review
      </span>

      <Modal
        title={"Rate And Review"}
        visible={isModalVisibleReview}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="review"
          initialValues={{ point: 5 }}
          onFinish={handleSubmitReview}
          autoComplete="off"
          layout="horizontal"
        >
          <p className="my-3">
            Your email address will not be publisher. Required fields are mark.
          </p>
          <p>Your rating</p>
          <Form.Item name="point">
            <Rate allowClear={false} />
          </Form.Item>
          <Form.Item
            name="review"
            rules={[{ required: true, message: "Please input your review!" }]}
            label="Your review"
            className="block"
          >
            <TextArea showCount maxLength={100} style={{ height: 110 }} />
          </Form.Item>

          <Form.Item
            name="isAnonymous"
            label="Anonymous"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <button
            type="submit"
            className="px-3 py-1 text-white bg-[#f16331] rounded box-border"
          >
            Submit
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default ReviewModule;
