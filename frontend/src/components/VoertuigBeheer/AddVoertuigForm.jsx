import React from "react";

const AddVoertuigForm = ({ newVoertuig, setNewVoertuig, handleCreate }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Voeg Nieuw Voertuig Toe</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
        className="grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Merk"
          value={newVoertuig.merk}
          onChange={(e) => setNewVoertuig({ ...newVoertuig, merk: e.target.value })}
          className="col-span-2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Type"
          value={newVoertuig.type}
          onChange={(e) => setNewVoertuig({ ...newVoertuig, type: e.target.value })}
          className="col-span-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Kenteken"
          value={newVoertuig.kenteken}
          onChange={(e) => setNewVoertuig({ ...newVoertuig, kenteken: e.target.value })}
          className="col-span-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Kleur"
          value={newVoertuig.kleur}
          onChange={(e) => setNewVoertuig({ ...newVoertuig, kleur: e.target.value })}
          className="col-span-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Aanschafjaar"
          value={newVoertuig.aanschafjaar}
          onChange={(e) =>
            setNewVoertuig({ ...newVoertuig, aanschafjaar: parseInt(e.target.value) })
          }
          className="col-span-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        />
        <div className="col-span-1">
          <select
            value={newVoertuig.voertuigType}
            onChange={(e) => setNewVoertuig({ ...newVoertuig, voertuigType: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecteer Type</option>
            <option value="Auto">Auto</option>
            <option value="Caravan">Caravan</option>
            <option value="Camper">Camper</option>
          </select>
        </div>
        <input
          type="number"
          placeholder="Prijs"
          value={newVoertuig.prijs}
          onChange={(e) =>
            setNewVoertuig({ ...newVoertuig, prijs: parseFloat(e.target.value) })
          }
          className="col-span-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="col-span-2 bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600"
        >
          Toevoegen
        </button>
      </form>
    </div>
  );
};

export default AddVoertuigForm;
