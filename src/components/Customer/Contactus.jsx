import React from "react";
import { motion } from "framer-motion";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CallIcon from "@mui/icons-material/Call";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

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

const Contactus = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center bg-gray-100 p-8"
      >
        <HelpOutlineIcon
          className="text-purple-600"
          style={{ fontSize: "100px" }}
        />

        <div className="text-center mt-4">
          <h2 className="text-xl font-bold mb-3 text-gray-800">
            Need Help with SmartRack Inventory?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Welcome to the SmartRack Help Center. Get expert assistance for
            managing products, suppliers, stock, orders, and users — all in one
            place.
          </p>
        </div>

        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href="tel:+917825021029"
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition flex items-center gap-2"
        >
          <CallIcon />
          Contact Support
        </motion.a>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 space-y-4 text-gray-700"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <AccessTimeIcon className="text-purple-600" />
            24/7 Customer Support
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <VerifiedUserIcon className="text-purple-600" />
            Secure & Reliable Assistance
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <EmailIcon className="text-purple-600" />
            support@smartrack.com
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:col-span-2 flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-700 p-10 text-white"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center flex items-center gap-3">
          SmartRack Support Center
        </h1>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <Inventory2Icon
            style={{ fontSize: "160px" }}
            className="text-white/90"
          />
        </motion.div>

        <h2 className="mt-6 text-2xl font-semibold text-center">
          Inventory Experts at Your Service
        </h2>

        <p className="mt-3 text-center text-white/90 max-w-xl">
          Our support specialists help you resolve issues related to stock,
          orders, reports, and system configuration — ensuring your inventory
          runs smoothly 24/7.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-4xl"
        >
          {[
            {
              title: "Product Setup",
              desc: "Get help adding and organizing products.",
            },
            {
              title: "Stock Issues",
              desc: "Resolve low stock and mismatched inventory.",
            },
            {
              title: "Reports",
              desc: "Understand analytics and stock trends.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur p-5 rounded-lg text-center shadow-lg"
            >
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-white/80">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contactus;
