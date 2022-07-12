import {
  CloseCircleOutlined,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Col, Image, Row } from "antd";
import { useDispatch } from "react-redux";

import { convertMoney } from "helpers/convertMoney";
import { AppDispatch } from "store";
import { removeItem, updateQuantity } from "store/cartSlice";
import { ICart } from "types/cart.model";

interface CartItemProps {
  item: ICart;
  handleClickDecrement: () => void;
  handleClickRemoveItem: () => void;
  handleClickIncreament: () => void;
}
const CartItem = ({
  item,
  handleClickDecrement,
  handleClickIncreament,
  handleClickRemoveItem
}: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeQuantity = (e: any, cartItem: ICart) => {
    dispatch(updateQuantity({ ...cartItem, quantity: e.target.value }));
  };

  const handleBlurQuantity = (e: any, cartItem: ICart) => {
    if (e.target.value <= 0) dispatch(removeItem({ ...cartItem }));
  };
  return (
    <>
      <Row
        key={item.id}
        className="py-3 border-t-[1px] border-b-[1px] border-slate-200 flex justify-between items-center"
      >
        <Col span={11}>
          <Row className="flex items-center justify-between">
            <Col className="mr-2" span={12}>
              <div>
                <Image src={item?.thumbnail} height={120} />
              </div>
            </Col>
            <Col className="" span={11}>
              <p>{item.name}</p>
            </Col>
          </Row>
        </Col>
        <Col className="mr-2 " span={4}>
          <div className="flex items-center justify-center">
            <MinusOutlined
              className="hover:text-[#f16331]"
              onClick={handleClickDecrement}
            />
            <input
              type="text"
              onChange={(e) => handleChangeQuantity(e, item)}
              onBlur={(e) => handleBlurQuantity(e, item)}
              value={item.quantity}
              className="w-10 mx-1 text-center rounded-md border-gray-500 border-[1px]"
            />

            <PlusOutlined
              className="hover:text-[#f16331]"
              onClick={handleClickIncreament}
            />
          </div>
        </Col>
        <Col className="text-right mr-2" span={3}>
          <p>{convertMoney(Number(item.newPrice))}</p>
          {item.discount && (
            <p className="line-through text-red-500">
              {convertMoney(Number(item.price))}
            </p>
          )}
        </Col>
        <Col span={3} className="text-right mr-2">
          <p>{convertMoney(Number(item.newPrice) * Number(item.quantity))}</p>
        </Col>
        <Col span={1} className="text-end">
          <CloseCircleOutlined
            title="Remove"
            className="text-lg block hover:text-[#f16331] p-2"
            onClick={handleClickRemoveItem}
          />
        </Col>
      </Row>
    </>
  );
};

export default CartItem;
