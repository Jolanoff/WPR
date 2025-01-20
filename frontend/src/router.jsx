import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import LoginRouter from "./routes/LoginRouter";
import RegisterRouter from "./routes/RegisterRouter";
import DashboardRouter from "./routes/DashboardRouter";
import VerifyEmailRoute from "./routes/VerifyEmailRoute";
import ProfielRouter from "./routes/ProfielRouter";

import UitgifteRouter from "./routes/UitgifteRouter";
import InnameRouter from "./routes/InnameRouter";

import FactuurRouter from "./routes/bedrijf/FactuurRoute";
import AbonnementRouter from "./routes/bedrijf/AbonnementRouter";
import BedrijfMedewerkerBeheerRouter from "./routes/bedrijf/BedrijfMedewerkerBeheerRouter";
import SetPasswordRoute from "./routes/Auth/SetPasswordRoute";
import AdminRoute from "./routes/Admin/AdminRoute";
import SchademeldingenRouter from "./routes/SchademeldingenRouter";
import HurenRoute from "./routes/HurenRoute";
import AanvraagRouter from "./routes/Huren/AanvraagRouter";
import HomeRouter from "./routes/HomeRouter";
import HuurAanvragenRouter from "./routes/BackOfficeMedewerker/HuurAanvragenRouter";
import HuurAanvragenHistoryRouter from "./routes/Huren/HuurAanvragenHistoryRouter";
import SuccessRouter from "./routes/Huren/SuccessRouter";
import VoertuigenBeheerRouter from "./routes/BackOfficeMedewerker/VoertuigenBeheerRouter";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [

            //admin
            ...AdminRoute,
            //auth
            ...LoginRouter,
            ...RegisterRouter,
            ...SetPasswordRoute,
            ...VerifyEmailRoute,
            //Iedereen
            ...HomeRouter,
            ...DashboardRouter,
            ...ProfielRouter,
            ...SchademeldingenRouter,
            //bedrijf
            ...FactuurRouter,
            ...AbonnementRouter,
            ...BedrijfMedewerkerBeheerRouter,
            //huren
            ...AanvraagRouter,
            ...HurenRoute,
            ...HuurAanvragenHistoryRouter,
            ...SuccessRouter,

            //BackofficeMedewerker
            ...HuurAanvragenRouter,
            ...UitgifteRouter,
            ...InnameRouter,
            ...VoertuigenBeheerRouter

        ],
    },
];

const router = createBrowserRouter(routes);
export default router;
