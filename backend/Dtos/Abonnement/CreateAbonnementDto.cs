namespace backend.Dtos.Abonnement
{
    public class CreateAbonnementDto
    {

        public string AbonnementType { get; set; }
        public string Betaalmethode { get; set; }
        public DateOnly StartDatum { get; set; }
        public DateOnly EindDatum { get; set; }

        public int Kosten { get; set; }
    }
}
