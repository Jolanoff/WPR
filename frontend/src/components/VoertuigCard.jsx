import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VoertuigCard({
    voertuigId,
    merk,
    type,
    kenteken,
    kleur,
    aanschafjaar,
    prijs,
    voertuigType,
    trekvermogen,
    aantalDeuren,
    slaapplaatsen,
    imageUrl,
    status,
    reserveringen,
    startDatum,
    eindDatum
}) {
    const navigate = useNavigate();
    const [showReservations, setShowReservations] = useState(false);

    const handleRent = () => {
        navigate("/aanvraag", {
            state: {
                voertuigId,
                merk,
                type,
                kenteken,
                kleur,
                aanschafjaar,
                prijs,
                voertuigType,
                trekvermogen,
                aantalDeuren,
                slaapplaatsen,
                imageUrl,
                status,
                startDatum,
                eindDatum
            },
        });
    };

    return (
        <div className="p-4 md:p-12">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-md">
                <img
                    src={imageUrl}
                    className="rounded-md mb-4 w-full h-48 object-cover"
                    alt={`${merk} ${type}`}
                />
                <h1 className="text-4xl font-Alata mb-4">
                    {merk} {type} ({voertuigType})
                </h1>
                <div className="mb-8 font-Alata">
                    <p><strong>Kenteken:</strong> {kenteken}</p>
                    <p><strong>Kleur:</strong> {kleur}</p>
                    <p><strong>Aanschafjaar:</strong> {aanschafjaar}</p>

                    {voertuigType.toLowerCase() === "caravan" && trekvermogen && (
                        <p><strong>Trekvermogen:</strong> {trekvermogen} kg</p>
                    )}
                    {voertuigType.toLowerCase() === "auto" && aantalDeuren && (
                        <p><strong>Aantal deuren:</strong> {aantalDeuren}</p>
                    )}
                    {voertuigType.toLowerCase() === "camper" && slaapplaatsen && (
                        <p><strong>Slaapplaatsen:</strong> {slaapplaatsen}</p>
                    )}

                    <p className="mt-8 text-xl font-bold">
                        {prijs > 0 ? `€${prijs} Per Dag` : "Prijs is onbekend"}
                    </p>
                    <p
                        className={`mt-2 text-lg font-semibold ${!status ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        Status: {status ? "Niet beschikbaar" : "Beschikbaar"}
                    </p>
                </div>

                <button
                    onClick={handleRent}
                    disabled={status}
                    className={`w-full py-3 text-white font-semibold rounded-md transition duration-300 ${status
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    Huren
                </button>

                {status && (
                    <button
                        type="button"
                        className="w-full mt-4 py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-300"
                        onClick={() => setShowReservations(!showReservations)}
                    >
                        {showReservations
                            ? "Verberg reserveringen"
                            : "Toon reserveringen"}
                    </button>
                )}
            </div>

            {showReservations && status && (
                <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-md max-w-md">
                    <h2 className="text-lg font-bold mb-2">Reserveringen</h2>
                    {reserveringen && reserveringen.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {reserveringen.map((res, index) => (
                                <li key={index} className="mb-2">
                                    <p>Van: {res.startDatum.split("T")[0]}</p>
                                    <p>
                                        Tot en met:{" "}
                                        {res.eindDatum.split("T")[0]}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Geen reserveringen beschikbaar.</p>
                    )}
                </div>
            )}
        </div>
    );
}
