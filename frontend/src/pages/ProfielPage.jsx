import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import eventEmitter from "../utils/EventEmitter";

function ProfielPage() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    voornaam: "",
    achternaam: "",
    adres: { straatnaam: "", huisnummer: "" },
    roles:[],
    kvKNummer: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Ophalen van gebruikersinformatie
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/account/Account");
        const data = response.data;
  
        
        if (!data.adres) {
          data.adres = { straatnaam: "", huisnummer: "" };
        }
  
        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setError("Kon gebruikersinformatie niet laden.");
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "straatnaam" || name === "huisnummer") {
      setUserData((prev) => ({
        ...prev,
        adres: {
          ...prev.adres,
          [name]: name === "huisnummer" ? parseInt(value) || "" : value,
        },
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    const payload = {
      userName: userData.userName,
      email: userData.email,
      voornaam: userData.voornaam,
      achternaam: userData.achternaam,
      straatnaam: userData.adres.straatnaam,
      huisnummer: userData.adres.huisnummer,
      kvKNummer: userData.kvKNummer,
      telefoonnummer: userData.telefoonnummer,
    };
  
    try {
      await api.put("/account/Account", payload);
      alert("Informatie succesvol bijgewerkt!");
    } catch (err) {
      console.error("Failed to update user data", err);
  
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        alert(Object.values(errors).flat().join("\n")); // Toon validatiefouten
      } else {
        alert("Bijwerken mislukt. Probeer opnieuw.");
      }
    }
  };


  const handleDeleteAccount = async () => {
    if (window.confirm("Weet je zeker dat je je account wilt verwijderen?")) {
      try {
        await api.delete("/account/Account");
        
        localStorage.removeItem("isLoggedIn");
        eventEmitter.emit("accountDeleted");
        alert("Account succesvol verwijderd.");
        navigate("/");
      } catch (err) {
        console.error("Failed to delete account", err);
        alert("Account verwijderen mislukt. Probeer opnieuw.");
      }
    }
  };


  const isBedrijf = userData.roles && userData.roles.includes("Bedrijf");
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-12">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Profielinformatie
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-gray-700 font-medium">
              Gebruikersnaam
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
              value={userData.email}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium"
            >
              Telefoonnummer
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.telefoonnummer}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="voornaam" className="block text-gray-700 font-medium">
              Voornaam
            </label>
            <input
              type="text"
              id="voornaam"
              name="voornaam"
              value={userData.voornaam}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
              value={userData.achternaam}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="straatnaam" className="block text-gray-700 font-medium">
              Straatnaam
            </label>
            <input
              type="text"
              id="straatnaam"
              name="straatnaam"
              value={userData.adres.straatnaam}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="huisnummer" className="block text-gray-700 font-medium">
              Huisnummer
            </label>
            <input
              type="number"
              id="huisnummer"
              name="huisnummer"
              value={userData.adres.huisnummer}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          {isBedrijf && (
            <div>
              <label htmlFor="kvKNummer" className="block text-gray-700 font-medium">
                KvK-nummer
              </label>
              <input
                type="text"
                id="kvKNummer"
                name="kvKNummer"
                value={userData.kvKNummer}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Opslaan
          </button>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Account verwijderen
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfielPage;
