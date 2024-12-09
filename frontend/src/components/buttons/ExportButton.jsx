import React from "react";
import jsPDF from "jspdf";

export const ExportButton = ({ invoice }) => {
  const handleExport = () => {
    const doc = new jsPDF();

    // Factuurgegevens toevoegen aan de PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Factuur", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Factuur ID: ${invoice.id}`, 20, 40);
    doc.text(`Auto: ${invoice.car}`, 20, 50);
    doc.text(`Bedrag: €${invoice.amount}`, 20, 60);
    doc.text(`Datum: ${invoice.date}`, 20, 70);

    // PDF downloaden
    doc.save(`factuur_${invoice.id}.pdf`);
  };

  return (
    <button
      onClick={handleExport}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Exporteer factuur
    </button>
  );
};
