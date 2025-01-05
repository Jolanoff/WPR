import React, { useState, useEffect } from "react";

const UitgiftePage = () => {
  const [uitgiften, setUitgiften] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUitgifte, setSelectedUitgifte] = useState(null); // Voor geselecteerde uitgifte
  const [formData, setFormData] = useState({
    customerName: "",
    voertuigId: "",
    klantId: "", // Voeg KlantId toe
    fromDate: "",
    toDate: "",
    remarks: "",
  });

  useEffect(() => {
    const fetchUitgiften = async () => {
      try {
        const response = await fetch("http://localhost:5039/api/vehicle/uitgiften");
        const data = await response.json();
        setUitgiften(data);
      } catch (error) {
        console.error("Fout bij het ophalen van uitgiften:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUitgiften();
  }, []);

  const handleAcceptButtonClick = (uitgifte) => {
    // Toon het formulier en stel de geselecteerde uitgifte in
    setSelectedUitgifte(uitgifte);
    setFormData({
      ...formData,
      voertuigId: uitgifte.voertuigId, // Vul voertuigId automatisch in
      customerName: uitgifte.customerName, // Vul klantnaam in
      klantId: uitgifte.klantId 
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitForm = async () => {
    try {
      const response = await fetch(
        `http://localhost:5039/api/vehicle/accept/${selectedUitgifte.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: formData.customerName,
            voertuigId: formData.voertuigId,
            klantId: formData.klantId,  // Voeg KlantId toe
            fromDate: formData.fromDate,
            toDate: formData.toDate,
            remarks: formData.remarks,
          }),
        }
      );
  
      if (response.ok) {
        setUitgiften((prev) =>
          prev.filter((uitgifte) => uitgifte.id !== selectedUitgifte.id)
        );
        alert("Uitgifte geaccepteerd!");
        setSelectedUitgifte(null);
      } else {
        alert("Fout bij het accepteren van de uitgifte.");
      }
    } catch (error) {
      console.error("Fout bij het accepteren van uitgifte:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Uitgiftepagina</h1>
      {loading ? (
        <p>Bezig met laden...</p>
      ) : (
        <div>
          {uitgiften.map((uitgifte) => (
            <div
              key={uitgifte.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white mb-4"
            >
              <div>
                <p><strong>Klantnaam:</strong> {uitgifte.customerName}</p>
                <p><strong>Voertuig ID:</strong> {uitgifte.voertuigId}</p>
                <p><strong>Status:</strong> {uitgifte.status}</p>
              </div>
              <button
                onClick={() => handleAcceptButtonClick(uitgifte)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Accepteren
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedUitgifte && (
        <div className="mt-8 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-bold mb-4">Formulier voor accepteren</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitForm();
            }}
          >
            <div className="mb-4">
              <label className="block mb-2">Klantnaam</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className="p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Voertuig ID</label>
              <input
                type="text"
                name="voertuigId"
                value={formData.voertuigId}
                onChange={handleInputChange}
                required
                disabled
                className="p-2 border rounded bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Klant ID</label>
              <input
                type="text"
                name="klantId"
                value={formData.klantId}
                onChange={handleInputChange}
                required
                disabled
                className="p-2 border rounded bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Van Datum</label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleInputChange}
                required
                className="p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Tot Datum</label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleInputChange}
                required
                className="p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Opmerkingen</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className="p-2 border rounded"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Bevestigen en Accepteren
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UitgiftePage;
