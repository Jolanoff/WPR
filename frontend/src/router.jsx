import { createBrowserRouter } from "react-router-dom";
import LoginRouter from "./routes/LoginRouter";
import App from "./App";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            ...LoginRouter,
        ]
    }
];

const router = createBrowserRouter(routes);
export default router;