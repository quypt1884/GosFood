import { Col, Form, Image, Input, Row } from "antd";
import { convertMoney } from "helpers/convertMoney";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "store";
import { clearCart } from "store/cartSlice";
import { addOrder } from "store/orderSlice";
import { ICart } from "types/cart.model";
import { IUser } from "types/user.model";

const CheckoutModule = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const { users } = useSelector((state: RootState) => state.auth);
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  const orderItem = cartItems.map((cartItem:ICart)=> ({
    id:cartItem.id,
    quantity: cartItem.quantity,
    isReview : false
  }))
  
  const handleSubmit = (value: IUser) => {
    dispatch(
      addOrder({
        userId: users.id ? users.id : null,
        firstName: value.firstName,
        lastName: value.lastName,
        phone: value.phone,
        address: value.address,
        orderDetail: orderItem,
        totalMoney: cartTotalAmount
      })
    ).unwrap().then((response)=>{
      dispatch(clearCart());
      navigate(`/app/order/${response.id}`)
    });
  };

  return (
    <>
      <Form layout="vertical" initialValues={users} onFinish={handleSubmit}>
        <Row className="mt-6 flex justify-between">
          <Col span={15}>
            <div className="p-3">
              <p className="capitalize mb-2 font-bold text-lg">
                Recipient information
              </p>
              <Row className="flex justify-between">
                <Col span={11}>
                  <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your First name!"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Last name!"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row className="flex justify-between">
                <Col span={11}>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      { required: true, message: "Please input your phone!" }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      { required: true, message: "Please input your adress!" }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={8}>
            <div className="bg-zinc-100 py-3 px-4">
              <Col>
                <p className="capitalize mb-2 text-lg font-bold border-b-[1px] border-slate-200 pb-2 px-2">
                  Your Order
                </p>
              </Col>
              {cartItems.length > 0 &&
                cartItems.map((cartItem: ICart) => {
                  return (
                    <Row
                      key={cartItem.id}
                      className="flex items-center border-b-[1px] border-slate-200 pb-2"
                    >
                      <Col span={5} className="ml-1 p-2">
                        <Image src={cartItem.thumbnail} />
                      </Col>
                      <Col span={11} className="ml-1 p-2">
                        <p>{cartItem.name}</p>
                      </Col>
                      <Col span={3} className="ml-1 p-2">
                        {cartItem.quantity}
                      </Col>
                      <Col span={3} className="ml-1 text-end">
                        {convertMoney(
                          Number(cartItem.newPrice * cartItem.quantity)
                        )}
                      </Col>
                    </Row>
                  );
                })}
              <Row className="flex items-center border-b-[1px] border-slate-200 pb-2">
                <Col span={16} className="ml-1 p-2">
                  Total quantity:
                </Col>
                <Col span={3} className="ml-1 p-2">
                  {cartTotalQuantity}
                </Col>
                <Col span={3} className="ml-1 text-end"></Col>
              </Row>
              <Row className="flex justify-between items-center mt-3 p-2">
                <Col span={12} className="font-bold">
                  Total:
                </Col>
                <Col className="text-end" span={12}>
                  {convertMoney(Number(cartTotalAmount))}
                </Col>
              </Row>
              <button
                type="submit"
                className="p-2 bg-[#f16331] inline-block w-full text-white rounded-xl mt-2"
              >
                Order
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CheckoutModule;
