import React, { useState } from "react";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = { email, password };

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Login succesvol!");
                console.log("Token:", data.token); // Opslaan in localStorage of een state
            } else {
                const error = await response.json();
                alert(error.message || "Login mislukt");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Er is een fout opgetreden. Probeer het later opnieuw.");
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
        </div>
    );
}

export default LoginForm;
