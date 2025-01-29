import React, { useState, useEffect } from "react";
import VoertuigCard from "../components/VoertuigCard";
import VoertuigenSidebar from "../components/VoertuigenSideBar.jsx";
import notavailable from "../assets/notavailable.png";
import api from "../api";

function HurenPage() {
    function getLocalDateString() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const [voertuigen, setVoertuigen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [startDatum, setStartDatum] = useState(getLocalDateString);
    const [eindDatum, setEindDatum] = useState(getLocalDateString);

    const [typeFilter, setTypeFilter] = useState("alle");
    const [brandFilter, setBrandFilter] = useState([]);
    const [trekvermogenFilter, setTrekvermogenFilter] = useState("");
    const [aantalDeurenFilter, setAantalDeurenFilter] = useState("");
    const [slaapplaatsenFilter, setSlaapplaatsenFilter] = useState("");

    const fetchVoertuigen = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post("/Voertuig", {
                startDatum,
                eindDatum,
            });

            setVoertuigen(response.data);
        } catch (error) {
            setError(error.message || "Fout bij het ophalen van voertuigen");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVoertuigen();
    }, [startDatum, eindDatum]);

    const filteredVoertuigen = voertuigen.filter((voertuig) => {
        // Type filter
        const typeCondition =
            typeFilter === "alle" ||
            voertuig.voertuigType?.toLowerCase() === typeFilter;

        // Brand filter
        const brandCondition =
            brandFilter.length === 0 ||
            (voertuig.merk && brandFilter.includes(voertuig.merk));

        // Specific attribute filters
        const trekvermogenCondition =
            trekvermogenFilter === "" ||
            voertuig.trekvermogen >= Number(trekvermogenFilter);

        const aantalDeurenCondition =
            aantalDeurenFilter === "" ||
            voertuig.aantalDeuren === Number(aantalDeurenFilter);

        const slaapplaatsenCondition =
            slaapplaatsenFilter === "" ||
            voertuig.slaapplaatsen >= Number(slaapplaatsenFilter);

        return (
            typeCondition &&
            brandCondition &&
            trekvermogenCondition &&
            aantalDeurenCondition &&
            slaapplaatsenCondition
        );
    });

    if (loading) return <div>Aan het laden...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex">
            <VoertuigenSidebar
                onTypeFilterChange={setTypeFilter}
                currentTypeFilter={typeFilter}
                startDatum={startDatum}
                eindDatum={eindDatum}
                onStartDatumChange={setStartDatum}
                onEindDatumChange={setEindDatum}
                merken={voertuigen.map((v) => v.merk)}
                brandFilter={brandFilter}
                onBrandFilterChange={setBrandFilter}
                setTrekvermogenFilter={setTrekvermogenFilter}
                setAantalDeurenFilter={setAantalDeurenFilter}
                setSlaapplaatsenFilter={setSlaapplaatsenFilter}
            />

            <div className="flex-grow p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredVoertuigen.map((voertuig) => (
                        <VoertuigCard
                            key={voertuig.id}
                            voertuigId={voertuig.id}
                            merk={voertuig.merk}
                            type={voertuig.type}
                            kenteken={voertuig.kenteken}
                            kleur={voertuig.kleur}
                            aanschafjaar={voertuig.aanschafjaar}
                            prijs={voertuig.prijs.toFixed(2)}
                            voertuigType={voertuig.voertuigType}
                            trekvermogen={voertuig.trekvermogen}
                            aantalDeuren={voertuig.aantalDeuren}
                            slaapplaatsen={voertuig.slaapplaatsen}
                            imageUrl={voertuig.imageUrl || notavailable}
                            status={voertuig.status}
                            reserveringen={voertuig.reserveringen}
                            startDatum={startDatum}
                            eindDatum={eindDatum}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HurenPage;
