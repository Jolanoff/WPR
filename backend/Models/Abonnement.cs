namespace backend.Models
{
    public class Abonnement
    {

        private DateOnly StartDatum {  get; set; }

        private DateOnly EindDatum { get; set; }

        private int Kosten { get; set; }

        private Boolean Status { get; set; }

    }
}
