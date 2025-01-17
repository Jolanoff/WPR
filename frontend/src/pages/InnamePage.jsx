import React, { useState, useEffect, useRef } from "react";
import api from "../api";

const InnamePage = () => {
  const [Innamen, setInnamen] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [remarksMap, setRemarksMap] = useState({});
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [statusMap, setStatusMap] = useState({});
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
    setEditingStatusId(null);
  };

  const handleSubmit = async (intakeId) => {
    const formData = new FormData();
    formData.append("Remarks", remarksMap[intakeId] || "");
    formData.append("Status", statusMap[intakeId] || "");
    formData.append("IssueDate", new Date().toISOString());

    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("Photos", file);
      });
    }

    try {
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
      alert("Kan geen verbinding maken met de server.");
    }
  };

  return (
    <div className="inname-container">
      <h1>Inname Voertuigen</h1>
      <div className="intakes-list">
        {(Innamen || []).map((intake) => (
          <div key={intake.id} className="intake-card">
            <h2>Voertuig ID: {intake.voertuigId}</h2>
            <div className="status-container">
              <p>Status: {statusMap[intake.id] || intake.status}</p>
              <button
                className="status-edit-button"
                onClick={() => setEditingStatusId(intake.id)}
              >
                Wijzig Status
              </button>
              {editingStatusId === intake.id && (
                <div className="status-dropdown" ref={dropdownRef}>
                  <button onClick={() => handleStatusChange(intake.id, "Schade")}>Schade</button>
                  <button onClick={() => handleStatusChange(intake.id, "Ingenomen")}>
                    Ingenomen
                  </button>
                </div>
              )}
            </div>
            <p>Vooraf geregistreerde eventuele schade: {intake.remarks}</p>
            <p>Datum van inlevering: {new Date(intake.toDate).toLocaleDateString()}</p>
            <textarea
              value={remarksMap[intake.id] || ""}
              onChange={(e) => handleRemarksChange(intake.id, e)}
              placeholder="Voeg opmerkingen toe"
              className="remarks-textarea"
            />
            <input type="file" multiple onChange={handleFileChange} className="file-input" />
            <button onClick={() => handleSubmit(intake.id)} className="submit-button">
              Voltooi Inname
            </button>
          </div>
        ))}
      </div>
      <style>{`
          .inname-container {
            font-family: 'Arial', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          h1 {
            text-align: center;
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 20px;
          }

          .intakes-list {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: space-between;
          }

          .intake-card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 45%;
            box-sizing: border-box;
            transition: transform 0.3s ease;
          }

          .intake-card:hover {
            transform: translateY(-10px);
          }

          h2 {
            font-size: 1.5rem;
            color: #4A90E2;
          }

          p {
            font-size: 1rem;
            color: #555;
            margin: 5px 0;
          }

          .status-container {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .status-edit-button {
            background-color: #4A90E2;
            color: white;
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9rem;
          }

          .status-edit-button:hover {
            background-color: #357ABD;
          }

          .status-dropdown {
            position: absolute;
            background-color: #fff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            z-index: 10;
            top: 50px;
          }

          .status-dropdown button {
            width: 100%;
            padding: 10px;
            border: none;
            background-color: #fff;
            color: #4A90E2;
            cursor: pointer;
            text-align: left;
          }

          .status-dropdown button:hover {
            background-color: #f1f1f1;
          }

          .remarks-textarea {
            width: 100%;
            height: 100px;
            margin-top: 10px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            resize: none;
          }

          .remarks-textarea:focus {
            outline: none;
            border-color: #4A90E2;
          }

          .file-input {
            margin-top: 10px;
            padding: 5px;
          }

          .submit-button {
            background-color: #4A90E2;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 15px;
            cursor: pointer;
            font-size: 1rem;
          }

          .submit-button:hover {
            background-color: #357ABD;
          }
      `}</style>
    </div>
  );
};

export default InnamePage;
