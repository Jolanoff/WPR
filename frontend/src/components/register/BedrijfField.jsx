import React from "react";

const BedrijfField = ({ kvkNummer, onChange }) => (
  <div className="mb-4">
    <label htmlFor="kvkNummer" className="block text-gray-700 font-medium">
      KvK-nummer
    </label>
    <input
      type="text"
      id="kvkNummer"
      name="kvkNummer"
      value={kvkNummer}
      onChange={onChange}
      required
      className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  </div>
);

export default BedrijfField;
