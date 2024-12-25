import React from "react";

function VoertuigDetails({ voertuigDetails }) {
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
                        <span className="font-medium">Aanschafjaar:</span>{" "}
                        {voertuigDetails.aanschafjaar}
                    </p>
                    <p className="text-gray-600 text-lg font-bold mt-2">
                        <span className="font-medium">Prijs:</span> {voertuigDetails.prijs}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VoertuigDetails;
