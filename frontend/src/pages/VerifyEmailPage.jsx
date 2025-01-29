import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api"; 

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token");

      if (!userId || !token) {
        setError("Ongeldige verificatielink");
        return;
      }

      try {
        const response = await api.get(`/auth/verify-email`, {
          params: { userId, token },
        });

        setMessage("Uw email is succesvol geverifieerd");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after success
        }, 3000); // Redirect after 3 seconds
      } catch (err) {
        setError(err.response?.data?.message || "Verificatie mislukt");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Email Verificatie
        </h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!message && !error && <p>Bezig met het verifieeren van uw email, even geduld...</p>}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
