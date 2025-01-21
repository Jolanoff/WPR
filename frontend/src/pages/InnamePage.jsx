import React, { useState, useEffect, useRef } from "react";
import api from "../api";

const InnamePage = () => {
  const [innamen, setInnamen] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [remarksMap, setRemarksMap] = useState({});
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [statusMap, setStatusMap] = useState({});
  const [schadeFormMap, setSchadeFormMap] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchInnamen = async () => {
      try {
        const response = await api.get("/vehicle/innamen");
        setInnamen(response.data);
      } catch (error) {
        console.error("Fout bij ophalen van data:", error);
      }
    };

    fetchInnamen();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEditingStatusId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleRemarksChange = (intakeId, e) => {
    setRemarksMap((prevState) => ({
      ...prevState,
      [intakeId]: e.target.value,
    }));
  };

  const handleStatusChange = (intakeId, newStatus) => {
    setStatusMap((prevState) => ({
      ...prevState,
      [intakeId]: newStatus,
    }));

    if (newStatus === "Schade") {
      setSchadeFormMap((prevState) => ({
        ...prevState,
        [intakeId]: { beschrijving: "", locatie: "" },
      }));
    } else {
      setSchadeFormMap((prevState) => {
        const updatedForm = { ...prevState };
        delete updatedForm[intakeId];
        return updatedForm;
      });
    }

    setEditingStatusId(null);
  };

  const handleSchadeInputChange = (intakeId, field, value) => {
    setSchadeFormMap((prevState) => ({
      ...prevState,
      [intakeId]: {
        ...prevState[intakeId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (intakeId) => {
    const status = statusMap[intakeId] || innamen.find((i) => i.id === intakeId).status;
  
    const formData = new FormData();
    formData.append("Remarks", remarksMap[intakeId] || "");
    formData.append("Status", status);
    formData.append("IssueDate", new Date().toISOString());
  
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("Photos", file);
      });
    }
  
    try {
      if (status === "Schade") {
        const schadeData = schadeFormMap[intakeId];
  
        // Ensure schade fields are filled
        if (!schadeData?.beschrijving || !schadeData?.locatie) {
          alert("Vul de beschrijving en locatie in voor schade.");
          return;
        }
  
        // Send schade report separately
        const schadeResponse = await api.post(
          "/schademeldingen/report-schade",
          {
            huurAanvraagId: intakeId,
            beschrijving: schadeData.beschrijving,
            locatie: schadeData.locatie,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
  
        if (schadeResponse.status === 200) {
          alert("Schade succesvol geregistreerd!");
          setSchadeFormMap((prevState) => ({
            ...prevState,
            [intakeId]: { beschrijving: "", locatie: "" },
          }));
        }
      }
  
      // Update intake status
      const response = await api.patch(`/vehicle/intake/update/${intakeId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        alert("Inname succesvol bijgewerkt!");
        setSelectedFiles(null);
        setRemarksMap((prevState) => {
          const updatedRemarks = { ...prevState };
          delete updatedRemarks[intakeId];
          return updatedRemarks;
        });
      } else {
        alert(`Er ging iets mis: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Fout bij het updaten van de inname:", error);
      alert(error.response?.data?.message || "Kan geen verbinding maken met de server.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Inname Voertuigen
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {innamen.map((intake) => (
          <div key={intake.id} className="bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-blue-600">Voertuig ID: {intake.voertuigId}</h2>
            <div className="flex items-center space-x-4 mt-4">
              <p className="text-lg text-gray-700">Status: {statusMap[intake.id] || intake.status}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => setEditingStatusId(intake.id)}
              >
                Wijzig Status
              </button>
              {editingStatusId === intake.id && (
                <div ref={dropdownRef} className="absolute bg-white shadow-lg rounded-md mt-2">
                  <button
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-200 w-full"
                    onClick={() => handleStatusChange(intake.id, "Schade")}
                  >
                    Schade
                  </button>
                  <button
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-200 w-full"
                    onClick={() => handleStatusChange(intake.id, "Ingenomen")}
                  >
                    Ingenomen
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-600 mt-2">
              Vooraf geregistreerde schade: {intake.remarks}
            </p>
            <p className="text-gray-600">
              Datum van inlevering: {new Date(intake.toDate).toLocaleDateString()}
            </p>

            {statusMap[intake.id] === "Schade" && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Schade melden</h3>
                <input
                  type="text"
                  placeholder="Beschrijving"
                  value={schadeFormMap[intake.id]?.beschrijving || ""}
                  onChange={(e) => handleSchadeInputChange(intake.id, "beschrijving", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mt-2"
                />
                <input
                  type="text"
                  placeholder="Locatie"
                  value={schadeFormMap[intake.id]?.locatie || ""}
                  onChange={(e) => handleSchadeInputChange(intake.id, "locatie", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mt-2"
                />
              </div>
            )}

            <textarea
              value={remarksMap[intake.id] || ""}
              onChange={(e) => handleRemarksChange(intake.id, e)}
              placeholder="Voeg opmerkingen toe"
              className="w-full border border-gray-300 rounded-md p-2 mt-4 focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-4 focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={() => handleSubmit(intake.id)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Voltooi Inname
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InnamePage;
