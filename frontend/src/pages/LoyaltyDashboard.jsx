import React, { useState, useEffect } from "react";
import api from "../api";

const LoyaltyDashboard = ({ klantId, refreshTrigger }) => {
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLoyaltyPoints = async () => {
        try {
            const response = await api.get(`/loyalty/points/`);
            setPoints(response.data.points);
            setError(null);
        } catch (error) {
            setError("Fout bij het ophalen van loyaliteitspunten.");
            console.error("API Fout:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoyaltyPoints();
    }, [klantId, refreshTrigger]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Loyaliteitspunten</h2>
            {loading ? (
                <p>Laden...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <p className="text-xl font-bold">{points} punten</p>
            )}
            <button
                onClick={fetchLoyaltyPoints}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Refresh punten
            </button>
        </div>
    );
};

export default LoyaltyDashboard;
