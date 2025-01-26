import React, { useState, useEffect } from "react";

const AbonnementForm = ({ onSubmit, formData, setFormData }) => {
    const minDate = new Date().toISOString().split("T")[0];

    const [customAmount, setCustomAmount] = useState(formData.customAmount || "");

    const berekenPrijsMetKorting = (amount) => {
        let numericAmount = parseFloat(amount);

        if (isNaN(numericAmount) || numericAmount < 500) {
            return 0;
        }

        if (numericAmount >= 500 && numericAmount < 1000) {
            numericAmount *= 0.95;  
        } else if (numericAmount >= 1000 && numericAmount < 2000) {
            numericAmount *= 0.90;  
        } else if (numericAmount >= 2000) {
            numericAmount *= 0.85;  
        }

        return numericAmount.toFixed(2);
    };

    useEffect(() => {
        if (formData.abonnementType === "pay-as-you-go") {
            setFormData((prev) => ({ ...prev, kosten: 50, customAmount: "" }));
            setCustomAmount("");
        } else if (formData.abonnementType === "prepaid" && customAmount) {
            const discountedPrice = berekenPrijsMetKorting(customAmount);
            setFormData((prev) => ({
                ...prev,
                kosten: discountedPrice,
                customAmount: parseFloat(customAmount) || 0, 
            }));
        }
    }, [formData.abonnementType, customAmount, setFormData]);

    return (
        <form onSubmit={onSubmit} className="max-w-lg mx-auto bg-white p-6 shadow rounded mb-6">
            <h2 className="text-xl font-semibold mb-4">Nieuw Abonnement Aanmaken</h2>

            <div className="mb-4">
                <label className="block font-medium mb-2">Abonnementstype</label>
                <select
                    value={formData.abonnementType}
                    onChange={(e) => setFormData({ ...formData, abonnementType: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="pay-as-you-go">Pay-as-you-go (€50)</option>
                    <option value="prepaid">Prepaid (Vanaf €500)</option>
                </select>
            </div>

            {formData.abonnementType === "prepaid" && (
                <div className="mb-4">
                    <label className="block font-medium mb-2">Kies uw gewenste bedrag (€)</label>
                    <input
                        type="number"
                        min="500"
                        step="100"
                        value={customAmount}
                        onChange={(e) => {
                            setCustomAmount(e.target.value);
                        }}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
            )}

            <div className="mb-4">
                <label className="block font-medium mb-2">Kosten</label>
                <input
                    type="text"
                    value={`€${formData.kosten}`}
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                    readOnly
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2">Betaalmethode</label>
                <select
                    value={formData.betaalmethode}
                    onChange={(e) => setFormData({ ...formData, betaalmethode: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="iDeal">iDeal</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Creditcard">Creditcard</option>
                    <option value="Bankoverschrijving">Bankoverschrijving</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2">Startdatum</label>
                <input
                    type="date"
                    value={formData.startDatum}
                    min={minDate}
                    onChange={(e) => setFormData({ ...formData, startDatum: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
                Abonnement Aanmaken
            </button>
        </form>
    );
};

export default AbonnementForm;
