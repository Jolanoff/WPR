namespace backend.Dtos.Voertuigen
{
    public class CreateVoertuigDto
    {
        public string Merk { get; set; }
        public string Type { get; set; }
        public string Kenteken { get; set; }
        public string Kleur { get; set; }
        public int Aanschafjaar { get; set; }
        public bool Status { get; set; }
        public string VoertuigType { get; set; }
        public string? ImageUrl { get; set; }
        public double Prijs { get; set; }
    }

    public class UpdateVoertuigDto : CreateVoertuigDto
    {
        public int Id { get; set; }
    }
}
