
import HuurAanvragenHistoryPage from '../../pages/Huren/HuurAanvragenHistoryPage';
import ProtectedRoute from '../ProtectedRoute';
const HuurAanvragenHistoryRouter = [
    {
        path: "/huren-history",
        element: (
            <ProtectedRoute>
                <HuurAanvragenHistoryPage />
            </ProtectedRoute>)
    },
];

export default HuurAanvragenHistoryRouter;
