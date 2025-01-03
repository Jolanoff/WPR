namespace backend.Dtos.Schade
{
    public class SchadeDto
    {
        public int Id { get; set; }
        public string? Beschrijving { get; set; }
        public string? Locatie { get; set; }
        public DateTime Datum { get; set; }
        public string Status { get; set; } 
        public int HuurAanvraagId { get; set; }
        public string Merk { get; set; }
        public string Type { get; set; }

        public string Kentenken { get; set; }


        public int? VoertuigId { get; set; } 
        public int? KlantId { get; set; } 
    }
}
