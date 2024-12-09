import React from "react";
import UitgifteForm from "../components/Uitgifte/VoertuigUitgifteForm";


const UitgiftePage = () => {
    const handleSubmit = async (formData) => {
      try {
        const response = await fetch("http://localhost:3001/api/issue-vehicle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        if (response.ok) {
          alert("Uitgifte succesvol geregistreerd!");
        } else {
          alert(`Fout: ${data.message}`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Er is een fout opgetreden.");
      }
    };
  
    return (
      <div className="flex flex-col min-h-screen">
        
        <main className="flex-grow">
          <h1 className="text-xl font-bold text-center mt-4">Voertuig Uitgifte</h1>
          <UitgifteForm onSubmit={handleSubmit} />
        </main>
        
      </div>
    );
  };
  
  export default UitgiftePage;