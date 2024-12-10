import React, { useState } from "react";
import UitgifteForm from "../components/Uitgifte,Inname/VoertuigUitgifteForm";

const UitgiftePage = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, merk: "Toyota", type: "Auto", kenteken: "AB123CD", beschikbaar: true },
    { id: 2, merk: "Ford", type: "Camper", kenteken: "XY987ZT", beschikbaar: true },
    { id: 3, merk: "Volkswagen", type: "Caravan", kenteken: "KL456GH", beschikbaar: true },
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:5039/api/vehicle/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Uitgifte succesvol geregistreerd!");
      } else {
        alert(`Fout: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Er is een fout opgetreden.");
    }
  };

  const handleVehicleSelection = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <main className="flex-grow">
        <h1 className="text-xl font-bold text-center mt-4">Voertuig Uitgifte</h1>

        {/* Voertuigenlijst */}
        <div className="mt-6 space-y-4">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white"
              >
                <div>
                  <p className="font-bold">{vehicle.merk} - {vehicle.type}</p>
                  <p className="text-gray-600">Kenteken: {vehicle.kenteken}</p>
                </div>
                <button
                  onClick={() => handleVehicleSelection(vehicle)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Uitgifte Accepteren
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Geen voertuigen beschikbaar.</p>
          )}
        </div>

        {/* Uitgifteformulier */}
        {selectedVehicle && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-center">
              Uitgifte voor {selectedVehicle.merk} ({selectedVehicle.type})
            </h2>
            <UitgifteForm
              onSubmit={handleSubmit}
              selectedVehicle={selectedVehicle}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default UitgiftePage;
