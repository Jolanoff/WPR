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
        public List<ReserveringDto> Reserveringen { get; set; } // Voor meerdere reserveringen
        public string imageUrl { get; set; }

    }
}
