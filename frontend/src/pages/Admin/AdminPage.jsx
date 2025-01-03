import React, { useState, useEffect } from "react";
import UseAuthorization from "../../utils/UseAuthorization";
import api from "../../api";
import MedewerkerForm from "../../components/Admin/MedewerkerFrom";
import MedewerkerList from "../../components/Admin/MedewerkerList";
function AdminPage() {
  const { isAuthorized } = UseAuthorization(["Admin"]);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    if (isAuthorized) {
      try {
        const response = await api.get("/admin/medewerkers");
        setUsers(response.data);
      } catch (error) {
        alert(
          "Fout bij het ophalen van gebruikers: " +
            error.response?.data?.message || error.message
        );
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [isAuthorized]);

  if (!isAuthorized)
    return <div> U bent niet bevoegd om deze pagina te bekijken.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <MedewerkerForm onUserAdded={fetchUsers} />
      <MedewerkerList users={users} />
    </div>
  );
}

export default AdminPage;
