import React from "react";

function PasswordModal({ passwordData, setPasswordData, onSave, onClose }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Wachtwoord wijzigen</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-gray-700">Huidig wachtwoord</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-gray-700">Nieuw wachtwoord</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Annuleren
          </button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Opslaan
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
