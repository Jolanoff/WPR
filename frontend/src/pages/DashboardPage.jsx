import React from "react";
import { useAuthStore } from "../store/authStore";

function DashboardPage() {
  const { userInfo, loading, error } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>No user information available.</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {userInfo.userName}!</h1>
      <p>You are a {userInfo.roles.join(", ")}.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Card {i + 1}</h2>
            <p className="text-gray-600">Sample content for card {i + 1}.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
