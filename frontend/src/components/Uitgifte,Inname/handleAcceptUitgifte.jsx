const handleAcceptUitgifte = async () => {
  try {
    const response = await fetch(
      `http://localhost:5039/api/vehicle/accept/${selectedUitgifte.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.customerName,
          voertuigId: formData.voertuigId,
          klantId: formData.klantId,  // Voeg KlantId toe
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          remarks: formData.remarks,
        }),
      }
    );

    if (response.ok) {
      setUitgiften((prev) =>
        prev.filter((uitgifte) => uitgifte.id !== selectedUitgifte.id)
      );
      alert("Uitgifte geaccepteerd!");
      setSelectedUitgifte(null);
    } else {
      alert("Fout bij het accepteren van de uitgifte.");
    }
  } catch (error) {
    console.error("Fout bij het accepteren van uitgifte:", error);
  }
};
