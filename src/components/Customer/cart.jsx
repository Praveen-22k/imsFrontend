import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const baseApi = "http://localhost:9000/api";
  const baseImageUrl = "http://localhost:9000/upload";

  const [cart, setCart] = useState([]);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
    },
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("pos-user"));
      const res = await axios.get(`${baseApi}/cart/${user.id}`, authHeader);
      setCart(res.data.data.items);
    } catch (error) {
      console.log("Fetch cart error", error);
    }
  };

  const increaseQty = async (id) => {
    await axios.put(`${baseApi}/cart/increase/${id}`, {}, authHeader);
    fetchCart();
  };

  const decreaseQty = async (id) => {
    await axios.put(`${baseApi}/cart/decrease/${id}`, {}, authHeader);
    fetchCart();
  };

  const removeItem = async (id) => {
    await axios.delete(`${baseApi}/cart/remove/${id}`, authHeader);
    fetchCart();
  };

  const checkout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("pos-user"));

      await axios.post(
        `${baseApi}/purchased/checkout`,
        { userId: user.id },
        authHeader,
      );

      fetchCart();
      navigate("/customer/purchased");
    } catch (error) {
      alert("Checkout failed");
    }
  };

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.productId.productPrice * item.qty,
    0,
  );

  return (
    <div className="min-h-screen bg-[#f5f6f3] p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl md:text-3xl font-semibold">Cart</h1>

        <button
          onClick={() => navigate("/customer/purchased")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto"
        >
          Purchased Cart
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full min-w-[700px]">
            <thead className="border-b bg-gray-50">
              <tr className="text-gray-700 text-sm md:text-base">
                <th className="p-3">Image</th>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3">Total</th>
                <th className="p-3 text-center">Remove</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b text-sm md:text-base"
                >
                  <td className="p-3">
                    <img
                      src={`${baseImageUrl}/${item.productId.image}`}
                      alt={item.productId.productName}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                    />
                  </td>

                  <td className="p-3 font-medium">
                    {item.productId.productName}
                  </td>

                  <td className="p-3">₹ {item.productId.productPrice}</td>

                  <td className="p-3">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="w-7 h-7 border rounded"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => increaseQty(item._id)}
                        className="w-7 h-7 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="p-3 font-semibold">
                    ₹ {item.productId.productPrice * item.qty}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-xl hover:text-red-600"
                    >
                      ×
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TOTAL BOX */}
      {cart.length > 0 && (
        <div className="flex justify-end mt-6">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow w-full sm:w-[350px]">
            <div className="flex justify-between mb-4 text-lg font-semibold">
              <span>Total</span>
              <span>₹ {grandTotal}</span>
            </div>

            <button
              onClick={checkout}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-800"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
