import React from "react";

export const ExportButton = ({ invoice }) => {
  const handleExport = () => {
    const csvContent = [
      ["ID", "Auto", "Bedrag (€)", "Datum"],
      [invoice.id, invoice.car, invoice.amount, invoice.date],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `factuur_${invoice.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
