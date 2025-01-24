import React, { useState } from "react";
import api from "../../api";

const VoertuigenList = ({ voertuigen, loading, handleDelete }) => {
  const [selectedVoertuig, setSelectedVoertuig] = useState(null);
  const [reserveringen, setReserveringen] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");


  const handleViewReserveringen = async (voertuigId) => {
    setError("");

    try {
      const response = await api.get(`/Voertuig/Voertuig/${voertuigId}`);
      setReserveringen(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setReserveringen([]); 
      } else {
        setError(err.response?.data?.message || "Failed to fetch reserveringen.");
      }
    } finally {
      setSelectedVoertuig(voertuigId);
      setModalOpen(true);
    }
  };
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Voertuigen Lijst</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {voertuigen.map((v) => (
            <li
              key={v.id}
              className="flex justify-between items-center border border-gray-300 rounded-md p-4 shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {v.merk} {v.type} ({v.kenteken})
                </p>
                <p className="text-gray-500">{v.voertuigType}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleViewReserveringen(v.id)}
                  className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Bekijk Reserveringen
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Verwijder
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reserveringen</h2>
            {error && <p className="text-red-500">{error}</p>}
            {reserveringen.length === 0 ? (
              <p className="text-gray-500">Geen reserveringen gevonden.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {reserveringen.map((r) => (
                  <li key={r.id} className="py-4">
                    <p className="font-medium text-gray-800">
                      Klant: {r.klantNaam} ({r.klantEmail})
                    </p>
                    <p className="text-gray-500">
                      Van: {new Date(r.startDatum).toLocaleDateString()} - Tot:{" "}
                      {new Date(r.eindDatum).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoertuigenList;
