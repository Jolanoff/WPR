namespace backend.Models.Voertuigen
{
    public class Reservering
    {
        public int Id { get; set; }
        public int VoertuigId { get; set; }  // Foreign key naar Voertuig
        public DateTime StartDatum { get; set; }
        public DateTime EindDatum { get; set; }
        public Voertuig Voertuig { get; set; }  // Navigatie eigenschap naar Voertuig
    }

}
