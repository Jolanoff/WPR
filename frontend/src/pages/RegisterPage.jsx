import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import voor navigatie

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "ParticuliereHuurder", // Standaard waarde
  });

  const [error, setError] = useState(null);
  const [responsePayload, setResponsePayload] = useState(null); 
  const navigate = useNavigate(); 

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
      const response = await fetch("http://localhost:7135/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response Payload:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registratie mislukt.");
      }

      // Als succesvol, stel de payload in en toon het
      setResponsePayload(data);

      // Simuleer een login (je kunt hier een echte login API call maken)
      const loginResponse = await fetch("http://localhost:7135/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Login mislukt na registratie.");
      }

      console.log("Login Response Payload:", loginData);

      // Redirect na succesvolle registratie en login
      navigate("/dashboard"); // Verander '/dashboard' naar je gewenste route
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
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
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
        {responsePayload && (
          <div className="text-green-500 text-sm mb-4">
            <p><strong>Succesvol:</strong> {JSON.stringify(responsePayload)}</p>
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
