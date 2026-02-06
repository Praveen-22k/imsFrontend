import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    outOfStock: 0,
    categories: 0,
    products: 0,
    users: 0,
    sales: 0,
    orders: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h4>Out of Stock</h4>
          <p>{stats.outOfStock}</p>
        </div>

        <div className="card">
          <h4>Categories</h4>
          <p>{stats.categories}</p>
        </div>

        <div className="card">
          <h4>Products</h4>
          <p>{stats.products}</p>
        </div>

        <div className="card">
          <h4>Customers</h4>
          <p>{stats.users}</p>
        </div>

        <div className="card">
          <h4>Total Sales</h4>
          <p>₹ {stats.sales}</p>
        </div>

        <div className="card">
          <h4>Total Orders</h4>
          <p>{stats.orders}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
