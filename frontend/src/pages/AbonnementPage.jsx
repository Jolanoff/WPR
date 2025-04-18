import React, { useEffect, useState } from "react";
import api from "../api";
import AbonnementForm from "../components/bedrijf/abonnement/AbonnementForm";
import AbonnementList from "../components/bedrijf/abonnement/AbonnementList";
import UseAuthorization from "../utils/UseAuthorization";

const AbonnementPage = () => {
    const { isAuthorized } = UseAuthorization(["Bedrijf"]);

    const [abonnementen, setAbonnementen] = useState([]);
    const [formData, setFormData] = useState({
        abonnementType: "pay-as-you-go",
        betaalmethode: "iDeal",
        startDatum: "",
        kosten: 50,  
        customAmount: "",  
    });

    useEffect(() => {
        if (!isAuthorized) return;

        const fetchAbonnementen = async () => {
            try {
                const response = await api.get("/bedrijf");
                setAbonnementen(response.data);
            } catch (error) {
                console.error("Fout bij ophalen abonnementen:", error);
            }
        };

        fetchAbonnementen();
    }, [isAuthorized]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                ...formData,
                kosten: parseFloat(formData.kosten),  
                customAmount: parseFloat(formData.customAmount) || 0,  
            };

            await api.post("/bedrijf", payload);
            alert("Abonnement succesvol aangemaakt!");
            setAbonnementen((prev) => [...prev, payload]);
        } catch (error) {
            alert(error.response?.data.message || "Er is iets misgegaan.");
        }
    };

    const handleCancel = async (id) => {
        try {
            await api.delete(`/bedrijf/cancel`);
            alert("Abonnement succesvol geannuleerd!");
            setAbonnementen((prev) =>
                prev.map((abonnement) =>
                    abonnement.id === id ? { ...abonnement, stopDatum: new Date().toISOString() } : abonnement
                )
            );
        } catch (error) {
            console.error("Fout bij annuleren abonnement:", error);
        }
    };

    if (!isAuthorized) return <div>U bent niet bevoegd om deze pagina te bekijken.</div>;

    const hasValidSubscription = abonnementen.some((abonnement) => {
        const today = new Date();
        const startDatum = new Date(abonnement.startDatum);
        const eindDatum = new Date(abonnement.eindDatum);
        const stopDatum = abonnement.stopDatum ? new Date(abonnement.stopDatum) : null;

        return abonnement.status && (today < startDatum || today <= eindDatum || (stopDatum && today <= stopDatum));
    });

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-6">Beheer Abonnementen</h1>

            {!hasValidSubscription ? (
                <AbonnementForm
                    onSubmit={handleSubmit}
                    formData={formData}
                    setFormData={setFormData}
                />
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

            <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Abonnementen</h2>
                <AbonnementList abonnementen={abonnementen} handleCancel={handleCancel} />
            </div>
        </div>
    );
};

export default AbonnementPage;
