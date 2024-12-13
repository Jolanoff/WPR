import React, { useState, useEffect } from "react";
import VoertuigCard from "../components/VoertuigCard";
import VoertuigenSidebar from "../components/VoertuigenSidebar";
import autoplaceholder from "./../assets/autoplaceholder.png";
import camperplaceholder from "./../assets/camperplaceholder.png";
import caravanplaceholder from "./../assets/caravanplaceholder.png";
import api from "../api";
import useUserInfo from "../hooks/useUserInfo";

function HurenPage() {
    function getLocalDateString() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Maand is 0-indexed
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const [voertuigen, setVoertuigen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [startDatum, setStartDatum] = useState(getLocalDateString);
    const [eindDatum, setEindDatum] = useState(getLocalDateString);

    const [typeFilter, setTypeFilter] = useState("alle");
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

    const getPlaceholder = (voertuigType) => {
        switch (voertuigType?.toLowerCase()) {
            case "camper":
                return camperplaceholder;
            case "caravan":
                return caravanplaceholder;
            default:
                return autoplaceholder;
        }
    };

    const filteredVoertuigen = voertuigen.filter((voertuig) => {
        if (userInfo?.roles?.includes("Bedrijf")) {
            return voertuig.voertuigType?.toLowerCase() === "auto";
        }

        if (userInfo?.roles?.includes("ParticuliereHuurder")) {
            return (
                typeFilter === "alle" ||
                voertuig.voertuigType?.toLowerCase() === typeFilter
            );
        }

        return true;
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
                            imageUrl={
                                voertuig.imageUrl ||
                                getPlaceholder(voertuig.voertuigType)
                            }
                            status={voertuig.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HurenPage;
