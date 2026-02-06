import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const baseApi = "http://localhost:9000/api";
  const baseImageUrl = "http://localhost:9000/upload";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseApi}/product`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category?.categoryName)),
  ];

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category?.categoryName === selectedCategory;

    const matchesSearch = item.productName
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("pos-user"));
      console.log(user);

      await axios.post(
        `${baseApi}/cart/add`,
        { productId: product._id, userId: user.id },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        },
      );

      alert("Added to cart");
    } catch (error) {
      console.error("Add to cart error", error);
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border-2 border-gray-400 rounded-lg"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border-2 border-gray-400 rounded-lg"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={`${baseImageUrl}/${product.image}`}
              alt={product.productName}
              className="w-full h-48 object-contain p-2 bg-white"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.productName}</h2>

              <p className="text-purple-600 text-sm mb-2">
                {product.productDescription}
              </p>

              <p className="font-bold text-blue-600">
                ₹ {product.productPrice}
              </p>

              <p className="text-sm text-gray-500 mb-3">
                Category: {product.category?.categoryName}
              </p>

              <div className="flex gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg"
                >
                  View Details
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products found</p>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <img
              src={`${baseImageUrl}/${selectedProduct.image}`}
              alt=""
              className="w-full h-60 object-cover rounded mb-4"
            />

            <h2 className="text-xl font-bold">{selectedProduct.productName}</h2>

            <p className="text-gray-600 mb-2">
              {selectedProduct.productDescription}
            </p>

            <p className="font-bold text-blue-600 mb-2">
              ₹ {selectedProduct.productPrice}
            </p>

            <button
              onClick={() => setSelectedProduct(null)}
              className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
