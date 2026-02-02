import React from "react";
import { FaBox, FaHome, FaShoppingCart, FaTable } from "react-icons/fa";
import { ImTruck } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Slidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (user?.role === "admin") {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <FaHome />,
      isParent: true,
    },
    {
      name: "Categories",
      path: "/admin-dashboard/categories",
      icon: <FaTable />,
      isParent: false,
    },
    {
      name: "Products",
      path: "/admin-dashboard/products",
      icon: <FaBox />,
      isParent: false,
    },
    {
      name: "Suppliers",
      path: "/admin-dashboard/suppliers",
      icon: <ImTruck />,
      isParent: false,
    },
    {
      name: "Orders",
      path: "/admin-dashboard/orders",
      icon: <FaShoppingCart />,
      isParent: false,
    },
    {
      name: "Users",
      path: "/admin-dashboard/users",
      icon: <FaUsers />,
      isParent: false,
    },
  ];

  return (
    <div
      className="flex flex-col h-screen 
bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-700 
text-white w-16 md:w-64 fixed shadow-xl"
    >
      <div className="h-16 flex items-center justify-center">
        <span className="hidden md:block text-xl font-bold">Inventory MS</span>
        <span className="md:hidden text-xl font-bold">IMS</span>
      </div>

      <ul className="space-y-2 p-2">
        {menuItems.map((items, index) => (
          <li key={index}>
            <NavLink
              end={items.isParent}
              to={items.path}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-full transition duration-200 
   ${
     isActive
       ? "bg-white text-fuchsia-700 shadow-md"
       : "text-white hover:bg-white hover:text-fuchsia-700 "
   }`
              }
            >
              <span className="text-xl">{items.icon}</span>
              <span className="ml-4 hidden md:block">{items.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto p-2">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 rounded-full transition duration-200
               text-white hover:bg-white hover:text-fuchsia-700"
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          <span className="ml-4 hidden md:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Slidebar;
