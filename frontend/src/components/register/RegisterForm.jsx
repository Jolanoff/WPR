import React from "react";
import BedrijfField from "./BedrijfField";

const RegisterForm = ({ formData, setFormData, onSubmit, responsePayload }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.startsWith("adres.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        adres: {
          ...prev.adres,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-white p-10 m-10 rounded-lg shadow-md w-full max-w-md "
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Registreren
      </h2>
    

      {responsePayload && (
        <div className="text-green-500 text-sm mb-4">
          <p>
            <strong>Succesvol:</strong> {JSON.stringify(responsePayload)}
          </p>
        </div>
      )}

      {[
        { label: "Gebruikersnaam", id: "userName", type: "text" },
        { label: "Voornaam", id: "voornaam", type: "text" },
        { label: "Achternaam", id: "achternaam", type: "text" },
        { label: "Email", id: "email", type: "email" },
        { label: "Wachtwoord", id: "password", type: "password" },
        { label: "Telefoonnummer", id: "phoneNumber", type: "text" },
        { label: "Straatnaam", id: "straatnaam", type: "text" },
        { label: "Huisnummer", id: "huisnummer", type: "number" },
      ].map(({ label, id, type }) => (
        <div key={id} className="mb-4">
          <label htmlFor={id} className="block text-gray-700 font-medium">
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={id}
            value={formData[id]}
            onChange={handleChange}
            required
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      ))}

      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700 font-medium">
          Accounttype
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="ParticuliereHuurder">Particulier</option>
          <option value="Bedrijf">Bedrijf</option>
        </select>
      </div>

      {formData.role === "Bedrijf" && (
        <BedrijfField
          kvkNummer={formData.kvkNummer}
          onChange={handleChange}
        />
      )}

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
      >
        Registreren
      </button>
    </form>
  );
};

export default RegisterForm;
