import React from "react";

const FilterSection = ({ typeFilter, setTypeFilter }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Filter Voertuigen</h2>
      <div className="grid grid-cols-1 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="alle">Alle Types</option>
            <option value="auto">Auto</option>
            <option value="caravan">Caravan</option>
            <option value="camper">Camper</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
