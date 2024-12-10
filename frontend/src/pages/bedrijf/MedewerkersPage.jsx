import React, { useEffect, useState } from "react";
import MedewerkersForm from '../../components/bedrijf/medewerkers/MedewerkersForm'
import { CheckRole } from "../../utils/CheckRole";

export const MedewerkersPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verifyAuthorization = async () => {
        const isAuthorized = await CheckRole(["Bedrijf", "Wagenparkbeheerder"]);
        setIsAuthorized(isAuthorized);
    };
    verifyAuthorization();
}, []);

if (isAuthorized === null) return <div>Bezig met laden...</div>;
if (!isAuthorized) return <div>U bent geen bedrijf.</div>;

  return (
    <div>
        <MedewerkersForm/>
    </div>
  )
}
