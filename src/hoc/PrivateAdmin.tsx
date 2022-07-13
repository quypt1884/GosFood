import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PATH_USER } from "routes/routes.paths";
import { RootState } from "store";

const PrivateAdmin = () => {
  const { token, users } = useSelector((state: RootState) => state.auth);
  return token && users.isAdmin ? <Outlet /> : <Navigate to={PATH_USER} />;
};

export default PrivateAdmin;
