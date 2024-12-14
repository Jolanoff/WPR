import { useState, useEffect } from "react";

function VoertuigenSidebar({
    onTypeFilterChange,
    currentTypeFilter,
    userRole,
    startDatum: parentStartDatum,
    eindDatum: parentEindDatum,
    onStartDatumChange,
    onEindDatumChange,
    merken = [],
    brandFilter,
    onBrandFilterChange,
}) {
    const [startDatum, setStartDatum] = useState(parentStartDatum);
    const [eindDatum, setEindDatum] = useState(parentEindDatum);
    const [errorMessage, setErrorMessage] = useState("");
    const [showAllBrands, setShowAllBrands] = useState(false);

    const toggleMerk = (merk) => {
        const newBrandFilter = brandFilter.includes(merk)
            ? brandFilter.filter((m) => m !== merk)
            : [...brandFilter, merk];
        onBrandFilterChange(newBrandFilter);
    };

    const clearAllBrands = () => {
        onBrandFilterChange([]);
    };

    useEffect(() => {
        if (startDatum && eindDatum) {
            if (new Date(eindDatum) < new Date(startDatum)) {
                setErrorMessage(
                    "Einddatum mag niet eerder zijn dan startdatum."
                );
            } else {
                setErrorMessage("");
            }
        }
    }, [startDatum, eindDatum]);

    // Show first 12 brands initially
    const displayedMerken = showAllBrands ? merken : merken.slice(0, 12);

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
                    onChange={(e) => onStartDatumChange(e.target.value)}
                    className="w-full rounded-md p-2 border border-black mb-4"
                />
                <h4>Eind datum</h4>
                <input
                    type="date"
                    id="end-date-picker"
                    value={eindDatum}
                    onChange={(e) => onEindDatumChange(e.target.value)}
                    className="w-full rounded-md p-2 border border-black mb-4"
                />

                <h3 className="font-semibold mb-2">Voertuig Type</h3>
                <select
                    className={`w-full rounded-md p-2 border border-black mb-4`}
                    value={currentTypeFilter}
                    onChange={(e) => onTypeFilterChange(e.target.value)}
                >
                    <option value="alle">Alle</option>
                    <option value="auto">Auto</option>
                    <option value="camper">Camper</option>
                    <option value="caravan">Caravan</option>
                </select>

                <h3 className="font-semibold mb-2 flex justify-between items-center">
                    Merken
                    {brandFilter.length > 0 && (
                        <button
                            onClick={clearAllBrands}
                            className="text-xs text-red-600 hover:text-red-800"
                        >
                            Alles wissen
                        </button>
                    )}
                </h3>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2">
                    {displayedMerken.map((merk) => (
                        <div key={merk} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`merk-${merk}`}
                                checked={brandFilter.includes(merk)}
                                onChange={() => toggleMerk(merk)}
                                className="mr-2 w-4 h-4"
                            />
                            <label
                                htmlFor={`merk-${merk}`}
                                className="text-sm flex-grow overflow-hidden whitespace-nowrap overflow-ellipsis"
                            >
                                {merk}
                            </label>
                        </div>
                    ))}
                </div>

                {merken.length > 12 && (
                    <button
                        onClick={() => setShowAllBrands(!showAllBrands)}
                        className="w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {showAllBrands ? "Minder tonen" : "Meer tonen"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default VoertuigenSidebar;
