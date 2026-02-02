import React from "react";
import Slidebar from "../components/Admin/Slidebar";
import { Outlet } from "react-router";
const Dashboard = () => {
  return (
    <div className="">
      <div className="flex">
        <Slidebar />

        <div className="flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
