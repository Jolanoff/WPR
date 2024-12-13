import React from "react";
import { useNavigate } from "react-router-dom";

export default function VoertuigCard({
    merk,
    type,
    kenteken,
    kleur,
    aanschafjaar,
    prijs,
    imageUrl,
    status, // Received as a prop
}) {
    const navigate = useNavigate();

    return (
        <div className="p-12">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    alert(
                        "TODO: Stuur naar /aanvraag met bijbehorende voertuigdata"
                    );
                }}
                className="bg-white p-8 rounded-lg w-full max-w-md shadow-md"
            >
                <img src={imageUrl} className="rounded-md mb-4" alt="vehicle" />
                <h1 className="text-4xl font-Alata mb-4">
                    {merk} {type}
                </h1>
                <div className="mb-8 font-Alata">
                    <p>Kenteken : {kenteken}</p>
                    <p>Kleur: {kleur}</p>
                    <p>Aanschafjaar : {aanschafjaar}</p>
                    <p className="mt-8 text-xl font-bold">{prijs}</p>
                    {/* Display the status as available/unavailable */}
                    <p
                        className={`mt-2 text-lg font-semibold ${
                            status ? "text-red-500" : "text-green-500"
                        }`}
                    >
                        Status: {status ? "Niet beschikbaar" : "Beschikbaar"}
                    </p>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Huren
                </button>
            </form>
        </div>
    );
}
