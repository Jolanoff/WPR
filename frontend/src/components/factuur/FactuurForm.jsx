import React from "react";
import { useParams } from "react-router-dom";

const FactuurForm = () => {
  const { id } = useParams();

  const invoices = [
    { id: 1, car: "Toyota Corolla", amount: 500, date: "2023-01-15" },
    { id: 2, car: "Ford Focus", amount: 400, date: "2023-02-12" },
    { id: 3, car: "Tesla Model 3", amount: 800, date: "2023-03-20" },
  ];

  const invoice = invoices.find((inv) => inv.id === parseInt(id, 10));

  if (!invoice) {
    return <div>Factuur niet gevonden</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Factuur {invoice.id}</h1>
      <div className="p-4 border rounded shadow-md">
        <p className="text-lg font-semibold">Auto: {invoice.car}</p>
        <p>Bedrag: €{invoice.amount}</p>
        <p>Datum: {invoice.date}</p>
      </div>
    </div>
  );
};

export default FactuurForm;
