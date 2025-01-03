import React from "react";

function ActionButtons({ onConfirm, onCancel }) {
    return (
        <div className="mt-8 space-y-4">
            <button
                onClick={onConfirm}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
                Bevestig en Betaal
            </button>
            <button
                onClick={onCancel}
                className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
            >
                Annuleer
            </button>
        </div>
    );
}

export default ActionButtons;
