import React from "react";
import api from "../../api";

const MedewerkerList = ({ users, onUserDeleted }) => {
  
  const handleDelete = async (userId) => {
    if (!window.confirm("Weet je zeker dat je deze medewerker wilt verwijderen?")) return;

    try {
      await api.delete(`/admin/delete-medewerker/${userId}`);
      alert("Medewerker succesvol verwijderd!");
      onUserDeleted(); 
    } catch (err) {
      alert("Fout bij het verwijderen van de medewerker.");
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Medewerkerslijst</h2>
      {users.length === 0 ? (
        <p>Geen gebruikers gevonden.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Gebruikersnaam</th>
              <th className="border border-gray-300 px-4 py-2">Voornaam</th>
              <th className="border border-gray-300 px-4 py-2">Achternaam</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Functie</th>
              <th className="border border-gray-300 px-4 py-2">Acties</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{user.gebruikersnaam}</td>
                <td className="border border-gray-300 px-4 py-2">{user.voornaam}</td>
                <td className="border border-gray-300 px-4 py-2">{user.achternaam}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.functie}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button 
                    onClick={() => handleDelete(user.gebruikersnaam)} 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Verwijderen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MedewerkerList;
