import React, { useState, useEffect } from "react";
import api from "../api";

const PrivacyverklaringBewerkPage = () => {
  const [nieuweTekst, setNieuweTekst] = useState(""); 
  const [status, setStatus] = useState("");

  // Laad de huidige privacyverklaring bij
  useEffect(() => {
    const fetchPrivacyverklaring = async () => {
      try {
        const response = await api.get("/Privacyverklaring");
        setNieuweTekst(response.data || ""); 
      } catch (error) {
        console.error("Fout bij het ophalen van de privacyverklaring:", error);
        setStatus("Er is een probleem opgetreden bij het laden van de privacyverklaring.");
      }
    };

    fetchPrivacyverklaring();
  }, []);

  // Functie om de tekst bij te werken
  const handleSave = async () => {
    try {
      await api.put("/privacyverklaring", nieuweTekst, { 
        headers: { "Content-Type": "application/json" },
      });
      setStatus("Privacyverklaring succesvol bijgewerkt.");
    } catch (error) {
      console.error("Fout bij het bijwerken van de privacyverklaring:", error);
      setStatus("Fout bij het opslaan van de privacyverklaring.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bewerk Privacyverklaring</h1>
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows="10"
        value={nieuweTekst}
        onChange={(e) => setNieuweTekst(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        Opslaan
      </button>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
};

export default PrivacyverklaringBewerkPage;
