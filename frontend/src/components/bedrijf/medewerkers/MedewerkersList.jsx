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

    if (loading) {
        return <div>Bezig met laden...</div>;
    }


   return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Medewerkerslijst</h2>
            {medewerkers.length === 0 ? (
                <p className="text-gray-700">Geen medewerkers gevonden.</p>
            ) : (
                <ul>
                    {medewerkers.map((medewerker) => (
                        <li
                            key={medewerker.Id}
                            className="mb-2 border-b pb-2 flex justify-between items-center"
                        >
                            <div>
                                <p>
                                    <strong>Email:</strong> {medewerker.email}
                                </p>
                                <p>
                                    <strong>Rol:</strong> {medewerker.role}
                                </p>
                                <p>
                                    <strong>Adres:</strong> {medewerker.straatnaam} {medewerker.huisnummer}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};