using backend.Models.Gebruiker;

namespace backend.Models.Klanten
{
    public class ParticuliereHuurder
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }

    }
}
