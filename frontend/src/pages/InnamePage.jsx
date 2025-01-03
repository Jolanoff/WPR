import React, { useState, useEffect } from "react";

const InnamePage = () => {
  const [vehicles, setVehicles] = useState([]); // Voertuigen die teruggebracht moeten worden
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Geselecteerd voertuig
  const [formData, setFormData] = useState({
    remarks: "",
    damagePhotos: null,
    status: "Teruggebracht", // Default status
  });

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/vehicle/returned`);
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [apiBaseUrl]);

  const handleVehicleSelection = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      remarks: "",
      damagePhotos: null,
      status: "Teruggebracht",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, damagePhotos: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("remarks", formData.remarks);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("voertuigId", selectedVehicle.id);

    if (formData.damagePhotos) {
      Array.from(formData.damagePhotos).forEach((photo, index) =>
        formDataToSend.append(`photo${index}`, photo)
      );
    }

    try {
      const response = await fetch(`${apiBaseUrl}/vehicle/intake`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Voertuig inname succesvol geregistreerd!");
        setVehicles((prevVehicles) =>
          prevVehicles.filter((v) => v.id !== selectedVehicle.id)
        );
        setSelectedVehicle(null);
      } else {
        const data = await response.json();
        alert(`Fout: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Er is een fout opgetreden.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-50">
      <h1 className="text-xl font-bold text-center mt-4">Voertuig Inname</h1>

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
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Inname Registreren
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Geen voertuigen beschikbaar.</p>
        )}
      </div>

      {selectedVehicle && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-center">
            Inname voor {selectedVehicle.merk} ({selectedVehicle.type})
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Opmerkingen</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Schade Foto's</label>
              <input
                type="file"
                name="damagePhotos"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Inname Registreren
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InnamePage;
