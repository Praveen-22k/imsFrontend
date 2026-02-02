import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { Logo } from "../../assets/assets";
import Signup from "../../pages/Signup";
export const Customer = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/Signup");
  };

  const menu = ["Home", "Purchase", "About Us", "Contact Us"];

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-700 px-4 sm:px-6 lg:px-10 py-3 shadow-xl sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={Logo}
            alt="SmartRack Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full bg-white p-1 transition-transform duration-300 hover:scale-125"
          />
          <span className="text-lg sm:text-2xl font-bold text-white tracking-wide">
            SmartRack Inventory
          </span>
        </div>

        <div className="hidden md:flex gap-6 lg:gap-10 text-sm lg:text-lg font-medium">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={
                item === "Home"
                  ? "/customer"
                  : `/customer/${item.toLowerCase().replace(" ", "")}`
              }
              className="text-white px-3 py-1.5 rounded-full transition-all hover:bg-white hover:text-purple-700 hover:shadow-lg"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link
            to="/customer/cart"
            className="text-white hover:text-yellow-300"
          >
            <FaShoppingCart size={22} />
          </Link>

          <button
            onClick={handleLogout}
            className="bg-white text-purple-700 px-4 lg:px-5 py-1.5 rounded-full text-sm lg:text-base font-semibold hover:bg-purple-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 bg-white/20 backdrop-blur-lg rounded-xl p-4 space-y-3 text-sm">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={
                item === "Home"
                  ? "/customer"
                  : `/customer/${item.toLowerCase().replace(" ", "")}`
              }
              onClick={() => setOpen(false)}
              className="block text-white px-4 py-2 rounded-lg hover:bg-white hover:text-purple-700 transition"
            >
              {item}
            </Link>
          ))}

          <Link
            to="/customer/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-purple-700"
          >
            <FaShoppingCart size={18} />
            Cart
          </Link>

          <button
            onClick={handleLogout}
            className="w-full bg-white text-purple-700 py-2 rounded-lg font-semibold hover:bg-purple-400 hover:text-white"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
