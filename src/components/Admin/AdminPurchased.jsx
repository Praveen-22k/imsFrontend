import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPurchased = () => {
  const [orders, setOrders] = useState([]);
  const baseApi = "http://localhost:9000/api";

  useEffect(() => {
    axios
      .get(`${baseApi}/purchased/admin`)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log("Admin Purchased Error", err);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Purchased Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-white shadow rounded p-5 mb-6">
          <div className="flex justify-between mb-3">
            <div>
              <p className="font-semibold text-lg">{order.userId?.name}</p>
              <p className="text-gray-500 text-sm">{order.userId?.email}</p>
            </div>

            <div className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>

          <hr className="my-3" />

          {order.items.map((item) => (
            <div key={item._id} className="flex justify-between py-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>

              <div>₹ {item.qty * item.price}</div>
            </div>
          ))}

          <hr className="my-3" />

          <h3 className="text-right font-bold text-lg">
            Total: ₹ {order.totalAmount}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default AdminPurchased;
