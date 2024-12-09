import React from "react";

export default function VoertuigCard({
  merk,
  type,
  kenteken,
  kleur,
  aanschafjaar,
  prijs,
  imageUrl,
}) {
  return (
    <div className="p-12">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("fake gehuurd");
        }}
        className="bg-white p-8 rounded-lg w-full max-w-md shadow-md"
      >
        <img src={imageUrl} className="rounded-md mb-4" alt="vehicle" />
        <h1 className="text-4xl font-Alata mb-4">
          {merk} {type}
        </h1>
        <div className="mb-8 font-Alata">
          <p>Kenteken : {kenteken}</p>
          <p>Kleur: {kleur}</p>
          <p>Aanschafjaar : {aanschafjaar}</p>
          <p className="mt-8 text-xl font-bold">{prijs}</p>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Huren
        </button>
      </form>
    </div>
  );
}
