import ManageBlog from "../pages/ManageBlogPage";
import ProtectedRoute from "./ProtectedRoute";

const ManageBlogRouter = [
    {
        path: "/Manage-blog",
        element: (
            <ProtectedRoute>
                <ManageBlog />
            </ProtectedRoute>
        ),
    },
];

export default ManageBlogRouter;
