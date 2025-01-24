import PrivacyverklaringBewerkPage from '../pages/PrivacyverklaringBewerkPage';
import ProtectedRoute from './ProtectedRoute';

const PrivacyverklaringBewerkRouter = [
    {
        path: "/privacyverklaringBewerk",
        element: (
            <ProtectedRoute>
                <PrivacyverklaringBewerkPage />
            </ProtectedRoute>
        ),
    },
];
export default PrivacyverklaringBewerkRouter;