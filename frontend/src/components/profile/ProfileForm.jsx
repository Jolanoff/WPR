import React from "react";

function ProfileForm({ userData, setUserData, onSave, onDelete, onOpenPasswordModal }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      adres: name === "straatnaam" || name === "huisnummer"
        ? {
            ...prev.adres,
            [name]: name === "huisnummer" ? parseInt(value) || "" : value,
          }
        : prev[name] = value,
    }));
  };

  const handleSave = () => {
    const payload = {
      ...userData,
      straatnaam: userData.adres.straatnaam,
      huisnummer: userData.adres.huisnummer,
    };
    onSave(payload);
  };

  return (
    <div className="space-y-4">
      {[
        { label: "Gebruikersnaam", id: "userName", type: "text", value: userData.userName },
        { label: "Email", id: "email", type: "email", value: userData.email },
        { label: "Telefoonnummer", id: "telefoonnummer", type: "text", value: userData.telefoonnummer },
        { label: "Voornaam", id: "voornaam", type: "text", value: userData.voornaam },
        { label: "Achternaam", id: "achternaam", type: "text", value: userData.achternaam },
        { label: "Straatnaam", id: "straatnaam", type: "text", value: userData.adres.straatnaam },
        { label: "Huisnummer", id: "huisnummer", type: "number", value: userData.adres.huisnummer },
      ].map(({ label, id, type, value }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-gray-700 font-medium">{label}</label>
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      ))}
      <div className="mt-6 flex justify-between">
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Opslaan
        </button>
        <button onClick={onOpenPasswordModal} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
          Wachtwoord wijzigen
        </button>
        <button onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Account verwijderen
        </button>
      </div>
    </div>
  );
}

export default ProfileForm;
