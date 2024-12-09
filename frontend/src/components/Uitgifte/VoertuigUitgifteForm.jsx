import React, { useState } from "react";

const VoertuigUitgifteForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    vehicleId: "",
    remarks: "",
  });

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Voeg de handleChange functie toe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`Sending request to: ${apiBaseUrl}/vehicle/issue`);
      const response = await fetch(`${apiBaseUrl}/vehicle/issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Voertuig Uitgifte Registreren</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold">Naam klant</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Voertuig ID</label>
          <input
            type="text"
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Opmerkingen</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Registreren
        </button>
      </form>
    </div>
  );
};

export default VoertuigUitgifteForm;
