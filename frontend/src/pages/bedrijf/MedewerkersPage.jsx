import React, { useState, useEffect } from "react";
import MedewerkersForm from "../../components/bedrijf/medewerkers/MedewerkersForm";
import { CheckRole } from '../../utils/CheckRole'
import { MedewerkersList } from "../../components/bedrijf/medewerkers/MedewerkersList";

export const MedewerkersPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const allowedRoles = ["Bedrijf", "Wagenparkbeheerder"];
        const roles = await CheckRole(allowedRoles);

        if (roles) {
          setUserRole(roles);
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Error checking roles:", error);
      }
    };

    fetchUserRole();
  }, []);

  if (!isAuthorized) return <div>U bent niet bevoegd om deze pagina te bekijken.</div>;

  return (
    <div>
      <MedewerkersForm userRole={userRole} />
      <MedewerkersList/>
    </div>
  );
};
