namespace backend.Dtos.HuurAanvraag
{
    public class HuurAanvraagDto
    {
        public int Id { get; set; }
        public DateTime StartDatum { get; set; }
        public DateTime EindDatum { get; set; }
        public bool Status { get; set; }
        public string AardVanReis { get; set; }
        public int VerwachteKilometers { get; set; }
        public string KlantNaam { get; set; }
        public string VoertuigNaam { get; set; }

        public string ApprovalStatus { get; set; }
    }

}
