import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api"; // Import your axios instance

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
        setError("Invalid verification link.");
        return;
      }

      try {
        const response = await api.get(`/auth/verify-email`, {
          params: { userId, token },
        });

        setMessage("Your email has been successfully verified!");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after success
        }, 3000); // Redirect after 3 seconds
      } catch (err) {
        setError(err.response?.data?.message || "Email verification failed.");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Email Verification
        </h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!message && !error && <p>Verifying your email, please wait...</p>}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
