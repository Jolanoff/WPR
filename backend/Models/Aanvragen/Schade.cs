using backend.Models.Voertuigen;

using backend.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Aanvragen
{
public class Schade
{
[Required(ErrorMessage = "Beschrijving is verplicht.")]
[MinimumWoordenAttribuut(5, ErrorMessage = "Beschrijving moet minstens 5 woorden hebben.")]
public string Beschrijving { get; set; }

    [Required(ErrorMessage = "Datum is verplicht.")]
    public DateTime Datum { get; set; }

    [Required(ErrorMessage = "Status is verplicht.")]
    public string Status { get; set; }

    public string[] Fotos { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Reparatiekosten moeten positief zijn.")]
    public int ReparatieKosten { get; set; }

    public HuurAanvraag HuurAanvraag { get; set; }

    public Voertuig Voertuig { get; set; }
}
}