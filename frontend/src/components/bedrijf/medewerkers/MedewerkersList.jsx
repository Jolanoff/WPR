import React, { useEffect, useState } from "react";
import api from "../../../api";

export const MedewerkersList = () => {
    const [medewerkers, setMedewerkers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedewerkers = async () => {
            try {
                const response = await api.get("/bedrijf/medewerkers");
                setMedewerkers(response.data);
            } catch (error) {
                console.error("Error fetching medewerkers:", error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMedewerkers();
    }, []);

    const handleRemove = async (medewerkerId) => {
        console.log(medewerkerId)
        if (!window.confirm("Weet u zeker dat u deze medewerker wilt verwijderen?")) {
            return;
        }

        try {
            await api.delete(`/bedrijf/verwijderen-bedrijf-medewerker/${medewerkerId}`);
            setMedewerkers((prev) => prev.filter((medewerker) => medewerker.id !== medewerkerId));
            alert("Medewerker succesvol verwijderd.");
        } catch (error) {
            console.error("Error removing medewerker:", error.response?.data?.message || error.message);
            alert("Het verwijderen van de medewerker is mislukt.");
        }
    };

    if (loading) {
        return <div>Bezig met laden...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto bg-white p-10 m-5 shadow rounded">
            <h2 className="text-2xl font-semibold mb-6 text-center">Medewerkerslijst</h2>
            {medewerkers.length === 0 ? (
                <p className="text-gray-700 text-center">Geen medewerkers gevonden.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Voornaam</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Achternaam</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Rol</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Adres</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medewerkers.map((medewerker, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{medewerker.voornaam}</td>
                                <td className="border border-gray-300 px-4 py-2">{medewerker.achternaam}</td>
                                <td className="border border-gray-300 px-4 py-2">{medewerker.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{medewerker.role}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {medewerker.straatnaam} {medewerker.huisnummer}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                        onClick={() => handleRemove(medewerker.id)}
                                    >
                                        Verwijderen
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
