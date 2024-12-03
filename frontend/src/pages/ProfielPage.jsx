import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import eventEmitter from "../utils/EventEmitter";
import ProfileForm from "../components/profile/ProfileForm";
import PasswordModal from "../components/profile/PasswordModal";

function ProfielPage() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    voornaam: "",
    achternaam: "",
    adres: { straatnaam: "", huisnummer: "" },
    roles: [],
    kvKNummer: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

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

  const handleSave = async (updatedUserData) => {
    try {
      await api.put("/account/Account", updatedUserData);
      setUserData(updatedUserData);
      alert("Informatie succesvol bijgewerkt!");
    } catch (err) {
      console.error("Failed to update user data", err);
      alert("Bijwerken mislukt. Probeer opnieuw.");
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

  const handleChangePassword = async () => {
    try {
      const response = await api.put("/Account/Account/ChangePassword", passwordData);
      alert(response.data.message);
      setIsPasswordModalOpen(false);
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      console.error("Password change failed", err);
      alert("Wachtwoord wijzigen mislukt. Probeer opnieuw.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-12">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Profielinformatie</h2>
        <ProfileForm
          userData={userData}
          setUserData={setUserData}
          onSave={handleSave}
          onDelete={handleDeleteAccount}
          onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
        />
      </div>

      {isPasswordModalOpen && (
        <PasswordModal
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          onSave={handleChangePassword}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ProfielPage;
