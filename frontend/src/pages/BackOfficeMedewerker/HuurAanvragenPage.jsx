import React, { useEffect, useState } from "react";
import api from "../../api";
import UseAuthorization from "../../utils/UseAuthorization";

export default function HuurAanvragenPage() {
    const [huuraanvragen, setHuuraanvragen] = useState([]);
    const { isAuthorized } = UseAuthorization(["Admin", "BackOfficeMedewerker"]);

    useEffect(() => {
        const fetchHuurAanvragen = async () => {
            try {
                const response = await api.get("/HuurAanvraag/all");
                setHuuraanvragen(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch huur aanvragen.");
            }
        };

        fetchHuurAanvragen();
    }, []);

    const handleApprove = async (id) => {
        try {
            await api.patch(`HuurAanvraag/${id}/approve`);
            setHuuraanvragen((prev) =>
                prev.map((aanvraag) =>
                    aanvraag.id === id ? { ...aanvraag, status: true } : aanvraag
                )
            );
        } catch (err) {
            console.error(err);
            alert("Failed to approve the aanvraag.");
        }
    };

    const handleRefuse = async (id) => {
        const reason = prompt("Please enter a reason for refusing this aanvraag:");
        if (!reason) return;

        try {
            await api.patch(`/HuurAanvraag/${id}/refuse`, reason, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setHuuraanvragen((prev) =>
                prev.map((aanvraag) =>
                    aanvraag.id === id ? { ...aanvraag, status: false, approvalStatus: "Rejected" } : aanvraag
                )
            );
        } catch (err) {
            console.error(err);
            alert("Failed to refuse the aanvraag.");
        }
    };



    if (!isAuthorized)
        return <div> U bent niet bevoegd om deze pagina te bekijken.</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Huur Aanvragen</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Start Datum</th>
                        <th className="py-2 px-4 border-b">Eind Datum</th>
                        <th className="py-2 px-4 border-b">Aard van Reis</th>
                        <th className="py-2 px-4 border-b">Kilometers</th>
                        <th className="py-2 px-4 border-b">Klant Naam</th>
                        <th className="py-2 px-4 border-b">Voertuig</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {huuraanvragen.map((aanvraag) => (
                        <tr key={aanvraag.id} className="text-center">
                            <td className="py-2 px-4 border-b">{aanvraag.id}</td>
                            <td className="py-2 px-4 border-b">{new Date(aanvraag.startDatum).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{new Date(aanvraag.eindDatum).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{aanvraag.aardVanReis}</td>
                            <td className="py-2 px-4 border-b">{aanvraag.verwachteKilometers}</td>
                            <td className="py-2 px-4 border-b">{aanvraag.klantNaam}</td>
                            <td className="py-2 px-4 border-b">{aanvraag.voertuigNaam}</td>
                            <td className="py-2 px-4 border-b">
                                {aanvraag.approvalStatus === "Pending" && "Pending"}
                                {aanvraag.approvalStatus === "Approved" && "Approved"}
                                {aanvraag.approvalStatus === "Rejected" && "Rejected"}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {aanvraag.approvalStatus === "Pending" && (
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleApprove(aanvraag.id)}
                                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleRefuse(aanvraag.id)}
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                        >
                                            Refuse
                                        </button>
                                    </div>
                                )}
                                {aanvraag.approvalStatus !== "Pending" && (
                                    <span className="text-gray-500">No Actions Available</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
