import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PATH_USER } from "routes/routes.paths";

import { RootState } from "store";

const PrivateUser = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? <Outlet /> : <Navigate to={PATH_USER} />;
};

export default PrivateUser;
