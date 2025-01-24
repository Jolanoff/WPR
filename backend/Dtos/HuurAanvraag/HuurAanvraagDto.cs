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
        public string ApprovalStatus { get; set; }
        public string? RejectionReason { get; set; }

        public string Kenteken { get; set; }


        public string KlantNaam { get; set; }


        // Voertuig Details
        public int VoertuigId { get; set; }
        public string VoertuigNaam { get; set; }
        public string VoertuigType { get; set; }
        public double VoertuigPrijs { get; set; }
    }


}
