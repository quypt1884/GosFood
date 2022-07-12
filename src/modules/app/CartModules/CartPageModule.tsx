import { DeleteOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Col, Empty, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  PATH_UER_MENU,
  PATH_USER_CHECKOUT
} from "routes/routes.paths";
import {
  addToCart,
  clearCart,
  decrement,
  getTotals,
  removeItem
} from "store/cartSlice";
import { AppDispatch, RootState } from "store";
import { convertMoney } from "helpers/convertMoney";
import { ICart } from "types/cart.model";
import CartItem from "./CartItem";

const CartPageModule = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, cartTotalAmount, cartTotalQuantity, dispatch]);

  const handleClickRemoveItem = (cartItem: ICart) => {
    dispatch(removeItem(cartItem));
  };

  const handleClickDecrement = (cartItem: ICart) => {
    dispatch(decrement(cartItem));
  };

  const handleClickIncreament = (cartItem: ICart) => {
    dispatch(addToCart({ ...cartItem, quantity: 1 }));
  };

  const handleClickClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className="mt-6">
        {cartItems.length <= 0 ? (
          <div className="translate-y-1/2">
            <div className="flex justify-center items-center">
              <Empty description={"No cart"} />
            </div>
            <Row className="flex justify-center items-center">
              <Col>
                <Link
                  to={PATH_UER_MENU}
                  className="flex items-center mt-5 hover:text-neutral-200 bg-[#f16331] p-1 rounded text-white"
                >
                  <LeftCircleOutlined className="mr-2 text-lg" />
                  Continue shopping
                </Link>
              </Col>
            </Row>
          </div>
        ) : (
          <>
            <p className="capitalize mb-2 font-bold text-lg">Shopping Cart</p>
            <Row className="flex justify-between">
              <Col span={17} className="ml-3 px-2 py-3">
                <Row className="font-semibold py-3 border-t-[1px] border-b-[1px] border-slate-200 flex justify-between items-center">
                  <Col className="mr-2 text-center" span={11}>
                    <p className="uppercase">PRODUCT</p>
                  </Col>
                  <Col className="mr-2 text-center" span={4}>
                    <p className="uppercase">QUANTITY</p>
                  </Col>
                  <Col className="mr-2" span={3}>
                    <p className="uppercase text-right">PRICE</p>
                  </Col>
                  <Col span={3}>
                    <p className="uppercase text-right">AMOUNT</p>
                  </Col>
                  <Col span={1}></Col>
                </Row>
                {cartItems.map((item: ICart) => {
                  return (
                    <CartItem
                      key={item.id}
                      item={item}
                      handleClickIncreament={() => handleClickIncreament(item)}
                      handleClickDecrement={() => handleClickDecrement(item)}
                      handleClickRemoveItem={() => handleClickRemoveItem(item)}
                    />
                  );
                })}

                <Row className="flex justify-between items-center mt-2">
                  <Col>
                    <Link
                      to={PATH_UER_MENU}
                      className="flex items-center mt-5 hover:text-[#f16331]"
                    >
                      <LeftCircleOutlined className="mr-2 text-lg" />
                      Continue shopping
                    </Link>
                  </Col>
                  <Col>
                    <div
                      onClick={() => handleClickClearCart()}
                      className="flex justify-end items-center text-base bg-[#f16331] text-white cursor-pointer rounded p-2 hover:bg-opacity-90"
                    >
                      <DeleteOutlined className="mr-3 " />
                      <span>Clear all</span>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <div className="bg-zinc-100 py-3 px-4 rounded-xl">
                  <p className="uppercase text-lg font-bold py-2 border-b-[1px] border-b-slate-200">
                    order summary
                  </p>

                  <Row className="flex justify-between mt-2 py-2 border-b-[1px] border-b-slate-200">
                    <Col span={16} className="text-sky-800 ">
                      Order total
                    </Col>
                    <Col span={8}>{convertMoney(Number(cartTotalAmount))}</Col>
                  </Row>
                  <div className="text-end  mt-3">
                    <Link
                      to={PATH_USER_CHECKOUT}
                      className="text-white bg-[#f16331] rounded-md py-[2px] px-1 hover:opacity-90 hover:text-white"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default CartPageModule;
