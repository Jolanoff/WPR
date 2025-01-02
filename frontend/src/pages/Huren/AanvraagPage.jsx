import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VoertuigDetails from "../../components/Huren/Aanvraag/VoertuigDetails";
import ActionButtons from "../../components/Huren/Aanvraag/ActionButtons";
import RequestPeriod from "../../components/Huren/Aanvraag/RequestPeriod";
import api from "../../api";

import ErrorMessage from "../../components/ErrorMessage";


function AanvraagPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const voertuigDetails = location.state;

    const [aardVanReis, setAardVanReis] = useState(""); 
    const [aantalKm, setAantalKm] = useState(0);
  

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
            aardVanReis: aardVanReis || "Onbekend", 
            verwachteKilometers: aantalKm,
            voertuigId: voertuigDetails.voertuigId,
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
            setError(error.response.data.error);
        }
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-50 flex justify-center items-center py-12 px-6">
            <ErrorMessage error={error} />
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl border-t-4 border-blue-500">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    Bevestig je Aanvraag
                </h2>
                <VoertuigDetails voertuigDetails={voertuigDetails} />
                <RequestPeriod
                    startDatum={voertuigDetails.startDatum}
                    eindDatum={voertuigDetails.eindDatum}
                />
                <div className="mb-4">
                    <label htmlFor="aardVanReis" className="block text-gray-700 font-medium mb-2 mt-5">
                        Aard van Reis:
                    </label>
                    <input
                        type="text"
                        id="aardVanReis"
                        className="w-full border rounded-md p-2"
                        value={aardVanReis}
                        onChange={(e) => setAardVanReis(e.target.value)}
                        placeholder="Bijvoorbeeld: Werk, Vakantie"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="aantalKm" className="block text-gray-700 font-medium mb-2">
                        Aantal KM:
                    </label>
                    <select
                        id="aantalKm"
                        className="w-full border rounded-md p-2"
                        value={aantalKm}
                        onChange={(e) => setAantalKm(parseInt(e.target.value))}
                    >
                        <option value={0}>Selecteer aantal kilometers</option>
                        <option value={50}>50 KM</option>
                        <option value={100}>100 KM</option>
                        <option value={150}>150 KM</option>
                        <option value={200}>200 KM</option>
                        <option value={250}>250 KM</option>
                        <option value={300}>300+ KM</option>
                    </select>
                </div>
                <ActionButtons
                    onConfirm={handlePayment}
                    onCancel={() => navigate(-1)}
                />
            </div>
        </div>
    );
}

export default AanvraagPage;
