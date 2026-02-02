import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-700 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
            SmartRack Inventory
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
            Smart inventory management system to track purchases, stock, and
            suppliers efficiently.
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base text-white/90">
            <li>
              <Link to="/" className="hover:text-white hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/purchase" className="hover:text-white hover:underline">
                Purchase
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-white hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contactus"
                className="hover:text-white hover:underline"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">
            Why Choose Us
          </h3>
          <ul className="space-y-3 text-sm sm:text-base text-white/90">
            <li className="flex items-start gap-2">
              <CheckCircleIcon
                className="text-green-300 mt-0.5"
                fontSize="small"
              />
              Real-time inventory tracking
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon
                className="text-green-300 mt-0.5"
                fontSize="small"
              />
              Easy supplier & purchase management
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon
                className="text-green-300 mt-0.5"
                fontSize="small"
              />
              Secure and reliable system
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon
                className="text-green-300 mt-0.5"
                fontSize="small"
              />
              User-friendly dashboard
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 text-center py-4 text-xs sm:text-sm text-white/80 px-4">
        © {new Date().getFullYear()} SmartRack Inventory. All rights reserved.
      </div>
    </footer>
  );
};
