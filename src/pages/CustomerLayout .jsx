import { Outlet } from "react-router-dom";
import { Customer } from "../components/Customer/CustomerNavbar";
import { Footer } from "../components/Customer/CustomerFooter";

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Customer />

      <div className="flex-1 bg-gray-100">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default CustomerLayout;
