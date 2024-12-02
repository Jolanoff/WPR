import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RedirectIfLoggedIn } from "../utils/RedirectIfLoggedIn";
import api from "../api"; // Import your axios instance

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: "", 
    naam: "", 
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    role: "ParticuliereHuurder",
    kvkNummer: "", 
  });

  const [error, setError] = useState(null);
  const [responsePayload, setResponsePayload] = useState(null);
  const navigate = useNavigate();

  RedirectIfLoggedIn();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponsePayload(null);

    try {
      const response = await api.post("/auth/register", formData);
      setResponsePayload(response.data);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Registreren
        </h2>
        {error && (
          <div className="text-red-500 text-sm mb-4">
            <p>
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}
        {responsePayload && (
          <div className="text-green-500 text-sm mb-4">
            <p>
              <strong>Succesvol:</strong> {JSON.stringify(responsePayload)}</p>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 font-medium">
            Gebruikersnaam
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="naam" className="block text-gray-700 font-medium">
            Volledige Naam
          </label>
          <input
            type="text"
            id="naam"
            name="naam"
            value={formData.naam}
            onChange={handleChange}
            required
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Wachtwoord
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-medium"
          >
            Telefoonnummer
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-medium">
            Adres
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-medium">
            Accounttype
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="ParticuliereHuurder">Particulier</option>
            <option value="Bedrijf">Bedrijf</option>
          </select>
        </div>
        {formData.role === "Bedrijf" && (
          <div className="mb-4">
            <label
              htmlFor="kvkNummer"
              className="block text-gray-700 font-medium"
            >
              KvK-nummer
            </label>
            <input
              type="text"
              id="kvkNummer"
              name="kvkNummer"
              value={formData.kvkNummer}
              onChange={handleChange}
              required={formData.role === "Bedrijf"}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Registreren
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
