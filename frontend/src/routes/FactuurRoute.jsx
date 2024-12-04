// routes/FactuurRouter.js
import React from 'react';
import FactuurPage from "../pages/FactuurPage";
import FactuurForm from "../components/factuur/FactuurForm"; // Import the invoice detail page

const FactuurRouter = [
    {
        path: "/factuur",
        element: <FactuurPage />
    },
    {
        path: "/factuur/:id",  // Dynamic route for each invoice
        element: <FactuurForm />  // Invoice details page
    }
];

export default FactuurRouter;
