import { Link } from "react-router-dom";

interface ButtonProps {
  style?: any;
  children?: React.ReactNode;
  onClick?: () => void;
  onChange?: () => void;
  className?: string;
  to: string;
}

const ButtonLink = (props: ButtonProps) => {
  return (
      <div className="flex items-center">
        <Link
        to={props.to}
        onClick={props.onClick}
        onChange={props.onChange}
        className={props.className + " flex items-center px-2 py-1 rounded  hover:bg-opacity-95 mb-3"}
        style={props.style}
      >
        {props.children}
      </Link>
      </div>
  );
};

export default ButtonLink;
