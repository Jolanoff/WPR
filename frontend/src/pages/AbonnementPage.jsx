import React, { useEffect, useState } from "react";
import api from "../api";
import { CheckRole } from "../utils/CheckRole";

const AbonnementPage = () => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [abonnementen, setAbonnementen] = useState([]);
    const [formData, setFormData] = useState({
        abonnementType: "pay-as-you-go",
        betaalmethode: "",
        startDatum: "",
    });
    const [kosten, setKosten] = useState(0);

    // Check if the user is authorized
    useEffect(() => {
        const verifyAuthorization = async () => {
            const isAuthorized = await CheckRole("Bedrijf");
            setIsAuthorized(isAuthorized);
        };
        verifyAuthorization();
    }, []);

    // Fetch subscriptions
    useEffect(() => {
        const fetchAbonnementen = async () => {
            try {
                const response = await api.get("/bedrijf");
                setAbonnementen(response.data);
            } catch (error) {
                console.error("Fout bij ophalen abonnementen:", error);
            }
        };

        if (isAuthorized) {
            fetchAbonnementen();
        }
    }, [isAuthorized]);

    // Calculate costs based on subscription type
    useEffect(() => {
        const abonnementKosten = formData.abonnementType === "pay-as-you-go" ? 50 : 500;
        setKosten(abonnementKosten);
    }, [formData.abonnementType]);

    // Determine if there's an active or valid subscription
    const hasValidSubscription = abonnementen.some((abonnement) => {
        const today = new Date();
        const startDatum = new Date(abonnement.startDatum);
        const eindDatum = new Date(abonnement.eindDatum);
        const stopDatum = abonnement.stopDatum ? new Date(abonnement.stopDatum) : null;

        return abonnement.status && (today < startDatum || today <= eindDatum || (stopDatum && today <= stopDatum));
    });

    // Handle new subscription creation
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("/bedrijf", {
                abonnementType: formData.abonnementType,
                betaalmethode: formData.betaalmethode,
                startDatum: formData.startDatum,
            });
            alert("Abonnement succesvol aangemaakt!");
            setAbonnementen((prev) => [...prev, response.data]);
        } catch (error) {
            if (error.response?.status === 400 || error.response?.status === 409) {
                alert(error.response.data.message || "Kan geen abonnement aanmaken.");
            } else {
                alert("Er is iets misgegaan.");
            }
        }
    };

    // Handle subscription cancellation
    const handleCancel = async (id) => {
        try {
            await api.delete(`/bedrijf/cancel`);
            alert("Abonnement succesvol geannuleerd!");
            setAbonnementen((prev) =>
                prev.map((abonnement) =>
                    abonnement.id === id
                        ? { ...abonnement, stopDatum: abonnement.stopDatum ?? new Date().toISOString().split("T")[0] }
                        : abonnement
                )
            );
        } catch (error) {
            console.error("Fout bij annuleren abonnement:", error);
            alert("Annuleren mislukt.");
        }
    };

    // Authorization check
    if (isAuthorized === null) {
        return <div>Bezig met laden...</div>;
    }

    if (!isAuthorized) {
        return <div>U bent geen bedrijf dus u kunt geen abonnement afsluiten.</div>;
    }

    // Determine the minimum allowed date (today)
    const minDate = new Date().toISOString().split("T")[0];

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-6">Beheer Abonnementen</h1>

            {/* Form for creating a new subscription */}
            {!hasValidSubscription ? (
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow rounded mb-6">
                    <h2 className="text-xl font-semibold mb-4">Nieuw Abonnement Aanmaken</h2>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">Abonnementstype</label>
                        <select
                            value={formData.abonnementType}
                            onChange={(e) => setFormData({ ...formData, abonnementType: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="pay-as-you-go">Pay-as-you-go (€50)</option>
                            <option value="prepaid">Prepaid (€500)</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">Kosten</label>
                        <input
                            type="text"
                            value={`€${kosten}`}
                            className="w-full border px-3 py-2 rounded bg-gray-100"
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">Betaalmethode</label>
                        <select
                            value={formData.betaalmethode}
                            onChange={(e) => setFormData({ ...formData, betaalmethode: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="iDeal">iDeal</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Creditcard">Creditcard</option>
                            <option value="Bankoverschrijving">Bankoverschrijving</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">Startdatum</label>
                        <input
                            type="date"
                            value={formData.startDatum}
                            min={minDate}
                            onChange={(e) => setFormData({ ...formData, startDatum: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Abonnement Aanmaken
                    </button>
                </form>
            ) : (
                <div className="max-w-lg mx-auto bg-yellow-100 p-6 shadow rounded mb-6">
                    <h2 className="text-xl font-semibold text-yellow-700 mb-4">
                        U heeft al een actief abonnement.
                    </h2>
                    <p className="text-gray-700">
                        U kunt geen nieuw abonnement aanmaken totdat uw huidige abonnement is verlopen of geannuleerd.
                    </p>
                </div>
            )}

            {/* Abonnementen overview */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Bestaande Abonnementen</h2>
                <ul className="bg-white p-4 shadow rounded">
                    {abonnementen.map((abonnement) => {
                        const today = new Date();
                        const startDatum = new Date(abonnement.startDatum);
                        const eindDatum = new Date(abonnement.eindDatum);
                        const stopDatum = abonnement.stopDatum ? new Date(abonnement.stopDatum) : null;

                        
                        let statusLabel = "Actief";

                        if (stopDatum && stopDatum > startDatum) {
                            statusLabel = "Geannuleerd";
                        } else if (!abonnement.status || today > eindDatum || (stopDatum && today > stopDatum)) {
                            statusLabel = "Verlopen";
                        }

                        return (
                            <li key={abonnement.id} className="mb-2 border-b pb-2">
                                <p><strong>Type:</strong> {abonnement.abonnementType}</p>
                                <p><strong>Startdatum:</strong> {abonnement.startDatum}</p>
                                <p><strong>Einddatum:</strong> {abonnement.eindDatum}</p>
                                {abonnement.stopDatum && <p><strong>Stopdatum:</strong> {abonnement.stopDatum}</p>}
                                <p><strong>Kosten:</strong> €{abonnement.kosten}</p>
                                <p><strong>Status:</strong> {statusLabel}</p>

                                {/* annuleren button */}
                                {statusLabel === "Actief" && !stopDatum && (
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                                        onClick={() => handleCancel(abonnement.id)}
                                    >
                                        Annuleren
                                    </button>
                                )}

                                {statusLabel === "Actief" && stopDatum && (
                                    <p><strong>Uw abonnement wordt stopgezet op:</strong> {abonnement.stopDatum}</p>
                                )}
                            </li>
                        );
                    })}

                </ul>
            </div>
        </div>
    );
};

export default AbonnementPage;
