import React from "react";
import { ExportButton } from "../components/buttons/ExportButton.jsx";
import { useNavigate } from "react-router-dom";

const FactuurPage = () => {
  const navigate = useNavigate();

  const invoices = [
    { id: 1, car: "Toyota Corolla", amount: 500, date: "2023-01-15" },
    { id: 2, car: "Ford Focus", amount: 400, date: "2023-02-12" },
    { id: 3, car: "Tesla Model 3", amount: 800, date: "2023-03-20" },
  ];

  const handleNavigate = (id) => {
    navigate(`/factuur/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Factuuroverzicht</h1>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="p-4 border rounded shadow-md flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{invoice.car}</p>
              <p>Bedrag: €{invoice.amount}</p>
              <p>Datum: {invoice.date}</p>
            </div>
            <div className="space-x-4">
              <ExportButton invoice={invoice} />
              <button
                onClick={() => handleNavigate(invoice.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Bekijk factuur
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactuurPage;
