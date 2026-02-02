import Text from "../ui/Text";
import Imsbanner from "./imsbanner";
import { motion } from "framer-motion";
import { FaSearchLocation } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosPricetag } from "react-icons/io";
const Home = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <Imsbanner />
      <Text />
      <motion.div
        className="px-4 sm:px-6 md:px-10 lg:px-16 mt-[60px] text-center sm:text-left"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          className="font-extrabold 
                   text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                   block"
          style={{ color: "#6A1B9A" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          SmartRack: India’s Leading Inventory Management Platform.
        </motion.span>

        <motion.p
          className="mt-4 
                   text-sm sm:text-base md:text-lg lg:text-xl"
          style={{ color: "#B027F5" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          SmartRack is India’s leading inventory management platform for over 09
          years and 10+ million satisfied users. It offers a seamless stock and
          product management experience for businesses of all sizes.
        </motion.p>

        <motion.p
          className="mt-3 
                   text-sm sm:text-base md:text-lg lg:text-xl"
          style={{ color: "#B027F5" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          With 5200+ business partners and 730000+ products managed through
          SmartRack, you can easily track stock, monitor sales, and manage your
          inventory efficiently. You can also access powerful insights with
          exclusive tools and automated reports.
        </motion.p>
      </motion.div>
      <div
        className="bg-gray-100 py-12 mt-[110px]"
        style={{ color: "#B027F5" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h3
            className="font-bold mb-8 text-center text-2xl sm:text-3xl flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <i className="bi bi-tools"></i>
            Why Choose SmartRack?
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {/* Card 1 */}
            <motion.div
              className="flex flex-col items-center justify-center p-6 shadow rounded bg-white h-64 w-full max-w-xs text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FaSearchLocation size={50} style={{ color: "#B027F5" }} />
              <p className="mt-4 font-semibold" style={{ color: "#6A1B9A" }}>
                Smart Product Search
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="flex flex-col items-center justify-center p-6 shadow rounded bg-white h-64 w-full max-w-xs text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <IoLocationOutline size={50} style={{ color: "#B027F5" }} />
              <p className="mt-4 font-semibold" style={{ color: "#6A1B9A" }}>
                Real-Time Stock Tracking
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="flex flex-col items-center justify-center p-6 shadow rounded bg-white h-64 w-full max-w-xs text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <IoIosPricetag size={50} style={{ color: "#B027F5" }} />
              <p className="mt-4 font-semibold" style={{ color: "#6A1B9A" }}>
                Cost & Inventory Optimization
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
