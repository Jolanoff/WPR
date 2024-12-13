import { useState, useEffect } from "react";

function VoertuigenSidebar({
    onTypeFilterChange,
    currentTypeFilter,
    userRole,
    startDatum: parentStartDatum,
    eindDatum: parentEindDatum,
    onStartDatumChange,
    onEindDatumChange,
}) {
    const [startDatum, setStartDatum] = useState(parentStartDatum);
    const [eindDatum, setEindDatum] = useState(parentEindDatum);
    const [errorMessage, setErrorMessage] = useState("");

    const isParticularUser = userRole?.includes("ParticuliereHuurder");
    const isBedrijfUser = userRole?.includes("Bedrijf");

    useEffect(() => {
        if (startDatum && eindDatum) {
            if (new Date(eindDatum) < new Date(startDatum)) {
                setErrorMessage(
                    "Einddatum mag niet eerder zijn dan startdatum."
                );
            } else {
                //FIXME: PAGE GREYED OUT ????? (status ...)
                setErrorMessage("");
            }
        }
    }, [startDatum, eindDatum]);

    const handleStartDatumChange = (value) => {
        setStartDatum(value);
        onStartDatumChange(value);
    };

    const handleEindDatumChange = (value) => {
        setEindDatum(value);
        onEindDatumChange(value);
    };

    return (
        <div className="w-64 p-4 bg-gray-100 border-r">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div>
                <h3 className="font-semibold mb-2">Beschikbaarheid</h3>
                <h4>Start datum</h4>
                <input
                    type="date"
                    id="start-date-picker"
                    value={startDatum}
                    onChange={(e) => handleStartDatumChange(e.target.value)}
                    className="w-full rounded-md p-2 border border-black mb-4"
                />
                <h4>Eind datum</h4>
                <input
                    type="date"
                    id="end-date-picker"
                    value={eindDatum}
                    onChange={(e) => handleEindDatumChange(e.target.value)}
                    className="w-full rounded-md p-2 border border-black mb-4"
                />
                {errorMessage && (
                    <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}

                <h3 className="font-semibold mb-2">Voertuig Type</h3>
                <select
                    className={`w-full rounded-md p-2 border border-black mb-4 ${
                        isBedrijfUser
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : ""
                    }`}
                    value={isBedrijfUser ? "auto" : currentTypeFilter}
                    onChange={(e) => onTypeFilterChange(e.target.value)}
                    disabled={isBedrijfUser}
                >
                    {isParticularUser && (
                        <>
                            <option value="alle">Alle</option>
                            <option value="auto">Auto</option>
                            <option value="camper">Camper</option>
                            <option value="caravan">Caravan</option>
                        </>
                    )}

                    {isBedrijfUser && <option value="auto">Auto</option>}
                </select>
            </div>
        </div>
    );
}

export default VoertuigenSidebar;
