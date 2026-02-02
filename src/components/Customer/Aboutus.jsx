import React from "react";
import { FiSettings, FiEdit, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import StarIcon from "@mui/icons-material/Star";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Aboutus = () => {
  return (
    <>
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-purple-800 text-white text-center py-12 px-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-2">
            <InventoryIcon />
            SmartRack Inventory
          </h1>
          <p className="mt-3 text-sm md:text-base max-w-2xl mx-auto">
            SmartRack helps businesses manage products, stock, and suppliers in
            a secure, organized, and real-time inventory environment.
          </p>
        </motion.div>

        <div className="container mx-auto px-4 py-12 text-purple-600">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <DashboardIcon />
            SmartRack Key Features
          </h3>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <InventoryIcon sx={{ fontSize: 40 }} />,
                title: "Centralized Product Management",
                desc: "Manage all your products, categories, and pricing from one dashboard.",
              },
              {
                icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
                title: "Real-Time Stock Monitoring",
                desc: "View stock levels instantly and avoid over-stocking or shortages.",
              },
              {
                icon: <GroupsIcon sx={{ fontSize: 40 }} />,
                title: "Role-Based Access",
                desc: "Admins, managers, and staff get access based on their responsibilities.",
              },
              {
                icon: <AutorenewIcon sx={{ fontSize: 40 }} />,
                title: "Automatic Stock Updates",
                desc: "Stock is updated automatically when products are sold or restocked.",
              },
              {
                icon: <NotificationsActiveIcon sx={{ fontSize: 40 }} />,
                title: "Low Stock Alerts",
                desc: "Get notified when inventory levels drop below safe limits.",
              },
              {
                icon: <HistoryIcon sx={{ fontSize: 40 }} />,
                title: "Inventory History & Logs",
                desc: "Track every stock movement for better control and transparency.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="p-5 bg-white shadow rounded"
              >
                <div className="mb-3 text-purple-600">{item.icon}</div>
                <h5 className="font-semibold text-lg mb-2">{item.title}</h5>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="bg-gray-100 py-12 text-purple-600">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-8 text-center flex justify-center items-center gap-2">
              <SettingsIcon />
              How SmartRack Works
            </h3>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <AddBoxIcon sx={{ fontSize: 40 }} />,
                  title: "Add Products",
                  desc: "Create products with categories, price, and stock quantity.",
                },
                {
                  icon: <DashboardIcon sx={{ fontSize: 40 }} />,
                  title: "Manage Inventory",
                  desc: "Monitor stock, suppliers, and warehouse data in real-time.",
                },
                {
                  icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
                  title: "Analyze & Optimize",
                  desc: "View reports to improve stock planning and business growth.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-5 shadow rounded text-center"
                >
                  <div className="mb-3 text-purple-600">{item.icon}</div>
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 text-purple-600">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <StarIcon />
            Why Choose SmartRack?
          </motion.h3>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="space-y-3 text-base md:text-lg"
          >
            {[
              "Easy-to-use admin dashboard",
              "Accurate and real-time stock control",
              "Supports multiple suppliers and warehouses",
              "Prevents stock loss and over-ordering",
              "Built for growing businesses",
            ].map((item, i) => (
              <motion.li key={i} variants={fadeUp}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="bg-gray-100 py-12 text-purple-600">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center flex justify-center items-center gap-2">
              <FiSettings />
              How SmartRack Inventory Works
            </h3>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <FiEdit />,
                  title: "Add Products",
                  desc: "Add products with category, price, and stock quantity easily.",
                },
                {
                  icon: <SettingsIcon sx={{ fontSize: 40 }} />,
                  title: "Manage Inventory",
                  desc: "Track stock movement, suppliers, and warehouses in real-time.",
                },
                {
                  icon: <FiCheckCircle />,
                  title: "Instant Updates",
                  desc: "Get real-time updates whenever stock changes or orders are processed.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 shadow rounded-lg text-center"
                >
                  <div className="text-4xl mx-auto mb-4 text-purple-600">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
