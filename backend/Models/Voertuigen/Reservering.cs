namespace backend.Dtos
{
    public class ReserveringDto
    {
        public int Id { get; set; }
        public int VoertuigId { get; set; }  // Verwijzing naar het voertuig
        public DateTime StartDatum { get; set; }
        public DateTime EindDatum { get; set; }
        public VoertuigDto? Voertuig { get; set; }  // Optioneel: Beperkte data van het voertuig
    }
}
