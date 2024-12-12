import React, { useState, useEffect } from "react";
import VoertuigCard from "../components/VoertuigCard";
import VoertuigenSidebar from "../components/VoertuigenSidebar";
import autoplaceholder from "./../assets/autoplaceholder.png";
import camperplaceholder from "./../assets/camperplaceholder.png";
import caravanplaceholder from "./../assets/caravanplaceholder.png";
import api from "../api";
import useUserInfo from "../hooks/useUserInfo";

function VoertuigenPage() {
    const [voertuigen, setVoertuigen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [typeFilter, setTypeFilter] = useState("alle");
    const { userInfo } = useUserInfo();

    useEffect(() => {
        const fetchVoertuigen = async () => {
            try {
                const today = new Date().toISOString().split("T")[0];
                console.log(today);
                const response = await api.post("/Voertuig", {
                    checkStartDatum: today,
                    checkEindDatum: today,
                });

                console.log(response.data);
                setVoertuigen(response.data);
            } catch (error) {
                setError(error.message || "Error fetching vehicles");
            } finally {
                setLoading(false);
            }
        };

        fetchVoertuigen();
    }, []);

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
                            imageUrl={getPlaceholder(voertuig.voertuigType)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VoertuigenPage;
