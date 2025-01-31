using backend.Dtos.Voertuig;

namespace backend.Dtos.Voertuigen
{
    public class VoertuigDto
    {
        public int Id { get; set; }
        public string Merk { get; set; }
        public string Type { get; set; }
        public string Kenteken { get; set; }
        public string Kleur { get; set; }
        public int Aanschafjaar { get; set; }
        public bool Status { get; set; }
        public string VoertuigType { get; set; }
        public string Locatie { get; set; }


        public double Prijs {  get; set; }
        public List<ReserveringDto> Reserveringen { get; set; } 
        public string imageUrl { get; set; }
        public int? Trekvermogen { get; set; } 
        public int? Slaapplaatsen { get; set; } 
        public int? AantalDeuren { get; set; } 

    }
}
