import VoertuigCard from "../components/VoertuigCard";
import autoplaceholder from "./../assets/autoplaceholder.png";

function VoertuigenPage() {
  return (
    <>
      <select className="ml-12 mt-12 rounded-md p-2 border border-black">
        <option value="auto">Auto</option>
        <option value="camper">Camper</option>
        <option value="caravan">Caravan</option>
      </select>
      <div className="grid grid-cols-3">
        <VoertuigCard
          merk="Toyota"
          type="Corolla"
          kenteken="AB-123-CD"
          kleur="Rood"
          aanschafjaar={2018}
          prijs="250,-"
          imageUrl={autoplaceholder}
        />
        <VoertuigCard
          merk="Toyota"
          type="Corolla"
          kenteken="AB-123-CD"
          kleur="Rood"
          aanschafjaar={2018}
          prijs="250,-"
          imageUrl={autoplaceholder}
        />
        <VoertuigCard
          merk="Toyota"
          type="Corolla"
          kenteken="AB-123-CD"
          kleur="Rood"
          aanschafjaar={2018}
          prijs="250,-"
          imageUrl={autoplaceholder}
        />
        <VoertuigCard
          merk="Toyota"
          type="Corolla"
          kenteken="AB-123-CD"
          kleur="Rood"
          aanschafjaar={2018}
          prijs="250,-"
          imageUrl={autoplaceholder}
        />
        <VoertuigCard
          merk="Toyota"
          type="Corolla"
          kenteken="AB-123-CD"
          kleur="Rood"
          aanschafjaar={2018}
          prijs="250,-"
          imageUrl={autoplaceholder}
        />
      </div>
    </>
  );
}

export default VoertuigenPage;
