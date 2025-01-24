namespace backend.Dtos.Abonnement
{
    public class CreateAbonnementDto
    {
        public string AbonnementType { get; set; }
        public string Betaalmethode { get; set; }
        public DateOnly StartDatum { get; set; }
        public DateOnly EindDatum { get; set; }
        public double Kosten { get; set; }
        public double CustomAmount { get; set; } 
    }
}
