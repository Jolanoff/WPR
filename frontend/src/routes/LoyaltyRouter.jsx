
import LoyaltyDashboard from "../pages/LoyaltyDashboard";
import ProtectedRoute from "./ProtectedRoute";

const LoyaltyRouter = [
    {
        path: "/Loyalty",
        element: (
            <ProtectedRoute>
                <LoyaltyDashboard />
            </ProtectedRoute>
        ),
    },
];

export default LoyaltyRouter;
