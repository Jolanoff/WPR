namespace backend.Models.Aanvragen
{
    public class Factuur
    {
        private int Bedrag { get; set; }
        private bool BetaalStatus { get; set; }
        private String BetalingsOptie { get; set; }
    }
}
