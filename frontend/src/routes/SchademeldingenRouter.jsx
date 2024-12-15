import SchademeldingenPage from "../pages/SchademeldingenPage";
import ProtectedRoute from "./ProtectedRoute";
const SchademeldingenRouter = [
    {
        path: "/schade",
        element: (
            <ProtectedRoute>
                <SchademeldingenPage />
            </ProtectedRoute>
        )
    },
];

export default SchademeldingenRouter;
