import React, { useEffect, useState } from "react";
import api from "../../../api";

import { HandleApiErrors } from "../../../utils/HandleApiError";
import ErrorMessage from "../../ErrorMessage";

const MedewerkersForm = ({ userRole = [] }) => {
    const [voornaam, setVoornaam] = useState("");
    const [achternaam, setAchternaam] = useState("");
    const [gebruikersnaam, setGebruikersnaam] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("ZakelijkeHuurder");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("/bedrijf/toevoegen-bedrijf-medewerker", { gebruikersnaam, voornaam, achternaam, email, role });
            alert(response.data.message);
            setVoornaam("");
            setAchternaam("");
            setGebruikersnaam("");
            setEmail("");
        } catch (error) {
            setError(HandleApiErrors(error.response));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow rounded bg-white">
            <h2 className="text-xl font-semibold mb-4">Toevoegen Medewerker</h2>

            <div className="mb-4">
                <label className="block font-medium mb-2">Gebruikersnaam</label>
                <input
                    type="text"
                    value={gebruikersnaam}
                    onChange={(e) => setGebruikersnaam(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-2">Voornaam</label>
                <input
                    type="text"
                    value={voornaam}
                    onChange={(e) => setVoornaam(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-2">Achternaam</label>
                <input
                    type="text"
                    value={achternaam}
                    onChange={(e) => setAchternaam(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                    required
                />
            </div>
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

            {userRole.includes("Bedrijf") && (
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
            <ErrorMessage error={error} />

        </form>
    );
};

export default MedewerkersForm;
