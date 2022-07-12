import { PlusOutlined } from "@ant-design/icons";
import { Card, Image, Tag } from "antd";
import { convertMoney } from "helpers/convertMoney";
import { Link } from "react-router-dom";
import { IProduct } from "types/product.model";
interface CardProductProps {
  data?: IProduct;
  style?: React.CSSProperties;
  onClick?: () => void;
}
const CardProduct = ({ data, style, onClick }: CardProductProps) => {
  return (
    <>
      {data && (
        <Card style={style} className="rounded-md h-[250px]">
          <div className="text-center">
            <Image
              title={data?.name}
              src={data?.thumbnail}
              height={120}
              alt="image product"
            />
          </div>
          <div className="flex justify-between items-end">
            <div className="mt-2 w-4/5">
              <Link
                to={"/app/product/" + data.id}
                className="font-bold mb-4 block overflow-hidden text-ellipsis"
                title={data?.name}
              >
                {data?.name}

                {data.discount && <Tag className="ml-2" color="#16a34a">-{data.discount}%</Tag>}
              </Link>
              <div className="flex">
                <p className="mr-3">
                  {convertMoney(Number(data?.newPrice))}
                </p>
                {data?.discount ? (
                  <p className="line-through text-red-500">
                    {convertMoney(Number(data?.price))}
                  </p>
                ) : (
                  <p> </p>
                )}
              </div>
            </div>
            <button
              onClick={onClick}
              title="Add To Cart"
              className="p-2 flex  border-[#f16331] border-1 bg-[#f16331] hover:bg-[#fb8960]"
            >
              <PlusOutlined className="text-white" />
            </button>
          </div>
        </Card>
      )}
    </>
  );
};

export default CardProduct;
