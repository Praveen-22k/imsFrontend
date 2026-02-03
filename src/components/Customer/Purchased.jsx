import React, { useEffect, useState } from "react";
import axios from "axios";

const Purchased = () => {
  const [orders, setOrders] = useState([]);
  const baseApi = "http://localhost:9000/api";

  const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
    },
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("pos-user"));

    axios
      .get(`${baseApi}/purchased?userId=${user.id}`)
      .then((res) => {
        console.log("Full API response ", res);
        console.log("Backend data ", res.data);
        console.log("Orders array ", res.data.data);

        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log("API error", err);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#f5f6f3]">
      <h1 className="text-3xl font-bold mb-6">Purchased Items</h1>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p>
            <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
          </p>

          {order.items.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
              }}
            >
              <div>
                <b>{item.name}</b> {/* 👈 THIS WAS MISSING */}
                <div style={{ fontSize: "14px", color: "#666" }}>
                  Qty: {item.qty}
                </div>
              </div>

              <div>
                {item.qty} × ₹{item.price}
              </div>
            </div>
          ))}

          <hr />

          <h4 style={{ textAlign: "right" }}>Total: ₹ {order.totalAmount}</h4>
        </div>
      ))}
    </div>
  );
};

export default Purchased;
