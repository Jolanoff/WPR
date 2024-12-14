import React, { useState } from "react";
import api from "../../api";

const MedewerkerForm = ({ onUserAdded }) => {
    const [formData, setFormData] = useState({
        gebruikersnaam: "",
        voornaam: "",
        achternaam: "",
        email: "",
        functie: "FrontOffice",
        role: "FrontOfficeMedewerker",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            functie:
                name === "role"
                    ? value === "FrontOfficeMedewerker"
                        ? "FrontOffice"
                        : "BackOffice"
                    : prev.functie,
        }));
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/admin/add-medewerker", formData);
            alert(response.data.message);
            setFormData({
                gebruikersnaam: "",
                voornaam: "",
                achternaam: "",
                email: "",
                functie: "FrontOffice",
                role: "FrontOfficeMedewerker",
            });
            onUserAdded();
        } catch (error) {
            alert(error.response?.data?.message || "Er is iets misgegaan.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded mb-6">
            <h2 className="text-xl font-semibold mb-4">Nieuwe Medewerker Toevoegen</h2>
            <form onSubmit={handleAddUser}>
                <div className="mb-4">
                    <label className="block font-medium mb-2">Gebruikersnaam</label>
                    <input
                        type="text"
                        name="gebruikersnaam"
                        value={formData.gebruikersnaam}
                        onChange={handleInputChange}
                        className="border px-3 py-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2">Voornaam</label>
                    <input
                        type="text"
                        name="voornaam"
                        value={formData.voornaam}
                        onChange={handleInputChange}
                        className="border px-3 py-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2">Achternaam</label>
                    <input
                        type="text"
                        name="achternaam"
                        value={formData.achternaam}
                        onChange={handleInputChange}
                        className="border px-3 py-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border px-3 py-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2">Rol</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="border px-3 py-2 rounded w-full"
                        required
                    >
                        <option value="FrontOfficeMedewerker">Front Office Medewerker</option>
                        <option value="BackOfficeMedewerker">Back Office Medewerker</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    Toevoegen
                </button>
            </form>
        </div>
    );
};

export default MedewerkerForm;
