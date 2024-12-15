import React, { useState, useEffect } from "react";
import VoertuigCard from "../components/VoertuigCard";
import VoertuigenSidebar from "../components/VoertuigenSideBar.jsx";
import notavailable from "../assets/notavailable.png";
import api from "../api";
import useUserInfo from "../hooks/useUserInfo";

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

    const { userInfo } = useUserInfo();

    const fetchVoertuigen = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post("/Voertuig", {
                startDatum,
                eindDatum,
            });

            console.log(response.data);
            setVoertuigen(response.data);
        } catch (error) {
            setError(error.message || "Error fetching vehicles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVoertuigen();
    }, [startDatum, eindDatum]);

    const filteredVoertuigen = voertuigen.filter((voertuig) => {
        // Type filter
        const typeCondition = userInfo?.roles?.includes("Bedrijf")
            ? voertuig.voertuigType?.toLowerCase() === "auto"
            : typeFilter === "alle" ||
              voertuig.voertuigType?.toLowerCase() === typeFilter;

        // Brand filter
        const brandCondition =
            brandFilter.length === 0 ||
            (voertuig.merk && brandFilter.includes(voertuig.merk));

        return typeCondition && brandCondition;
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const filteredMerken = voertuigen
        .filter(
            (voertuig) =>
                typeFilter === "alle" ||
                voertuig.voertuigType?.toLowerCase() === typeFilter
        )
        .map((voertuig) => voertuig.merk)
        .filter((merk, index, self) => merk && self.indexOf(merk) === index);

    return (
        <div className="flex">
            {(userInfo?.roles?.includes("ParticuliereHuurder") ||
                userInfo?.roles?.includes("Bedrijf")) && (
                <VoertuigenSidebar
                    onTypeFilterChange={setTypeFilter}
                    currentTypeFilter={typeFilter}
                    userRole={userInfo?.roles}
                    startDatum={startDatum}
                    eindDatum={eindDatum}
                    onStartDatumChange={setStartDatum}
                    onEindDatumChange={setEindDatum}
                    merken={filteredMerken}
                    brandFilter={brandFilter}
                    onBrandFilterChange={setBrandFilter}
                />
            )}

            <div className="flex-grow p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredVoertuigen.map((voertuig) => (
                        <VoertuigCard
                            key={voertuig.id}
                            merk={voertuig.merk}
                            type={voertuig.type}
                            kenteken={voertuig.kenteken}
                            kleur={voertuig.kleur}
                            aanschafjaar={voertuig.aanschafjaar}
                            prijs={voertuig.prijs || "Prijs is onbekend"}
                            imageUrl={voertuig.imageUrl || notavailable}
                            status={voertuig.status}
                            reserveringen={voertuig.reserveringen}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HurenPage;
