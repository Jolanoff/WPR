import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute'
const DashboardRouter = [
    {
        path: "/Dashboard",
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>)
    },
];

export default DashboardRouter;
