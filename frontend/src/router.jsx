import { createBrowserRouter } from "react-router-dom";
import LoginRouter from "./routes/LoginRouter";
import RegisterRouter from "./routes/RegisterRouter";
import App from "./App";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            ...LoginRouter, ...RegisterRouter
        ]
    }
];

const router = createBrowserRouter(routes);
export default router;