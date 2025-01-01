import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VoertuigDetails from "../../components/Huren/Aanvraag/VoertuigDetails";
import ActionButtons from "../../components/Huren/Aanvraag/ActionButtons";
import RequestPeriod from "../../components/Huren/Aanvraag/RequestPeriod";
import api from "../../api";

function AanvraagPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const voertuigDetails = location.state;

  

    if (!voertuigDetails) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-gray-600 text-lg font-medium">
                    Geen voertuiggegevens beschikbaar.
                </p>
            </div>
        );
    }

    const handlePayment = async () => {
        const aanvraagData = {
            startDatum: voertuigDetails.startDatum,
            eindDatum: voertuigDetails.eindDatum,
            status: false,
            aardVanReis: voertuigDetails.aardVanReis || "Onbekend", // Default if not provided
            verwachteKilometers: voertuigDetails.verwachteKilometers || 0,
            voertuigId: voertuigDetails.voertuigId, // Pass only voertuigId
        };
    
        try {
            const response = await api.post("/HuurAanvraag/create", aanvraagData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.status === 201) {
                alert("Huuraanvraag succesvol aangemaakt!");
                navigate("/success");
            } else {
                console.error("Unexpected response status:", response.status);
                alert("Er is een fout opgetreden bij het maken van de aanvraag.");
            }
        } catch (error) {
            console.error("Error during request:", error);
            alert("Kan geen verbinding maken met de server. Probeer het opnieuw.");
        }
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-50 flex justify-center items-center py-12 px-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl border-t-4 border-blue-500">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    Bevestig je Aanvraag
                </h2>
                <VoertuigDetails voertuigDetails={voertuigDetails} />
                <RequestPeriod
                    startDatum={voertuigDetails.startDatum}
                    eindDatum={voertuigDetails.eindDatum}
                />
                <ActionButtons
                    onConfirm={handlePayment}
                    onCancel={() => navigate(-1)}
                />
            </div>
        </div>
    );
}

export default AanvraagPage;
