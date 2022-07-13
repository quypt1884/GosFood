import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, notification } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PATH_USER } from "routes/routes.paths";
import { AppDispatch, RootState } from "store";
import { logout, reset } from "store/authSlice";

const AdminHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token, users } = useSelector((state: RootState) => state.auth);

  const handleClickLogout = () => {
    notification.success({
      message: "Success logout"
    });
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to={PATH_USER}>Go to HomePage</Link>
        },
        {
          key: "2",
          label: <a onClick={handleClickLogout}>Logout</a>
        }
      ]}
    />
  );
  return (
    <div className="flex justify-center items-center">
      <Dropdown
        overlay={menu}
        placement="bottomLeft"
        arrow={{ pointAtCenter: true }}
      >
        <UserOutlined className="w-10 px-5 text-[#f16331] text-base" />
      </Dropdown>
      {token && (
        <span className="pl-2 flex items-center w-36">
          {users?.firstName + " " + users?.lastName}
        </span>
      )}
    </div>
  );
};

export default AdminHeader;
