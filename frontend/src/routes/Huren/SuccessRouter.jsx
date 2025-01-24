import SuccessPage from '../../pages/Huren/SuccessPage';
import ProtectedRoute from '../ProtectedRoute';
const SuccessRouter = [
    {
        path: "/success",
        element: (
            <ProtectedRoute>
                <SuccessPage />
            </ProtectedRoute>)
    },
];

export default SuccessRouter;
