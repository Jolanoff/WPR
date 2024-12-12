import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import eventEmitter from "../utils/EventEmitter";
import ProfileForm from "../components/Profile/ProfileForm";
import PasswordModal from "../components/Profile/PasswordModal";

import { HandleApiErrors } from "../utils/HandleApiError";
import ErrorMessage from "../components/ErrorMessage";

import UseAuthorization from "../utils/UseAuthorization";


function ProfielPage() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    voornaam: "",
    achternaam: "",
    telefoonnummer: "",
    adres: { straatnaam: "", huisnummer: 0 },
    kvKNummer: null,
    roles: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();

  const { userRoles } = UseAuthorization([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/account/Account");
        const data = response.data;

        if (!data.adres) {
          data.adres = { straatnaam: "", huisnummer: "" };
        }

        setUserData(data);
      } catch (err) {
        setError(HandleApiErrors(err.response));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);



  const handleSave = async (updatedUserData) => {

    setError(null);

    try {
      const payload = {
        ...updatedUserData,
        adres: {
          straatnaam: updatedUserData.adres.straatnaam,
          huisnummer: parseInt(updatedUserData.adres.huisnummer, 10)
        },
        kvKNummer: updatedUserData.kvKNummer || "",
      };

      const response = await api.put("/account/Account", payload);
      setUserData(response.data);
      alert("Informatie succesvol bijgewerkt!");
    } catch (err) {
      alert(err.response?.data?.message)
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
        setError(HandleApiErrors(err.response));

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
      setError(HandleApiErrors(err.response));

    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-12">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Profielinformatie</h2>
        <ProfileForm
          userRoles={userRoles}
          userData={userData}
          
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
      <ErrorMessage error={error} />
    </div>
  );
}

export default ProfielPage;
