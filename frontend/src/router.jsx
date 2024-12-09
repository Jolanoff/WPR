import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import LoginRouter from "./routes/LoginRouter";
import RegisterRouter from "./routes/RegisterRouter";
import DashboardRouter from "./routes/DashboardRouter";
import VerifyEmailRoute from "./routes/VerifyEmailRoute";
import ProfielRouter from "./routes/ProfielRouter";
import FactuurRouter from "./routes/FactuurRoute";
import AbonnementRouter from "./routes/AbonnementRouter";
import VoertuigenRouter from "./routes/VoertuigenRoute";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      ...LoginRouter,
      ...RegisterRouter,
      ...DashboardRouter,
      ...VerifyEmailRoute,
      ...ProfielRouter,
      ...FactuurRouter,
      ...AbonnementRouter,
      ...VoertuigenRouter,
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
