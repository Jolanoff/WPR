import { MedewerkersPage } from "../../pages/bedrijf/MedewerkersPage";
import ProtectedRoute from "../ProtectedRoute";

const BedrijfMedewerkerBeheerRouter = [
    {
        path: "/bedrijf-medewerkers",
        element: (
            <ProtectedRoute>
                <MedewerkersPage />
            </ProtectedRoute>)
    },
];

export default BedrijfMedewerkerBeheerRouter;
