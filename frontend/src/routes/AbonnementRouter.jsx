import AbonnementPage from '../pages/AbonnementPage';
import ProtectedRoute from './ProtectedRoute'


const AbonnementRouter = [
    {
        path: "/abonnementen",
        element: (
            <ProtectedRoute>
                <AbonnementPage />
            </ProtectedRoute>)
    },
];

export default AbonnementRouter;
