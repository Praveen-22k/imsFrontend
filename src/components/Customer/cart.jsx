import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const baseApi = "http://localhost:9000/api";
  const baseImageUrl = "http://localhost:9000/upload";

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
    },
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("pos-user"));

      const res = await axios.get(`${baseApi}/cart/${user.id}`, authHeader);
      console.log("CArt data found:", res.data);

      // backend → { success, data:{ items:[...] } }
      setCart(res.data?.data?.items || []);
      setLoading(false);
    } catch (error) {
      console.log("Fetch cart error", error);
      setCart([]);
      setLoading(false);
    }
  };

  // ================= QTY =================
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

  // ================= CHECKOUT =================
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

  // ================= TOTAL =================
  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f5f6f3] p-4 md:p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Cart</h1>

        <button
          onClick={() => navigate("/customer/purchased")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Purchased
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Total</th>
                <th className="p-3">Remove</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b"
                >
                  <td className="p-3">
                    <img
                      src={`${baseImageUrl}/${item.image}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-3">{item.name}</td>

                  <td className="p-3">₹ {item.price}</td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="border px-2 rounded"
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="border px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="p-3">₹ {item.price * item.qty}</td>

                  <td className="p-3">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-600 text-xl"
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
          <div className="bg-white p-6 rounded-xl shadow w-[350px]">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Total</span>
              <span>₹ {grandTotal}</span>
            </div>

            <button
              onClick={checkout}
              className="w-full bg-purple-600 text-white py-3 rounded-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
