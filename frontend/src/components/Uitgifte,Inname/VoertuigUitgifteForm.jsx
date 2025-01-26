import React, { useState, useEffect } from "react";

const VoertuigUitgifteForm = ({ onSubmit, selectedVehicle }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    voertuigId: "",
    klantId: "", 
    fromDate: "",
    toDate: "",
    remarks: "",
  });

  // Update formData wanneer selectedVehicle verandert
  useEffect(() => {
    if (selectedVehicle) {
      setFormData({
        customerName: selectedVehicle.customerName || "",
        voertuigId: selectedVehicle.id || "",
        klantId: selectedVehicle.klantId || "", 
        fromDate: selectedVehicle.fromDate || "",
        toDate: selectedVehicle.toDate || "",
        remarks: selectedVehicle.remarks || "",
      });
    }
  }, [selectedVehicle]);

  const handleVerandering = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Klantnaam */}
      <div>
        <label>Klantnaam</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleVerandering}
          required
        />
      </div>
      
      {/* Voertuig ID */}
      <div>
        <label>Voertuig ID</label>
        <input
          type="text"
          name="voertuigId"
          value={formData.voertuigId}
          onChange={handleVerandering}
          required
          disabled // Dit veld is alleen-lezen
        />
      </div>

      {/* Klant ID */}
      <div>
        <label>Klant ID</label>
        <input
          type="text"
          name="klantId"
          value={formData.klantId}
          onChange={handleVerandering}
          required
        />
      </div>

      {/* Van Datum */}
      <div>
        <label>Van Datum</label>
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleVerandering}
          required
        />
      </div>

      {/* Tot Datum */}
      <div>
        <label>Tot Datum</label>
        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleVerandering}
          required
        />
      </div>

      {/* Opmerkingen */}
      <div>
        <label>Opmerkingen</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleVerandering}
        ></textarea>
      </div>
      <button type="submit">Bevestigen</button>
    </form>
  );
};

export default VoertuigUitgifteForm;
