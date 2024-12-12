import React, { useState, useEffect } from "react";
import UseAuthorization from "../../utils/UseAuthorization";
import api from "../../api";

function AdminPage() {
    const { isAuthorized, userRoles } = UseAuthorization(["Admin"]);

    const [formData, setFormData] = useState({
        gebruikersnaam: "",
        voornaam: "",
        achternaam: "",
        email: "",
        functie: "",
        role: "",
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            // Automatically update "functie" when "role" changes
            functie: name === "role" 
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
                functie: "",
                role: "",
            });
            fetchUsers();
        } catch (error) {
            alert(error.response?.data?.message || "Er is iets misgegaan.");
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get("/admin/users");
            setUsers(response.data);
        } catch (error) {
            alert("Fout bij het ophalen van gebruikers: " + error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    if (!isAuthorized) return <div>U bent niet bevoegd om deze pagina te bekijken.</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

            {/* Add User Form */}
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

            {/* Users List */}
            <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Gebruikerslijst</h2>
                {loading ? (
                    <p>Bezig met laden...</p>
                ) : users.length === 0 ? (
                    <p>Geen gebruikers gevonden.</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Gebruikersnaam</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Functie</th>
                                <th className="border border-gray-300 px-4 py-2">Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{user.gebruikersnaam}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.functie}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminPage;
