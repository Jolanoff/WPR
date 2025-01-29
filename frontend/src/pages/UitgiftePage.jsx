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

  // Datumhelpers
  const getCurrentDate = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  };

  const [today] = useState(getCurrentDate());

  // Categoriseer uitgiften
  const categorizeUitgiften = () => {
    const todayUitgiften = [];
    const futureUitgiften = [];

    uitgiften.forEach(uitgifte => {
      try {
        const issueDate = new Date(uitgifte.issueDate);
        issueDate.setHours(0, 0, 0, 0);

        if (issueDate.getTime() === today.getTime()) {
          todayUitgiften.push(uitgifte);
        } else if (issueDate > today) {
          futureUitgiften.push(uitgifte);
        }
      } catch (error) {
        console.warn("Ongeldige datum:", uitgifte.issueDate);
      }
    });

    return { todayUitgiften, futureUitgiften };
  };

  const { todayUitgiften, futureUitgiften } = categorizeUitgiften();

  // Handlers
  const handleAcceptClick = (uitgifte) => {
    setSelectedUitgifte(uitgifte);
    setFormData({
      customerName: uitgifte.customerName,
      voertuigId: uitgifte.voertuigId.toString(),
      klantId: uitgifte.klantId.toString(),
      fromDate: formatDateForInput(uitgifte.issueDate),
      toDate: isValidDate(uitgifte.toDate) 
        ? formatDateForInput(uitgifte.toDate) 
        : "",
      remarks: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/vehicle/accept/${selectedUitgifte.id}`, {
        ...formData,
        fromDate: new Date(formData.fromDate),
        toDate: formData.toDate ? new Date(formData.toDate) : null
      });

      setUitgiften(prev => 
        prev.filter(u => u.id !== selectedUitgifte.id)
      );
      setSelectedUitgifte(null);
      alert("Uitgifte succesvol geaccepteerd");
    } catch (error) {
      console.error("Acceptatiefout:", error.response?.data || error.message);
      alert("Acceptatie mislukt: " + (error.response?.data?.message || error.message));
    }
  };

  // Hulpfunctions
  const formatDateForInput = (dateString) => {
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const isValidDate = (dateString) => {
    return !dateString.startsWith("0001-01-01") && !isNaN(new Date(dateString));
  };

  const formatDisplayDate = (dateString) => {
    if (!isValidDate(dateString)) return "Niet beschikbaar";
    
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Uitgiftebeheer</h1>

      {loading && <p className="text-gray-600">Bezig met laden...</p>}
      
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
            <FormField
              label="Klantnaam"
              name="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              required
            />

            <FormField
              label="Voertuig ID"
              name="voertuigId"
              value={formData.voertuigId}
              disabled
            />

            <FormField
              label="Klant ID"
              name="klantId"
              value={formData.klantId}
              disabled
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Vanaf datum"
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={(e) => setFormData({...formData, fromDate: e.target.value})}
                required
              />

              <FormField
                label="Tot datum"
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={(e) => setFormData({...formData, toDate: e.target.value})}
                disabled={!isValidDate(selectedUitgifte.toDate)}
                title={!isValidDate(selectedUitgifte.toDate) ? "Innamedatum niet beschikbaar" : ""}
              />
            </div>

            <FormField
              label="Vooraf geregistreerde schade: "
              type="textarea"
              name="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({...formData, remarks: e.target.value})}
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

const Section = ({ title, uitgiften, onAccept, className }) => (
  <div className={className}>
    <h2 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h2>
    <div className="space-y-3">
      {uitgiften.length > 0 ? (
        uitgiften.map(uitgifte => (
          <UitgifteCard
            key={uitgifte.id}
            uitgifte={uitgifte}
            onAccept={onAccept}
          />
        ))
      ) : (
        <p className="text-gray-500 text-sm">Geen uitgiften gevonden</p>
      )}
    </div>
  </div>
);

const UitgifteCard = ({ uitgifte, onAccept }) => (
  <div className="bg-white p-4 rounded shadow-sm border border-gray-100 hover:border-blue-200 transition-all">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-gray-800">{uitgifte.customerName}</h3>
        <div className="text-sm text-gray-600 mt-1 space-y-1">
          <p>Voertuig ID: {uitgifte.voertuigId}</p>
          <p>Ophaaldatum: {new Date(uitgifte.issueDate).toLocaleDateString("nl-NL")}</p>
          <p>Innamedatum: {uitgifte.toDate.startsWith("0001") 
              ? "Nog niet bepaald" 
              : new Date(uitgifte.toDate).toLocaleDateString("nl-NL")}
          </p>
        </div>
      </div>
      <button
        onClick={() => onAccept(uitgifte)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
      >
        Accepteren
      </button>
    </div>
  </div>
);

const FormField = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  disabled = false,
  required = false,
  className = "",
  ...props 
}) => (
  <div className={`space-y-1 ${className}`}>
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
    ) : (
      <input
        type={type}
        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
    )}
  </div>
);

export default UitgiftePage;