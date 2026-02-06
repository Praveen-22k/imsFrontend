import "./App.css";
import { Routes, Route } from "react-router-dom";
import Root from "./utils/Root";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import { Categorires } from "./components/Admin/Categorires";
import { Suppliers } from "./components/Admin/Suppliers";
import { Products } from "./components/Admin/Products";
import CustomerLayout from "./pages/CustomerLayout ";
import Home from "./components/Customer/Home";
import Purchase from "./components/Customer/purchase";
import AboutUs from "./components/Customer/Aboutus";
import ContactUs from "./components/Customer/Contactus";
import Cart from "./components/Customer/cart";
import Signup from "./pages/Signup";
import Users from "./components/Admin/Users";
import Purchased from "./components/Customer/Purchased";
import AdminPurchased from "./components/Admin/AdminPurchased";
import AdminDashboard from "./components/Admin/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoutes requireRole={["admin"]}>
            <Dashboard />
          </ProtectedRoutes>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="categories" element={<Categorires />} />
        <Route path="products" element={<Products />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="orders" element={<AdminPurchased />} />
        <Route path="users" element={<Users />} />
        <Route path="logout" element={<h1>Logout of dashboard</h1>} />
      </Route>

      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="cart" element={<Cart />} />
        <Route path="purchased" element={<Purchased />} />
      </Route>

      <Route
        path="/unauthorized"
        element={<p className="font-bold text-3xl mt-20 ml-20">Unauthorized</p>}
      />
    </Routes>
  );
}

export default App;
