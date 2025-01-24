import React, { useEffect, useState } from "react";
import api from "../api";

const PrivacyverklaringPage = () => {
  const [tekst, setTekst] = useState("");

  useEffect(() => {
    const fetchPrivacyverklaring = async () => {
      try {
        const response = await api.get("/Privacyverklaring");
        setTekst(response.data || "Geen privacyverklaring beschikbaar.");
      } catch (error) {
        console.error("Fout bij het ophalen van de privacyverklaring:", error);
        setTekst("Er is een probleem opgetreden bij het laden van de privacyverklaring.");
      }
    };
    fetchPrivacyverklaring()
  },[]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Privacyverklaring</h1>
      <p>{tekst}</p>
    </div>
  );
};

export default PrivacyverklaringPage;
