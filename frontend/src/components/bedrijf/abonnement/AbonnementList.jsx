const AbonnementList = ({ abonnementen, handleCancel }) => {
    return (
        <ul className="bg-white p-4 shadow rounded">
            {abonnementen.map((abonnement) => {
                const vandaag = new Date();
                const startDatum = new Date(abonnement.startDatum);
                const eindDatum = new Date(abonnement.eindDatum);
                const stopDatum = abonnement.stopDatum ? new Date(abonnement.stopDatum) : null;

                let statusLabel = "";

                if (stopDatum) {
                    if (stopDatum < startDatum) {
                        statusLabel = "Geannuleerd";
                    } else if (vandaag >= startDatum && vandaag <= eindDatum) {
                        statusLabel = `Uw abonnement wordt stopgezet op: ${eindDatum.toLocaleDateString()}`;
                    }
                } else {
                    if (vandaag < startDatum) {
                        statusLabel = `Uw abonnement begint: ${startDatum.toLocaleDateString()}`;
                    } else if (vandaag <= eindDatum) {
                        statusLabel = "Actief";
                    } else {
                        statusLabel = "Verlopen";
                    }
                }

                return (
                    <li key={abonnement.id} className="mb-2 border-b pb-2">
                        <p><strong>Type:</strong> {abonnement.abonnementType}</p>
                        <p><strong>Startdatum:</strong> {abonnement.startDatum}</p>
                        <p><strong>Einddatum:</strong> {abonnement.eindDatum}</p>
                        {abonnement.stopDatum && <p><strong>Stopdatum:</strong> {abonnement.stopDatum}</p>}
                        <p><strong>Kosten:</strong> €{abonnement.kosten}</p>
                        <p><strong>Status:</strong> {statusLabel}</p>

                        {abonnement.status && !stopDatum && (
                            <button
                                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                                onClick={() => handleCancel(abonnement.id)}
                            >
                                Annuleren
                            </button>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default AbonnementList;
