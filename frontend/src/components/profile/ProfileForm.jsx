import React, { useState } from "react";

const ProfileForm = ({ userData, onSave, onDelete, onOpenPasswordModal, userRoles }) => {
  const [localData, setLocalData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("adres.")) {
      const field = name.split(".")[1];
      setLocalData((prev) => ({
        ...prev,
        adres: {
          ...prev.adres,
          [field]: value,
        },
      }));
    } else {
      setLocalData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(localData);
  };
  const isKlant = userRoles && Array.isArray(userRoles) && !userRoles.some((role) => ["FrontOfficeMedewerker", "BackOfficeMedewerker", "Admin"].includes(role));
  

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="userName" className="block text-gray-700 font-medium">
            Gebruikersnaam
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={localData.userName}
            onChange={handleChange}
            required
            className="mt-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={localData.email}
            onChange={handleChange}
            required
            className="mt-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="voornaam" className="block text-gray-700 font-medium">
            Voornaam
          </label>
          <input
            type="text"
            id="voornaam"
            name="voornaam"
            value={localData.voornaam}
            onChange={handleChange}
            required
            className="mt-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="achternaam" className="block text-gray-700 font-medium">
            Achternaam
          </label>
          <input
            type="text"
            id="achternaam"
            name="achternaam"
            value={localData.achternaam}
            onChange={handleChange}
            required
            className="mt-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>
      {isKlant && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="telefoonnummer" className="block text-gray-700 font-medium">
                Telefoonnummer
              </label>
              <input
                type="text"
                id="telefoonnummer"
                name="telefoonnummer"
                value={localData.telefoonnummer}
                onChange={handleChange}
                className="mt-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="adres.straatnaam" className="block text-gray-700 font-medium">
                Straatnaam
              </label>
              <input
                type="text"
                id="adres.straatnaam"
                name="adres.straatnaam"
                value={localData.adres.straatnaam}
                onChange={handleChange}
                className="mt-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="adres.huisnummer" className="block text-gray-700 font-medium">
                Huisnummer
              </label>
              <input
                type="number"
                id="adres.huisnummer"
                name="adres.huisnummer"
                value={localData.adres.huisnummer}
                onChange={handleChange}
                className="mt-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </>
      )}
      {Array.isArray(userRoles) && userRoles.includes("Bedrijf")  && (
        <div>
          <label htmlFor="kvKNummer" className="block text-gray-700 font-medium">
            KvK Nummer
          </label>
          <input
            type="text"
            id="kvKNummer"
            name="kvKNummer"
            value={localData.kvKNummer || ""}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleSubmit}

          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Opslaan
        </button>
        <button
          type="button"
          onClick={onOpenPasswordModal}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
        >
          Wachtwoord Wijzigen
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Account Verwijderen
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
