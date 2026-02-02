import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:9000/api/auth/signup", {
        name,
        email,
        password,
        address,
      });

      if (res.data.success) {
        await login(res.data.user, res.data.token);
        navigate("/Login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-600 via-purple-700 to-indigo-800">
      <h2 className="text-3xl text-white mb-1">SmartRack Inventory </h2>
      <div className="bg-white rounded-2xl shadow-xl p-10 w-[350px]">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {error && <p className="bg-red-200 text-red-700 p-2 mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border mb-3"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border mb-3"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border mb-3"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 border mb-3"
            onChange={(e) => setAddress(e.target.value)}
          />

          <button className="w-full bg-green-600 text-white py-2 rounded">
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
