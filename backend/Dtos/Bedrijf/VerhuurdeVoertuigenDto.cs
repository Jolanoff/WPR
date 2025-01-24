namespace backend.Dtos.Bedrijf
{
    public class VerhuurdeVoertuigenDto
    {
        public string VoertuigMerk { get; set; }
        public string VoertuigType { get; set; }
        public string Kenteken { get; set; }
        public DateTime StartDatum { get; set; }
        public DateTime EindDatum { get; set; }
        public string HuurderNaam { get; set; }
        public string Status { get; set; }
    }
}
