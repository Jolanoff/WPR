import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import api from "../api";
import MedewerkerList from "../components/Admin/MedewerkerList";
import UseAuthorization from "../utils/UseAuthorization";

function DashboardPage() {
  const { userInfo, loading, error } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const { userRoles } = UseAuthorization([])

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/medewerkers");
      setUsers(response.data);
    } catch (err) {
      setFetchError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>Geen gebruikersinformatie beschikbaar.</div>;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-start">
      {/* Hoofdinhoud */}
      <h2 className="text-black text-2xl md:text-4xl font-bold text-center mb-1 pl-4 pt-2">
        Welkom terug
      </h2>
      <p className="text-gray-700 text-lg md:text-2xl text-center pl-4">
        Beheer gemakkelijk al je zaken via het dashboard
      </p>
      {/* Containerelement voor de 4 divs */}
      <div className="flex flex-row justify-around w-full px-6 mt-6 gap-6">
        {/* Div 1 */}
        <div className="flex-1 bg-gray-200 p-4 text-center rounded-lg shadow-md"
          style={{
            height: '160px', backgroundImage: "url('/src/assets/Mock data 1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          }}>
        </div>
        {/* Div 2 */}
        <div className="flex-1 bg-gray-200 p-4 text-center rounded-lg shadow-md"
          style={{
            height: '160px', backgroundImage: "url('/src/assets/Mock data 4.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          }}>
        </div>
        {/* Div 3 */}
        <div className="flex-1 bg-gray-200 p-4 text-center rounded-lg shadow-md"
          style={{
            height: '160px', backgroundImage: "url('/src/assets/Mock data 3.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          }}>
        </div>
        {/* Div 4 */}
        <div className="flex-1 bg-gray-200 p-4 text-center rounded-lg shadow-md"
          style={{
            height: '160px', backgroundImage: "url('/src/assets/Mock data 5.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          }}>
        </div>
      </div>

      {/* Lijst met medewerkers */}
      {Array.isArray(userRoles) && userRoles.includes("Admin") && (

        <div className="w-full mt-8 px-6 pl-4">

          <h3 className="text-3xl font-bold pt-4">
            Beheer hier al je medewerkers:
          </h3>

          <div className="mb-4 pt-4">
            <MedewerkerList users={users} />
          </div>

        </div>
      )}

    </div>
  );
}

export default DashboardPage;