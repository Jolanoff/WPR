
using backend.Models.Klanten.Bedrijven;

namespace backend.Models.Klanten;
    public class ZakelijkeHuurder : Klant
    {
        private Bedrijf Bedrijf {  get; set; }
        private Abonnement Abonnement { get; set; }
    }
