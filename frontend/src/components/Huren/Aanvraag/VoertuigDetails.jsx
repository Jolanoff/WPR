import { useState, useEffect } from "react";

function VoertuigDetails({ voertuigDetails }) {
    const [totalPrice, setTotalPrice] = useState("Prijs is onbekend");
    const [totalDays, setTotalDays] = useState(0);

    useEffect(() => {
        if (voertuigDetails?.startDatum && voertuigDetails?.eindDatum && voertuigDetails?.prijs) {
            const start = new Date(voertuigDetails.startDatum);
            const end = new Date(voertuigDetails.eindDatum);
            const differenceInMilliseconds = end - start;
            const days = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

            const adjustedDays = days > 0 ? days : 1;
            setTotalDays(adjustedDays);
            if (adjustedDays > 0 && voertuigDetails.prijs > 0) {
                setTotalPrice(`€${(adjustedDays * voertuigDetails.prijs).toFixed(2)}`);
            } else {
                setTotalPrice("Prijs is onbekend");
            }
        }
    }, [voertuigDetails]);

    return (
        <div className="grid grid-cols-2 gap-6">
            <img
                src={voertuigDetails.imageUrl}
                alt={`${voertuigDetails.merk} ${voertuigDetails.type}`}
                className="rounded-lg w-full object-cover"
            />
            <div className="flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                        Voertuig Details
                    </h3>
                    <p className="text-gray-600">
                        <span className="font-medium">Merk:</span> {voertuigDetails.merk}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Type:</span> {voertuigDetails.type}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Kenteken:</span>{" "}
                        {voertuigDetails.kenteken}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Kleur:</span> {voertuigDetails.kleur}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Locatie:</span> {voertuigDetails.locatie}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Aanschafjaar:</span>{" "}
                        {voertuigDetails.aanschafjaar}
                    </p>
                    <p className="text-gray-600 text-lg font-bold mt-2">
                        <span className="font-medium">Totale Dagen:</span> {totalDays} dag{totalDays > 1 ? "en" : ""}
                    </p>
                    <p className="text-gray-600 text-lg font-bold mt-2">
                        <span className="font-medium">Prijs:</span> {totalPrice}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VoertuigDetails;
