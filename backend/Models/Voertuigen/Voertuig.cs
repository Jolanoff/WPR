using backend.Models.Aanvragen;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Voertuigen
{
    public class Voertuig
    {
        [Key]
        public int Id { get; set; }
        public string Merk { get; set; }
        public string Type { get; set; }
        public string Kenteken { get; set; }
        public string Kleur { get; set; }
        public int Aanschafjaar { get; set; }
        public bool Status { get; set; }
        public string VoertuigType { get; set; }
        public string? imageUrl { get; set; }
        public double Prijs { get; set; }
        public bool MarkedForDeletion { get; set; }
        public List<Reservering>? Reserveringen { get; set; }  
        public List<HuurAanvraag>? HuurAanvragen { get; set; } = new List<HuurAanvraag>();


    }
}
