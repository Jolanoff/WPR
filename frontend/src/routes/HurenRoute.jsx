import HurenPage from "../pages/HurenPage";
import ProtectedRoute from "./ProtectedRoute";

const HurenRoute = [
    {
        path: "/huren",
        element: (
            <ProtectedRoute>
                <HurenPage />,
            </ProtectedRoute>
        ),
    },
];

export default HurenRoute;
