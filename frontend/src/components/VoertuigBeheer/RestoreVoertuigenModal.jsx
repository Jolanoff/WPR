import React, { useEffect, useState } from "react";
import api from "../../api";

const RestoreVoertuigenModal = ({ isOpen, onClose }) => {
  const [voertuigen, setVoertuigen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMarkedVoertuigen = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/Voertuig/MarkedForDeletion");
      setVoertuigen(response.data);

      if (response.data.length === 0) {
        setError("Geen voertuigen gemarkeerd voor verwijdering.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Niet gelukt om voertuigen op te halen.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    setError("");
    try {
      await api.put(`/Voertuig/Restore/${id}`);
      alert("Voertuig succesvol teruggebracht.");
      setVoertuigen(prevVoertuigen => prevVoertuigen.filter(v => v.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Niet gelukt om voertuig terug te halen.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMarkedVoertuigen();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Voertuigen terughalen</h2>

        {loading && <p className="text-gray-500">Aan het laden...</p>}
        {error && <p className="text-red-500">{error}</p>}

        

        {!loading && voertuigen.length > 0 && (
          <ul className="divide-y divide-gray-200">
            {voertuigen.map((v) => (
              <li key={v.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">
                    {v.merk} {v.type} ({v.kenteken})
                  </p>
                  <p className="text-gray-500">{v.voertuigType}</p>
                </div>
                <button
                  onClick={() => handleRestore(v.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Terughalen
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Sluit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreVoertuigenModal;
