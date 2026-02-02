import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Cart = () => {
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
    try {
      await axios.put(`${baseApi}/cart/increase/${id}`, {}, authHeader);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (id) => {
    try {
      await axios.put(`${baseApi}/cart/decrease/${id}`, {}, authHeader);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${baseApi}/cart/remove/${id}`, authHeader);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.productId.productPrice * item.qty,
    0,
  );

  return (
    <div className="min-h-screen bg-[#f5f6f3] p-6">
      <h1 className="text-3xl font-semibold mb-6">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full min-w-[900px]">
            <thead className="border-b">
              <tr className="text-left text-gray-700">
                <th className="p-4">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Quantity</th>
                <th className="p-4">Total</th>
                <th className="p-4 text-center">Remove</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b"
                >
                  <td className="p-4">
                    <img
                      src={`${baseImageUrl}/${item.productId.image}`}
                      alt={item.productId.productName}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>

                  <td className="p-4 font-medium">
                    {item.productId.productName}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹ {item.productId.productPrice * item.qty}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="w-8 h-8 border rounded"
                      >
                        −
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="w-8 h-8 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="p-4 font-semibold">
                    ₹ {item.productId.productPrice * item.qty}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-xl font-bold hover:text-red-600"
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

      {cart.length > 0 && (
        <div className="flex justify-end mt-6">
          <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
            <div className="flex justify-between mb-4 text-lg font-semibold">
              <span>Total</span>
              <span>₹ {grandTotal}</span>
            </div>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-800 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
