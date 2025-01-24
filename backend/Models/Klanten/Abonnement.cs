using backend.Models.Klanten.Bedrijven;

namespace backend.Models.Klanten
{
    public class Abonnement
    {
        public int Id { get; set; }

        public int BedrijfId { get; set; } 
        public Bedrijf Bedrijf { get; set; } 

        public string AbonnementType { get; set; } 

        public string Betaalmethode { get; set; } 

        public DateOnly StartDatum { get; set; }

        public DateOnly EindDatum { get; set; }


        public DateOnly? StopDatum { get; set; }
        public double Kosten { get; set; }
        public double OrigineelBedrag { get; set; }

        public bool Status { get; set; } 
    }
}
