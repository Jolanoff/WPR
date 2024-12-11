import VoertuigenPage from "../pages/VoertuigenPage";
import ProtectedRoute from ".//ProtectedRoute";

const VerifyEmailRoute = [
  {
    path: "/particulier/huren",
    element: (
      <ProtectedRoute>
        <VoertuigenPage />,
      </ProtectedRoute>
    ),
  },
];

export default VerifyEmailRoute;
