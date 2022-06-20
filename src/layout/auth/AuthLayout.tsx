import { Outlet } from "react-router-dom";

import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";

const AuthLayout = () => {
  return (
    <div>
      <Header />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
