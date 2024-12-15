import AdminPage from '../../pages/Admin/AdminPage';
import ProtectedRoute from '../ProtectedRoute'


const AdminRoute = [
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminPage />
            </ProtectedRoute>)
    },
];

export default AdminRoute;
