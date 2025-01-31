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
    brandFilter,
    onBrandFilterChange,
    setTrekvermogenFilter,
    setAantalDeurenFilter,
    setSlaapplaatsenFilter,
    voertuigen, 
    setLocatieFilter, 
}) {
    const [startDatum, setStartDatum] = useState(parentStartDatum);
    const [eindDatum, setEindDatum] = useState(parentEindDatum);
    const [errorMessage, setErrorMessage] = useState("");
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [allowedOptions, setAllowedOptions] = useState([]);
    const [locatieFilter, setLocalLocatieFilter] = useState("");

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
        const newBrandFilter = brandFilter.includes(merk)
            ? brandFilter.filter((m) => m !== merk)
            : [...brandFilter, merk];
        onBrandFilterChange(newBrandFilter);
    };

    const clearAllBrands = () => {
        onBrandFilterChange([]);
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

    const displayedMerken = showAllBrands ? merken : merken.slice(0, 12);

   
    const uniekeLocaties = [
        ...new Set(voertuigen.map((voertuig) => voertuig.locatie).filter(Boolean)),
    ];

    const handleLocatieChange = (e) => {
        const selectedLocatie = e.target.value;
        setLocalLocatieFilter(selectedLocatie);
        setLocatieFilter(selectedLocatie); // Update parent component
    };

    return (
        <div className="w-64 p-4 bg-gray-100 border-r">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div>
                <h3 className="font-semibold mb-2">Beschikbaarheid</h3>
                <h4>Start datum</h4>
                <input
                    type="date"
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

                <h3 className="font-semibold mb-2">Locatie</h3>
                <select
                    className="w-full rounded-md p-2 border border-black mb-4"
                    value={locatieFilter}
                    onChange={handleLocatieChange}
                >
                    <option value="">Alle Locaties</option>
                    {uniekeLocaties.map((locatie) => (
                        <option key={locatie} value={locatie}>
                            {locatie}
                        </option>
                    ))}
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
                                checked={brandFilter.includes(merk)}
                                onChange={() => toggleMerk(merk)}
                                className="mr-2 w-4 h-4"
                            />
                            <label className="text-sm flex-grow overflow-hidden whitespace-nowrap overflow-ellipsis">
                                {merk}
                            </label>
                        </div>
                    ))}
                </div>

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
