import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/"); 
    };

    const handleViewDetails = () => {
        navigate("/huren-history"); 
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">
                    Huuraanvraag Succesvol!
                </h1>
                <p className="text-gray-700 mb-6">
                    Bedankt voor uw aanvraag. U ontvangt binnenkort een bevestiging per e-mail.
                </p>
                <div className="flex space-x-4">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
                        onClick={handleGoHome}
                    >
                        Terug naar Home
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                        onClick={handleViewDetails}
                    >
                        Bekijk Uw Aanvragen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
