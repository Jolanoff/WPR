import React, { useState, useEffect } from "react";
import api from "../api";
import UseAuthorization from "../utils/UseAuthorization";

const SchademeldingenPage = () => {
  const [schademeldingData, setSchademeldingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAuthorized } = UseAuthorization(["BackOfficeMedewerker"]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await api.post(
        `/Schademeldingen/switch_status/${id}?newStatus=${newStatus}`
      );
      const updatedSchade = response.data;

      setSchademeldingData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: updatedSchade.status } : item
        )
      );
      fetchSchademeldingData();
    } catch (err) {
      console.error("Error switching status:", err);
      alert("Failed to update status.");
    }
  };

  const fetchSchademeldingData = async () => {
    try {
      const response = await api.get("/Schademeldingen/get_all");
      console.log(response.data);
      const data = Array.isArray(response.data) ? response.data : [];
      setSchademeldingData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (description) => {
    setSelectedDescription(description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDescription(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchSchademeldingData();
  }, []);

  if (!isAuthorized)
    return <div>U bent niet bevoegd om deze pagina te bekijken.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Schademeldingen</h1>
      <p className="text-gray-700">Gegevens ophalen voor schademeldingen.</p>
      <div>
        {schademeldingData.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 border-b">Datum</th>
                <th className="text-left py-2 px-4 border-b">Beschrijving</th>
                <th className="text-left py-2 px-4 border-b">Voertuig</th>
                <th className="text-left py-2 px-4 border-b">Merk</th>

                <th className="text-left py-2 px-4 border-b">Type</th>

                <th className="text-left py-2 px-4 border-b">Locatie</th>
                <th className="text-left py-2 px-4 border-b">Status</th>
                <th className=" py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schademeldingData.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    {new Date(item.datum).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openModal(item.beschrijving)}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      Beschrijving
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">{item.voertuigId}</td>
                  <td className="py-2 px-4 border-b">{item.merk}</td>
                  <td className="py-2 px-4 border-b">{item.type}</td>
                  <td className="py-2 px-4 border-b">{item.locatie}</td>
                  <td className="py-2 px-4 border-b">{item.status}</td>

                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleStatusChange(item.id, "InAfwachting")
                        }
                        className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                      >
                        InAfwachting
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(item.id, "Goedgekeurd")
                        }
                        className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-500"
                      >
                        Goedgekeurd
                      </button>
                      <button
                        onClick={() => handleStatusChange(item.id, "Afgewezen")}
                        className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500"
                      >
                        Afgewezen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Geen schademeldingen gevonden of onjuiste data.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Volledige Beschrijving</h2>
            <p className="text-gray-700 mb-4">{selectedDescription}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchademeldingenPage;
