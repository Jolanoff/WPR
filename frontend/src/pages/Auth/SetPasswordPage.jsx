import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { RedirectIfLoggedIn } from "../../utils/RedirectIfLoggedIn";

const SetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    RedirectIfLoggedIn()

    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        

        if (!userId || !token) {
            setError("Ongeldige link.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Wachtwoorden komen niet overeen.");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/auth/set-password", {
                userId,
                token,
                password,
            });
            setSuccess(true);
            alert(response.data.message || "Wachtwoord succesvol ingesteld!");
            setTimeout(() => navigate("/login"), 2000); // Redirect to login page
        } catch (err) {
            setError(err.response?.data.message || "Er is iets misgegaan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow p-6 rounded">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Stel een wachtwoord in
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success ? (
                    <p className="text-green-500 mb-4">
                        Uw wachtwoord is succesvol ingesteld. U wordt doorgestuurd naar de login-pagina.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Wachtwoord</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border px-3 py-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Bevestig wachtwoord</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border px-3 py-2 rounded w-full"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded ${
                                loading
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        >
                            {loading ? "Bezig..." : "Stel wachtwoord in"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SetPasswordPage;
