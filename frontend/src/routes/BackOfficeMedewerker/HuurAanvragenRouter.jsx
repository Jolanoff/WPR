import HuurAanvragenPage from '../../pages/BackOfficeMedewerker/HuurAanvragenPage';
import ProtectedRoute from '../ProtectedRoute';


const HuurAanvragenRouter = [
    {
        path: "/Huuraanvragen",
        element: (
            <ProtectedRoute>
                <HuurAanvragenPage />
            </ProtectedRoute>)
    },
];

export default HuurAanvragenRouter;
