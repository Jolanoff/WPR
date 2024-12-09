import autoplaceholder from "./../assets/autoplaceholder.png";

export default function VoertuigCard() {
  return (
    <>
      <div className="p-12">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log("fake gehuurd");
          }}
          className="bg-white p-8 rounded-lg w-full max-w-md shadow-md"
        >
          <img src={autoplaceholder} className="rounded-md mb-4"></img>
          <h1 className="text-4xl font-Alata mb-4">Toyota Corrola</h1>
          <div className="mb-4">
            <p>Kenteken : AB-123-CD</p>
            <p>Kleur: Rood</p>
            <p>Aanschafjaar : 2018</p>
            <p>Prijs : 250,- p/m</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Huren
          </button>
        </form>
      </div>
    </>
  );
}
