import BlogPage from "../pages/BlogPage";
import ProtectedRoute from "./ProtectedRoute";

const BlogRouter = [
    {
        path: "/Blog",
        element: (
            <ProtectedRoute>
                <BlogPage />
            </ProtectedRoute>
        ),
    },
];

export default BlogRouter;
