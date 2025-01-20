import React from "react";

const VoertuigenList = ({ voertuigen, loading, handleDelete }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Voertuigen Lijst</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {voertuigen.map((v) => (
            <li
              key={v.id}
              className="flex justify-between items-center border border-gray-300 rounded-md p-4 shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {v.merk} {v.type} ({v.kenteken})
                </p>
                <p className="text-gray-500">{v.voertuigType}</p>
              </div>
              <button
                onClick={() => handleDelete(v.id)}
                className="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600"
              >
                Verwijder
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VoertuigenList;
