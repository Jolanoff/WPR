import React, { useState, useEffect } from "react";
import FilterSection from "../../components/VoertuigBeheer/FilterSection";
import VoertuigenList from "../../components/VoertuigBeheer/VoertuigenList";
import AddVoertuigForm from "../../components/VoertuigBeheer/AddVoertuigForm";
import RestoreVoertuigenModal from "../../components/VoertuigBeheer/RestoreVoertuigenModal";
import api from "../../api";

const VoertuigenBeheerPage = () => {
  const [voertuigen, setVoertuigen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newVoertuig, setNewVoertuig] = useState({
    merk: "",
    type: "",
    kenteken: "",
    kleur: "",
    aanschafjaar: "",
    status: false,
    voertuigType: "",
    imageUrl: "",
    prijs: "",
  });

  const today = new Date().toISOString().split("T")[0];
  const [dateRange, setDateRange] = useState({
    startDatum: today,
    eindDatum: today,
  });

  const [typeFilter, setTypeFilter] = useState("alle");

  // Fetch voertuigen from the server
  const fetchVoertuigen = async () => {
    setLoading(true);
    try {
      const response = await api.post("/Voertuig", dateRange);
      setVoertuigen(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load voertuigen");
    } finally {
      setLoading(false);
    }
  };

  // Filter voertuigen based on the selected type
  const filteredVoertuigen = voertuigen.filter((voertuig) => {
    const typeCondition =
      typeFilter === "alle" ||
      voertuig.voertuigType?.toLowerCase() === typeFilter;

    return typeCondition;
  });

  // Add new voertuig
  const handleCreate = async () => {
    try {
      await api.post("/Voertuig/CreateVoertuig", newVoertuig);
      fetchVoertuigen();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create voertuig");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Weet u zeker dat u dit wilt verwijderen?");
    if (!confirmDelete) return;
  
    try {
      await api.delete(`/Voertuig/DeleteVoertuig/${id}`);
      fetchVoertuigen();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete voertuig");
    }
  };
  

  // Fetch voertuigen on mount
  useEffect(() => {
    fetchVoertuigen();
  }, [dateRange]);

  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Voertuigen Beheer</h1>
        <button
          onClick={() => setIsRestoreModalOpen(true)}
          className="bg-red-500 text-white font-medium px-4 py-2 mb-3 rounded-md hover:bg-red-600"
        >
          Restore Voertuigen
        </button>
        
        <RestoreVoertuigenModal
          isOpen={isRestoreModalOpen}
          onClose={() => setIsRestoreModalOpen(false)}
        />

        <FilterSection typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
        <AddVoertuigForm
          newVoertuig={newVoertuig}
          setNewVoertuig={setNewVoertuig}
          handleCreate={handleCreate}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <VoertuigenList
          voertuigen={filteredVoertuigen}
          loading={loading}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default VoertuigenBeheerPage;
