import React, { useState, useEffect } from "react";

const InnamePage = () => {
  const [pendingIntakes, setPendingIntakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchPendingIntakes = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/vehicle/pending`);
        const data = await response.json();
        setPendingIntakes(data);
      } catch (error) {
        console.error("Error fetching pending intakes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingIntakes();
  }, [apiBaseUrl]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Onbekende datum' : date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-50">
      <h1 className="text-xl font-bold text-center mt-4">Voertuigen in Behandeling</h1>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-center text-gray-600">Bezig met laden...</p>
        ) : pendingIntakes.length > 0 ? (
          pendingIntakes.map((intake) => (
            <div
              key={intake.Id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg shadow-md bg-white"
            >
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <p className="font-semibold text-gray-700 text-lg">{intake.VoertuigNaam}</p>
                <p className="text-sm text-gray-600">Intake datum: {formatDate(intake.IntakeDate)}</p>
                <p className="text-sm text-gray-600">Status: <span className="font-semibold text-yellow-500">{intake.Status}</span></p>
                <p className="text-sm text-gray-600">Klantnaam: {intake.KlantNaam}</p>
                <p className="text-sm text-gray-600">Opmerkingen: {intake.Remarks || 'Geen opmerkingen'}</p>
              </div>
              <div className="flex flex-col space-y-2 w-full md:w-1/3 mt-4 md:mt-0">
                <p className="text-sm text-gray-600">Issue datum: {formatDate(intake.IssueDate)}</p>
                <p className="text-sm text-gray-600">Te doen voor: {formatDate(intake.ToDate)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Geen voertuigen in behandeling.</p>
        )}
      </div>
    </div>
  );
};

export default InnamePage;
