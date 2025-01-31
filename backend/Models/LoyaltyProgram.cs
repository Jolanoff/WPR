using backend.Models.Klanten;

namespace backend.Models
{
    public class LoyaltyProgram
    {
        public int Id { get; set; }
        public int KlantId { get; set; }
        public Klant Klant { get; set; }
        public int LoyaltyPoints { get; set; } = 0;
    }
}
