import VoertuigenPage from "../pages/VoertuigenPage";
import ProtectedRoute from ".//ProtectedRoute";

const VerifyEmailRoute = [
  {
    path: "/voertuigen",
    element: (
      <ProtectedRoute>
        <VoertuigenPage />,
      </ProtectedRoute>
    ),
  },
];

export default VerifyEmailRoute;
