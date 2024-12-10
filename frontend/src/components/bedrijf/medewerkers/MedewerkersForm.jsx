import React, { useState } from "react";
import api from "../../../api";

const MedewerkersForm = ({ userRole }) => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(userRole === "Bedrijf" ? "Wagenparkbeheerder" : "ZakelijkeHuurder");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("/bedrijf/toevoegen-bedrijf-medewerker", { email, role });
            alert(response.data.message);
            setEmail("");
        } catch (error) {
            alert(error.response?.data.message || "Er is iets misgegaan.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow rounded bg-white">
            <h2 className="text-xl font-semibold mb-4">Toevoegen Medewerker</h2>

            <div className="mb-4">
                <label className="block font-medium mb-2">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                    required
                />
            </div>

            {userRole === "Bedrijf" && (
                <div className="mb-4">
                    <label className="block font-medium mb-2">Rol</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border px-3 py-2 rounded w-full"
                    >
                        <option value="Wagenparkbeheerder">Wagenparkbeheerder</option>
                        <option value="ZakelijkeHuurder">ZakelijkeHuurder</option>
                    </select>
                </div>
            )}

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Toevoegen
            </button>
        </form>
    );
};

export default MedewerkersForm;
