import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import ErrorMessage from "./ErrorMessage";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserInfo = useAuthStore((state) => state.fetchUserInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Log in the user
      await api.post("/auth/login", { email, password });

      // Fetch user info and store in Zustand
      await fetchUserInfo();

      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || "Login failed");
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-12">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Inloggen
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Wachtwoord
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Inloggen
        </button>
      </form>
      <ErrorMessage error={error} />
    </div>
  );
}

export default LoginForm;
