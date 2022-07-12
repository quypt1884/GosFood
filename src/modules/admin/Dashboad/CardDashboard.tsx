import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

interface CardDashboardProps {
  color?: string;
  icon?: React.ReactNode;
  quantity?: number;
  name?: string;
  link:string
}
const CardDashboard = (props: CardDashboardProps) => {
  return (
    <>
      <Card>
        <Link
          to={props.link}
          className={`text-[#00000073] hover:text-[${props.color}] flex p-2`}
        >
          {props.name}
        </Link>
        <Row className="flex justify-between items-center">
          <Col>{props.icon}</Col>
          <Col>
            <Row
              className={`w-14 h-14 rounded-[28px] border-[1px] border-[${props.color}] flex justify-center items-center text-2xl text-[${props.color}]`}
            >
              {props.quantity}
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CardDashboard;
