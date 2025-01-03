import React from "react";

function RequestPeriod({ startDatum, eindDatum }) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700">Aanvraagperiode</h3>
            <p className="text-gray-600">
                <span className="font-medium">Startdatum:</span> {startDatum}
            </p>
            <p className="text-gray-600">
                <span className="font-medium">Einddatum:</span> {eindDatum}
            </p>
        </div>
    );
}

export default RequestPeriod;
