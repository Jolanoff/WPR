import React, { useState, useEffect } from "react";
import VoertuigCard from "../components/VoertuigCard";
import autoplaceholder from "./../assets/autoplaceholder.png";
import api from "../api"; // Assuming api is an Axios instance or similar

function VoertuigenPage() {
  const [voertuigen, setVoertuigen] = useState([]); // To store the vehicles
  const [loading, setLoading] = useState(true); // To track the loading state
  const [error, setError] = useState(null); // To store errors if any
  const [filter, setFilter] = useState("alle"); // To track the selected filter

  // Fetch vehicles when the component mounts
  useEffect(() => {
    const fetchVoertuigen = async () => {
      try {
        const response = await api.get("/Voertuig"); // Assuming "/Voertuig" is the correct endpoint
        setVoertuigen(response.data); // Axios automatically parses JSON and stores it in `data`
      } catch (error) {
        setError(error.message || "Error fetching vehicles"); // Handle errors
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchVoertuigen();
  }, []); // This effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetching fails
  }

  // Filter voertuigen based on the selected filter
  const filteredVoertuigen = voertuigen.filter((voertuig) => {
    if (filter === "alle") return true; // Show all vehicles
    return voertuig.voertuigType.toLowerCase() === filter; // Match filter with voertuigType
  });

  return (
    <>
      <select
        className="ml-12 mt-12 rounded-md p-2 border border-black"
        value={filter}
        onChange={(e) => setFilter(e.target.value)} // Update the filter state
      >
        <option value="alle">Alle</option>
        <option value="auto">Auto</option>
        <option value="camper">Camper</option>
        <option value="caravan">Caravan</option>
      </select>

      <div className="grid grid-cols-3">
        {filteredVoertuigen.map((voertuig) => (
          <VoertuigCard
            key={voertuig.id}
            merk={voertuig.merk}
            type={voertuig.type}
            kenteken={voertuig.kenteken}
            kleur={voertuig.kleur}
            aanschafjaar={voertuig.aanschafjaar}
            prijs="Prijs is onbekend"
            imageUrl={autoplaceholder} // Use actual image URL if available
          />
        ))}
      </div>
    </>
  );
}

export default VoertuigenPage;
