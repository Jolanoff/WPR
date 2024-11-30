import { createBrowserRouter } from "react-router-dom";
import LoginRouter from "./routes/LoginRouter";
import RegisterRouter from "./routes/RegisterRouter";
import DashboardRouter from "./routes/DashboardRouter";
import App from "./App";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            ...LoginRouter, ...RegisterRouter, ...DashboardRouter
        ]
    }
];

const router = createBrowserRouter(routes);
export default router;