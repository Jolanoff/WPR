import React, { useState, useEffect } from "react";
import MedewerkersForm from "../../components/bedrijf/medewerkers/MedewerkersForm";
import { CheckRole } from '../../utils/CheckRole'
import { MedewerkersList } from "../../components/bedrijf/medewerkers/MedewerkersList";
import UseAuthorization from "../../utils/UseAuthorization";

export const MedewerkersPage = () => {
  
  const { isAuthorized, userRoles } = UseAuthorization(["Bedrijf", "Wagenparkbeheerder"]);

  if (!isAuthorized) return <div>U bent niet bevoegd om deze pagina te bekijken.</div>;

  return (
    <div>
      <MedewerkersForm userRole={userRoles} />
      <MedewerkersList />
    </div>
  );
};
