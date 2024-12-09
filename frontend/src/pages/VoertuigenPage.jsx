import VoertuigCard from "../components/VoertuigCard";

function VoertuigenPage() {
  return (
    <>
      <select className="ml-12 mt-12 rounded-md p-2 border border-black">
        <option value="auto">Auto</option>
        <option value="camper">Camper</option>
        <option value="caravan">Caravan</option>
      </select>
      <div className="grid grid-cols-3">
        <VoertuigCard />
        <VoertuigCard />
        <VoertuigCard />
        <VoertuigCard />
        <VoertuigCard />
        <VoertuigCard />
        <VoertuigCard />
        <VoertuigCard />
        <VoertuigCard />
        <VoertuigCard />
      </div>
    </>
  );
}

export default VoertuigenPage;
