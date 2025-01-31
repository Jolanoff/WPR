import React, { useState, useEffect } from "react";
import api from "../api";

const UitgiftePage = () => {
  const [uitgiften, setUitgiften] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUitgifte, setSelectedUitgifte] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    voertuigId: "",
    klantId: "",
    fromDate: "",
    toDate: "",
    remarks: ""
  });

  // Haal uitgiften op
  useEffect(() => {
    const fetchUitgiften = async () => {
      try {
        const response = await api.get("/vehicle/uitgiften");
        const sortedData = response.data.sort((a, b) => 
          new Date(a.issueDate) - new Date(b.issueDate)
        );
        setUitgiften(sortedData);
        setError("");
      } catch (err) {
        setError("Fout bij het laden van uitgiften");
        console.error("API fout:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUitgiften();
  }, []);

  // Categoriseer uitgiften
  const categorizeUitgiften = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return uitgiften.reduce(
      (acc, uitgifte) => {
        const issueDate = new Date(uitgifte.issueDate);
        issueDate.setHours(0, 0, 0, 0);

        if (issueDate.getTime() === today.getTime()) {
          acc.todayUitgiften.push(uitgifte);
        } else if (issueDate > today) {
          acc.futureUitgiften.push(uitgifte);
        }
        return acc;
      },
      { todayUitgiften: [], futureUitgiften: [] }
    );
  };

  const { todayUitgiften, futureUitgiften } = categorizeUitgiften();

  // Vul automatisch de formuliergegevens bij het accepteren
  const handleAcceptClick = (uitgifte) => {
    setSelectedUitgifte(uitgifte);
    setFormData({
      customerName: uitgifte.customerName,
      voertuigId: uitgifte.voertuigId.toString(),
      klantId: uitgifte.klantId.toString(),
      fromDate: formatDateForInput(uitgifte.issueDate), // Auto-filled start date
      toDate: isValidDate(uitgifte.toDate) ? formatDateForInput(uitgifte.toDate) : "", // Auto-filled end date
      remarks: ""
    });
  };

  // Verzenden van acceptatie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/vehicle/accept/${selectedUitgifte.id}`, {
        ...formData,
        fromDate: new Date(formData.fromDate),
        toDate: formData.toDate ? new Date(formData.toDate) : null
      });

      setUitgiften((prev) => prev.filter((u) => u.id !== selectedUitgifte.id));
      setSelectedUitgifte(null);
      alert("Uitgifte succesvol geaccepteerd!");
    } catch (error) {
      console.error("Acceptatiefout:", error.response?.data || error.message);
      alert("Acceptatie mislukt: " + (error.response?.data?.message || error.message));
    }
  };

  // Datum helpers
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};


  const isValidDate = (dateString) => {
    return !dateString.startsWith("0001-01-01") && !isNaN(new Date(dateString));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Uitgiftebeheer</h1>

      {loading && <p className="text-gray-600">Laden...</p>}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <Section 
            title={`Vandaag te halen (${todayUitgiften.length})`}
            uitgiften={todayUitgiften}
            onAccept={handleAcceptClick}
          />

          <Section
            title={`Toekomstige uitgiften (${futureUitgiften.length})`}
            uitgiften={futureUitgiften}
            onAccept={handleAcceptClick}
            className="mt-8"
          />
        </>
      )}

      {selectedUitgifte && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Accepteer uitgifte #{selectedUitgifte.id}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Klantnaam" value={formData.customerName} disabled />

            <FormField label="Voertuig ID" value={formData.voertuigId} disabled />

            <FormField label="Klant ID" value={formData.klantId} disabled />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Vanaf datum" value={formData.fromDate} disabled />
              <FormField label="Tot datum" value={formData.toDate} disabled />
            </div>

            <FormField
              label="Vooraf geregistreerde schade: "
              type="textarea"
              name="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              className="h-32"
            />

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedUitgifte(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Annuleren
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Bevestig acceptatie
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// Sub-componenten
const Section = ({ title, uitgiften, onAccept, className }) => (
  <div className={className}>
    <h2 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h2>
    <div className="space-y-3">
      {uitgiften.length > 0 ? (
        uitgiften.map(uitgifte => (
          <UitgifteCard key={uitgifte.id} uitgifte={uitgifte} onAccept={onAccept} />
        ))
      ) : (
        <p className="text-gray-500 text-sm">Geen uitgiften gevonden</p>
      )}
    </div>
  </div>
);

const UitgifteCard = ({ uitgifte, onAccept }) => (
  <div className="bg-white p-4 rounded shadow-sm border hover:border-blue-200 transition-all">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-gray-800">Klant: {uitgifte.customerName}</h3>
        <p className="text-sm text-gray-600 mt-1">Voertuig: {uitgifte.voertuig.merk + " " + uitgifte.voertuig.type}</p>
        <p className="text-sm text-gray-600 mt-1">Kenteken: {uitgifte.voertuig.kenteken}</p>

      </div>
      <button onClick={() => onAccept(uitgifte)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
        Accepteren
      </button>
    </div>
  </div>
);

const FormField = ({ label, value, type = "text", disabled }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input type={type} className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" value={value} disabled />
  </div>
);

export default UitgiftePage;
