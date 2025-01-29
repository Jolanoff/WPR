import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";

function VoertuigenSidebar({
    onTypeFilterChange,
    currentTypeFilter,
    startDatum: parentStartDatum,
    eindDatum: parentEindDatum,
    onStartDatumChange,
    onEindDatumChange,
    merken = [],
    merkFilter,
    onMerkFilterChange,
    setTrekvermogenFilter,
    setAantalDeurenFilter,
    setSlaapplaatsenFilter
}) {
    const [startDatum, setStartDatum] = useState(parentStartDatum);
    const [eindDatum, setEindDatum] = useState(parentEindDatum);
    const [errorMessage, setErrorMessage] = useState("");
    const [toonAlleMerken, setToonAlleMerken] = useState(false);
    const [allowedOptions, setAllowedOptions] = useState([]);
    const { userRoles, fetchUserInfo, loading } = useAuthStore();

    useEffect(() => {
        const loadRoles = async () => {
            if (!userRoles) {
                await fetchUserInfo();
            }
        };
        loadRoles();
    }, [userRoles, fetchUserInfo]);

    useEffect(() => {
        const restrictedRoles = ["Bedrijf", "ZakelijkeHuurder", "WagenparkBeheerder"];
        if (userRoles && userRoles.some((role) => restrictedRoles.includes(role))) {
            setAllowedOptions([{ value: "auto", label: "Auto" }]);
        } else {
            setAllowedOptions([
                { value: "alle", label: "Alle" },
                { value: "auto", label: "Auto" },
                { value: "camper", label: "Camper" },
                { value: "caravan", label: "Caravan" },
            ]);
        }
    }, [userRoles]);

    const toggleMerk = (merk) => {
        const newMerkFilter = merkFilter.includes(merk)
            ? merkFilter.filter((m) => m !== merk)
            : [...merkFilter, merk];
        onMerkFilterChange(newMerkFilter);
    };

    const clearAllBrands = () => {
        onMerkFilterChange([]);
    };

    const handleStartDatumChange = (newStartDatum) => {
        setStartDatum(newStartDatum);
        onStartDatumChange(newStartDatum);
    };

    const handleEindDatumChange = (newEindDatum) => {
        setEindDatum(newEindDatum);
        onEindDatumChange(newEindDatum);
    };

    useEffect(() => {
        if (startDatum && eindDatum) {
            if (new Date(eindDatum) < new Date(startDatum)) {
                setErrorMessage("Einddatum mag niet eerder zijn dan startdatum.");
            } else {
                setErrorMessage("");
            }
        }
    }, [startDatum, eindDatum]);

    const displayedMerken = ToonAlleMerken ? merken : merken.slice(0, 12);

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
                {errorMessage && (
                    <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
                )}
                <h4>Eind datum</h4>
                <input
                    type="date"
                    id="end-date-picker"
                    value={eindDatum}
                    onChange={(e) => handleEindDatumChange(e.target.value)}
                    className="w-full rounded-md p-2 border border-black mb-4"
                />

                <h3 className="font-semibold mb-2">Voertuig Type</h3>
                <select
                    className="w-full rounded-md p-2 border border-black mb-4"
                    value={currentTypeFilter}
                    onChange={(e) => onTypeFilterChange(e.target.value)}
                >
                    {allowedOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <h3 className="font-semibold mb-2 flex justify-between items-center">
                    Merken
                    {merkFilter.length > 0 && (
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
                                checked={merkFilter.includes(merk)}
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
                        onClick={() => setToonAlleMerken(!toonAlleMerken)}
                        className="w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {toonAlleMerken ? "Minder tonen" : "Meer tonen"}
                    </button>
                )}

                <h3 className="font-semibold mb-2 mt-4">Trekvermogen (kg)</h3>
                <input
                    type="number"
                    placeholder="Min. Trekvermogen"
                    onChange={(e) => setTrekvermogenFilter(e.target.value)}
                    className="w-full rounded-md p-2 border border-black mb-4"
                />

                <h3 className="font-semibold mb-2">Aantal Deuren</h3>
                <input
                    type="number"
                    placeholder="Aantal Deuren"
                    onChange={(e) => setAantalDeurenFilter(e.target.value)}
                    className="w-full rounded-md p-2 border border-black mb-4"
                />

                <h3 className="font-semibold mb-2">Slaapplaatsen</h3>
                <input
                    type="number"
                    placeholder="Min. Slaapplaatsen"
                    onChange={(e) => setSlaapplaatsenFilter(e.target.value)}
                    className="w-full rounded-md p-2 border border-black mb-4"
                />

                <h3 className="font-semibold mb-2 mt-4">Prijs</h3>
                <select
                    className="w-full rounded-md p-2 border border-black mb-4 bg-gray-200 cursor-not-allowed"
                    value="alle"
                    disabled
                >
                    <option value="alle">Geen prijzen bekend</option>
                </select>
            </div>
        </div>
    );
}

export default VoertuigenSidebar;
