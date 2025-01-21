import VerhuurdeVoertuigenPage from "../../pages/bedrijf/VerhuurdeVoertuigenPage";
import ProtectedRoute from "../ProtectedRoute";

const VerhuurdeVoertuigenRouter = [
    {
        path: "/bedrijf/huuraanvragen",
        element: (
            <ProtectedRoute>
                <VerhuurdeVoertuigenPage />
            </ProtectedRoute>)
    },
];

export default VerhuurdeVoertuigenRouter;
