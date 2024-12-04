import React from 'react'

function FactuurPage() {
  
  const facturen = [
    { id: 1, nummer: "F2024-001", klant: "Jan Jansen", bedrag: "€ 100,00", datum: "01-12-2024" },
    { id: 2, nummer: "F2024-002", klant: "Piet Pietersen", bedrag: "€ 200,00", datum: "02-12-2024" },
    { id: 3, nummer: "F2024-003", klant: "Kees de Koning", bedrag: "€ 300,00", datum: "03-12-2024" },
    { id: 4, nummer: "F2024-004", klant: "Lisa Verhoeven", bedrag: "€ 400,00", datum: "04-12-2024" },
    { id: 5, nummer: "F2024-005", klant: "Maaike van Dijk", bedrag: "€ 500,00", datum: "05-12-2024" },
    { id: 6, nummer: "F2024-006", klant: "Tom Smit", bedrag: "€ 600,00", datum: "06-12-2024" },
    { id: 7, nummer: "F2024-007", klant: "Anna van der Meer", bedrag: "€ 700,00", datum: "07-12-2024" },
    { id: 8, nummer: "F2024-008", klant: "Bram Bakker", bedrag: "€ 800,00", datum: "08-12-2024" },
    { id: 9, nummer: "F2024-009", klant: "Sara Vos", bedrag: "€ 900,00", datum: "09-12-2024" },
    { id: 10, nummer: "F2024-010", klant: "Joost van Dam", bedrag: "€ 1.000,00", datum: "10-12-2024" },
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-2xl font-bold mb-4">Facturen Overzicht</h1>
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-200 text-blue-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Factuurnummer</th>
            <th className="py-3 px-6 text-left">Klant</th>
            <th className="py-3 px-6 text-left">Bedrag</th>
            <th className="py-3 px-6 text-left">Datum</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {facturen.map((factuur) => (
            <tr key={factuur.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{factuur.nummer}</td>
              <td className="py-3 px-6 text-left">{factuur.klant}</td>
              <td className="py-3 px-6 text-left">{factuur.bedrag}</td>
              <td className="py-3 px-6 text-left">{factuur.datum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default FactuurPage