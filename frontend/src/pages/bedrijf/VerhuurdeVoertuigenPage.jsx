import React, { useState } from "react";
import api from "../../api";
import UseAuthorization from "../../utils/UseAuthorization";


const VerhuurdeVoertuigenPage = () => {
  const [jaar, setJaar] = useState(new Date().getFullYear());
  const [maand, setMaand] = useState("");
  const [verhuurdeVoertuigen, setVerhuurdeVoertuigen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { isAuthorized } = UseAuthorization(["Bedrijf"]);


  const fetchVerhuurdeVoertuigen = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/bedrijf/verhuurde-voertuigen?jaar=${jaar}&maand=${maand || ""}`);
      setVerhuurdeVoertuigen(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Fout bij het ophalen van gegevens.");
    } finally {
      setLoading(false);
    }
  };
  
  if (!isAuthorized) return <div>U bent niet bevoegd om deze pagina te bekijken.</div>;
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Overzicht Verhuurde Voertuigen</h1>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Selecteer jaar</label>
        <input 
          type="number" 
          value={jaar} 
          onChange={(e) => setJaar(e.target.value)} 
          className="border rounded p-2 w-full" 
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Selecteer maand (optioneel)</label>
        <select 
          value={maand} 
          onChange={(e) => setMaand(e.target.value)} 
          className="border rounded p-2 w-full"
        >
          <option value="">Alle maanden</option>
          <option value="1">Januari</option>
          <option value="2">Februari</option>
          <option value="3">Maart</option>
          <option value="4">April</option>
          <option value="5">Mei</option>
          <option value="6">Juni</option>
          <option value="7">Juli</option>
          <option value="8">Augustus</option>
          <option value="9">September</option>
          <option value="10">Oktober</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <button 
        onClick={fetchVerhuurdeVoertuigen} 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Opvragen
      </button>

      {loading && <p className="mt-4 text-gray-500">Gegevens worden geladen...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-8">
        {verhuurdeVoertuigen.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Voertuig</th>
                <th className="py-2 px-4 text-left">Kenteken</th>
                <th className="py-2 px-4 text-left">Startdatum</th>
                <th className="py-2 px-4 text-left">Einddatum</th>
                <th className="py-2 px-4 text-left">Huurder</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {verhuurdeVoertuigen.map((voertuig, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2 px-4">{voertuig.voertuigMerk} {voertuig.voertuigType}</td>
                  <td className="py-2 px-4">{voertuig.kenteken}</td>
                  <td className="py-2 px-4">{voertuig.startDatum}</td>
                  <td className="py-2 px-4">{voertuig.eindDatum}</td>
                  <td className="py-2 px-4">{voertuig.huurderNaam}</td>
                  <td className="py-2 px-4">{voertuig.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-gray-600">Geen gehuurde voertuigen gevonden.</p>
        )}
      </div>
    </div>
  );
};

export default VerhuurdeVoertuigenPage;
