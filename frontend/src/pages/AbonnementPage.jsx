import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";
import { CheckRole } from "../utils/CheckRole";

const AbonnementPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [abonnementen, setAbonnementen] = useState([]);
  const [formData, setFormData] = useState({
    bedrijfId: "", 
    abonnementType: "pay-as-you-go", 
    betaalmethode: "",
    startDatum: "",
    eindDatum: "",
    kosten: "",
  });

  
  useEffect(() => {
    const verifyAuthorization = async () => {
      const isAuthorized = await CheckRole("Bedrijf");
      setIsAuthorized(isAuthorized);
    };
    verifyAuthorization();
  }, []);

  
  useEffect(() => {
    const fetchAbonnementen = async () => {
      try {
        const response = await api.get("/bedrijf"); 
        setAbonnementen(response.data);
      } catch (error) {
        console.error("Fout bij ophalen abonnementen:", error);
      }
    };

    if (isAuthorized) {
      fetchAbonnementen();
    }
  }, [isAuthorized]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await api.post("/bedrijf", {
            abonnementType: formData.abonnementType,
            betaalmethode: formData.betaalmethode,
            startDatum: formData.startDatum,
            eindDatum: formData.eindDatum,
            kosten: parseInt(formData.kosten, 10),
        });
        alert("Abonnement succesvol aangemaakt!");
        setAbonnementen((prev) => [...prev, response.data]);
    } catch (error) {
        console.error("Fout bij aanmaken abonnement:", error);
        alert("Er is iets misgegaan.");
    }
};


  if (isAuthorized === null) {
    return <div>Bezig met laden...</div>;
  }

  if (!isAuthorized) {
    return <div>U bent geen bedrijf dus u kunt geen abonnement afsluiten</div>;
 
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Beheer Abonnementen</h1>

      {/* Formulier voor nieuw abonnement */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Nieuw Abonnement Aanmaken</h2>

        <div className="mb-4">
          <label className="block font-medium mb-2">Abonnementstype</label>
          <select
            value={formData.abonnementType}
            onChange={(e) => setFormData({ ...formData, abonnementType: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="pay-as-you-go">Pay-as-you-go</option>
            <option value="prepaid">Prepaid</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Betaalmethode</label>
          <input
            type="text"
            value={formData.betaalmethode}
            onChange={(e) => setFormData({ ...formData, betaalmethode: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Startdatum</label>
          <input
            type="date"
            value={formData.startDatum}
            onChange={(e) => setFormData({ ...formData, startDatum: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Einddatum</label>
          <input
            type="date"
            value={formData.eindDatum}
            onChange={(e) => setFormData({ ...formData, eindDatum: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Kosten</label>
          <input
            type="number"
            value={formData.kosten}
            onChange={(e) => setFormData({ ...formData, kosten: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Abonnement Aanmaken
        </button>
      </form>

      {/* Overzicht van abonnementen */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Bestaande Abonnementen</h2>
        <ul className="bg-white p-4 shadow rounded">
          {abonnementen.map((abonnement) => (
            <li key={abonnement.id} className="mb-2 border-b pb-2">
              <p><strong>Type:</strong> {abonnement.abonnementType}</p>
              <p><strong>Startdatum:</strong> {abonnement.startDatum}</p>
              <p><strong>Einddatum:</strong> {abonnement.eindDatum}</p>
              <p><strong>Kosten:</strong> €{abonnement.kosten}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AbonnementPage;
