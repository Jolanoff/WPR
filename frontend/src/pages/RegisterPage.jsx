import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RedirectIfLoggedIn } from "../utils/RedirectIfLoggedIn";
import api from "../api";
import RegisterForm from "../components/register/RegisterForm";
import { HandleApiErrors } from "../utils/HandleApiError";
import ErrorMessage from "../components/ErrorMessage";

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
      
      setError(HandleApiErrors(err.response));
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <RegisterForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        responsePayload={responsePayload}
      />
       <ErrorMessage error={error} />
    </div>
  );
};

export default RegisterPage;
