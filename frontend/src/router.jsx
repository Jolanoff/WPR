import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import LoginRouter from "./routes/LoginRouter";
import RegisterRouter from "./routes/RegisterRouter";
import DashboardRouter from "./routes/DashboardRouter";
import VerifyEmailRoute from "./routes/VerifyEmailRoute";
import ProfielRouter from "./routes/ProfielRouter";
import FactuurRouter from "./routes/bedrijf/FactuurRoute";
import AbonnementRouter from "./routes/bedrijf/AbonnementRouter";
import BedrijfMedewerkerBeheerRouter from "./routes/bedrijf/BedrijfMedewerkerBeheerRouter";
import SetPasswordRoute from "./routes/Auth/SetPasswordRoute";
import AdminRoute from "./routes/Admin/AdminRoute";





const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            //admin
            ...AdminRoute,
            //auth
            ...LoginRouter, ...RegisterRouter,...SetPasswordRoute, ...VerifyEmailRoute,
            //Iedereen
            ...DashboardRouter,  ...ProfielRouter,
            //bedrijf
            ...FactuurRouter, ...AbonnementRouter, ...BedrijfMedewerkerBeheerRouter,
        ]
    }
];

const router = createBrowserRouter(routes);
export default router;