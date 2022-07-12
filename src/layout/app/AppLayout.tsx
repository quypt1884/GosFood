import { Outlet } from "react-router-dom";

import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-[70vh] mx-auto my-0 max-w-7xl">
        <Outlet/>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
