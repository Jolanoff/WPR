import React from "react";

function VoertuigenSidebar({ onFilterChange, currentFilter, userRole }) {
    const isParticularUser = userRole?.includes("ParticuliereHuurder");
    const isBedrijfUser = userRole?.includes("Bedrijf");

    return (
        <div className="w-64 p-4 bg-gray-100 border-r">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div>
                <h3 className="font-semibold mb-2">Beschikbaarheid</h3>
                <h4>Start datum</h4>
                <input
                    type="date"
                    id="date-picker"
                    value={null}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className=" w-full rounded-md p-2 border border-black mb-4"
                />
                <h4>Eind datum</h4>
                <input
                    type="date"
                    id="date-picker"
                    value={null}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className=" w-full rounded-md p-2 border border-black mb-4"
                />
                <h3 className="font-semibold mb-2">Voertuig Type</h3>
                <select
                    className={`w-full rounded-md p-2 border border-black mb-4 ${
                        isBedrijfUser
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : ""
                    }`}
                    value={isBedrijfUser ? "auto" : currentFilter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    disabled={isBedrijfUser}
                >
                    {isParticularUser && (
                        <>
                            <option value="alle">Alle</option>
                            <option value="auto">Auto</option>
                            <option value="camper">Camper</option>
                            <option value="caravan">Caravan</option>
                        </>
                    )}

                    {isBedrijfUser && <option value="auto">Auto</option>}
                </select>
                <h3 className="font-semibold mb-2">Prijs</h3>
                <select
                    className={`w-full rounded-md p-2 border border-black mb-4`}
                    value={null}
                    onChange={null}
                >
                    <option value="prijsoplopend">-</option>
                    <option value="prijsoplopend">Prijs oplopend</option>
                    <option value="prijsaflopend">Prijs aflopend</option>
                </select>

                {
                    // MOET BASED ON AUTO MERK
                }
                <h3 className="font-semibold mb-2">Merk</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            value="adria"
                            onChange={null}
                            className="h-4 w-4"
                        />
                        <span>Adria</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            value="audi"
                            onChange={null}
                            className="h-4 w-4"
                        />
                        <span>Audi</span>
                    </label>
                </div>
                <a className="text-blue-500">Laat meer zien</a>

                {/* <h3 className="font-semibold mb-2">Merk</h3> */}
                {/* <select
                    className={`w-full rounded-md p-2 border border-black mb-4`}
                    value={null}
                    onChange={null}
                >
                    <option value="alle">Alle</option>
                    <option value="adria">Adria</option>
                    <option value="audi">Audi</option>
                    <option value="bmw">BMW</option>
                    <option value="bailey">Bailey</option>
                    <option value="toyota">Buccaneer</option>
                    <option value="toyota">Burstner</option>
                    <option value="toyota">Caravelair</option>
                    <option value="toyota">Citroën</option>
                    <option value="toyota">Coachman</option>
                    <option value="toyota">Compass</option>
                    <option value="toyota">Dethleffs</option>
                    <option value="toyota">Eldiss</option>
                    <option value="toyota">Eriba</option>
                    <option value="toyota">Fendt</option>
                    <option value="toyota">Fiat</option>
                    <option value="toyota">Ford</option>
                    <option value="toyota">Hobby</option>
                    <option value="toyota">Honda</option>
                    <option value="toyota">Hyundai</option>
                    <option value="toyota">Iveco</option>
                    <option value="toyota">Jeep</option>
                    <option value="toyota">Kia</option>
                    <option value="toyota">LMC</option>
                    <option value="toyota">Land Rover</option>
                    <option value="toyota">Lunar</option>
                    <option value="toyota">Mazda</option>
                    <option value="toyota">Mercedes</option>
                    <option value="toyota">Mitsubishi</option>
                    <option value="toyota">Nissan</option>
                    <option value="toyota">Opel</option>
                    <option value="toyota">Peugeot</option>
                    <option value="toyota">Renault</option>
                    <option value="toyota">Skoda</option>
                    <option value="toyota">Sprite</option>
                    <option value="toyota">Sterckeman</option>
                    <option value="toyota">Suzuki</option>
                    <option value="toyota">SwiŌ</option>
                    <option value="toyota">Tab</option>
                    <option value="toyota">Tabbert</option>
                    <option value="toyota">Toyota</option>
                    <option value="toyota">Volkswagen</option>
                    <option value="toyota">Volvo</option>

                    {isBedrijfUser && <option value="auto">Auto</option>}
                </select> */}
            </div>
        </div>
    );
}

export default VoertuigenSidebar;
