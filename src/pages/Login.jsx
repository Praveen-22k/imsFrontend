import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror(null);

    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/login",
        { email, password },
      );

      if (response.data.success) {
        await login(response.data.user, response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/customer");
        }
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      if (error.response) {
        seterror(error.response.data.message);
      } else {
        seterror("Something went wrong. Try again.");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen
      bg-gradient-to-b from-purple-600 via-purple-700 to-indigo-800 space-y-6"
    >
      <h2 className="text-3xl text-white">SmartRack Inventory </h2>

      <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-500 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <div className="bg-red-200 text-red-700 p-2 mb-4 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              required
              placeholder="Enter Email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              required
              placeholder="Enter Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
