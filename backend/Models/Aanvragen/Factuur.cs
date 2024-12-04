using backend.Models.Gebruiker;
using System.ComponentModel.DataAnnotations;


namespace backend.Models.Aanvragen
{
public class Factuur
{
    [Required(ErrorMessage = "Hoeveelheid invoeren aub.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Groter dan 0")]
    public double Bedrag { get; set; }


    public bool BetaalStatus { get; set; }

    [Required(ErrorMessage = "Betalingsoptie is verplicht")]
    [RegularExpression("^(CreditCard|PayPal|Banktransactie|Ideal|Cash)$", ErrorMessage = "Ongeldige betalingsoptie ")]
    public String BetalingsOptie { get; set; }
    public User user {get; set; }
}
}