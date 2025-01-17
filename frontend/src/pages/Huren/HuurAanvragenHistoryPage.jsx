import React, { useState, useEffect } from "react";
import api from "../../api";
import UseAuthorization from "../../utils/UseAuthorization";



function HuurAanvragenHistoryPage() {
  const { isAuthorized } = UseAuthorization(["ParticuliereHuurder"]);
  const [loading, setLoading] = useState(true);
  const [huuraanvragen, setHuurAanvragen] = useState([])

  useEffect(() =>{
    const fetchHuurAanvragen = async () => {
      try{
        const response = await api.get("/HuurAanvraag/UserHuuraanvragen");
        setHuurAanvragen(response.data)
      }catch(err){
        console.error("Error fetching huuraanvragen:", err);
        setError(err.response?.data?.message || "Er is een fout opgetreden.");
      }
      
    }
    fetchHuurAanvragen();
  }, []);


  if (!isAuthorized)
    return <div>U bent niet bevoegd om deze pagina te bekijken.</div>;

  const handleAddSchademelding = async (aanvraagId) => {
    try {
      await api.post(`/Schademeldingen/create`, {
        voertuigId: aanvraagId,
        beschrijving: "Schade geconstateerd bij terugkomst.",
        status: "InAfwachting",
      });
      alert("Schademelding succesvol toegevoegd!");
    } catch (err) {
      console.error("Error adding schademelding:", err);
      alert("Er is een fout opgetreden bij het toevoegen van de schademelding.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-6">
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-6">Mijn Huuraanvragen</h1>
            {huuraanvragen.length === 0 ? (
                <p className="text-center text-gray-600">Geen huuraanvragen gevonden.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {huuraanvragen.map((aanvraag) => (
                        <div
                            key={aanvraag.id}
                            className="bg-white shadow-md rounded-md p-4"
                        >
                            <h2 className="text-xl font-semibold">
                                {aanvraag.voertuig}
                            </h2>
                            <p>
                                <strong>Aard van Reis:</strong> {aanvraag.aardVanReis}
                            </p>
                            <p>
                                <strong>Startdatum:</strong> {new Date(aanvraag.startDatum).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Einddatum:</strong> {new Date(aanvraag.eindDatum).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Aantal KM:</strong> {aanvraag.verwachteKilometers}
                            </p>
                            <p
                                className={`font-semibold ${
                                    aanvraag.status
                                        ? "text-red-500"
                                        : "text-green-500"
                                }`}
                            >
                                Status: {aanvraag.status ? "Bevestigd" : "In afwachting"}
                            </p>

                            <button
                                onClick={() => handleAddSchademelding(aanvraag.id)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                Schademelding toevoegen
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);
}

export default HuurAanvragenHistoryPage
