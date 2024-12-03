import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RedirectIfLoggedIn } from "../utils/RedirectIfLoggedIn";
import api from "../api";
import RegisterForm from "../components/register/RegisterForm";


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    voornaam: "",
    achternaam: "",
    email: "",
    password: "",
    phoneNumber: "",
    straatnaam: "",
    huisnummer: "",
    role: "ParticuliereHuurder",
    kvkNummer: "",
    initials: "",
  });

  const [error, setError] = useState(null);
  const [responsePayload, setResponsePayload] = useState(null);
  const navigate = useNavigate();

  RedirectIfLoggedIn();

  const handleSubmit = async () => {
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
      <RegisterForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        error={error}
        responsePayload={responsePayload}
      />
    </div>
  );
};

export default RegisterPage;
