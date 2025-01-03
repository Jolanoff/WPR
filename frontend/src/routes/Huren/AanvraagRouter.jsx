import AanvraagPage from '../../pages/Huren/AanvraagPage';
import ProtectedRoute from '../ProtectedRoute';
const AanvraagRouter = [
    {
        path: "/aanvraag",
        element: (
            <ProtectedRoute>
                <AanvraagPage />
            </ProtectedRoute>)
    },
];

export default AanvraagRouter;
