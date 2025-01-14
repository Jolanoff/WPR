import React from "react";

const MedewerkerList = ({ users }) => {
  return (
    <div className="max-w-4xl bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Medewerkerslijst</h2>
      {users.length === 0 ? (
        <p>Geen gebruikers gevonden.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300">
                Gebruikersnaam
              </th>
              <th className="border border-gray-300 px-4 py-2">Voornaam</th>
              <th className="border border-gray-300 px-4 py-2">Achternaam</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Functie</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {user.gebruikersnaam}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.voornaam}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.achternaam}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.functie}
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
