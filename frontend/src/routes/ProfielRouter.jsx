import ProfielPage from '../pages/ProfielPage';
import ProtectedRoute from './ProtectedRoute'

const ProfielRouter = [
    {
        path: "/profiel",
        element: (
            <ProtectedRoute>
                <ProfielPage />
            </ProtectedRoute>)
    },
];

export default ProfielRouter;
