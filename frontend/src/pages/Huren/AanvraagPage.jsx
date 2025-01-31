import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VoertuigDetails from "../../components/Huren/Aanvraag/VoertuigDetails";
import ActionButtons from "../../components/Huren/Aanvraag/ActionButtons";
import RequestPeriod from "../../components/Huren/Aanvraag/RequestPeriod";
import { useAuthStore } from "../../store/authStore"; 
import api from "../../api";
import ErrorMessage from "../../components/ErrorMessage";

function AanvraagPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userInfo } = useAuthStore(); 

    const [error, setError] = useState(null);
    const voertuigDetails = location.state;

    const [aardVanReis, setAardVanReis] = useState("");
    const [aantalKm, setAantalKm] = useState(0);
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [discountPoints, setDiscountPoints] = useState(0);
    
    // ✅ Ensure price is always a valid number
    const initialPrice = parseFloat(voertuigDetails?.prijs) || 0;
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(initialPrice);

    useEffect(() => {
        if (userInfo) {
            fetchLoyaltyPoints();
        }
    }, [userInfo]);

    const fetchLoyaltyPoints = async () => {
        try {
            const response = await api.get(`/loyalty/points/`);
            setLoyaltyPoints(response.data.points);
        } catch (error) {
            console.error("Error fetching loyalty points:", error);
            setLoyaltyPoints(0);
        }
    };

    const handleUsePoints = () => {
        const pointsToUse = Math.min(loyaltyPoints, 100); 
        const discount = pointsToUse * 0.1; 
        const newPrice = Math.max(0, priceAfterDiscount - discount);

        setDiscountPoints(pointsToUse);
        setPriceAfterDiscount(parseFloat(newPrice.toFixed(2))); 
    };

    const handlePayment = async () => {
        const aanvraagData = {
            startDatum: voertuigDetails.startDatum,
            eindDatum: voertuigDetails.eindDatum,
            aardVanReis: aardVanReis || "Onbekend", 
            verwachteKilometers: aantalKm,
            voertuigId: voertuigDetails.voertuigId,
            usedPoints: discountPoints,
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
            setError(error.response?.data?.message || "Er ging iets mis.");
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

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700">Loyaliteitspunten</h3>
                    <p className="text-gray-600">Beschikbare punten: {loyaltyPoints}</p>
                    <p className="text-gray-600">Te gebruiken punten: {discountPoints}</p>
                    <p className="text-gray-700 font-bold">
                        Prijs na korting: €{priceAfterDiscount.toFixed(2)}
                    </p>
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={handleUsePoints}
                    >
                        Gebruik punten
                    </button>
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
