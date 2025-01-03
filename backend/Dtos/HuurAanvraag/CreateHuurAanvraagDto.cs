
public class CreateHuurAanvraagDto
{
    public DateTime StartDatum { get; set; }
    public DateTime EindDatum { get; set; }
    public bool Status { get; set; } = false;
    public string AardVanReis { get; set; }
    public int VerwachteKilometers { get; set; }
    public int VoertuigId { get; set; }
}
