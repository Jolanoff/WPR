
import ProtectedRoute from '../ProtectedRoute';
import VoertuigenBeheerPage from '../../pages/BackOfficeMedewerker/VoertuigenBeheerPage';

const VoertuigenBeheerRouter = [
    {
        path: "/Voertuigen-beheer",
        element: (
            <ProtectedRoute>
                <VoertuigenBeheerPage />
            </ProtectedRoute>)
    },
];

export default VoertuigenBeheerRouter;
