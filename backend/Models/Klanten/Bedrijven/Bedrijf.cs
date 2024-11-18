namespace backend.Models.Klanten.Bedrijven
{
    public class Bedrijf
    {
        private string Naam { get; set; }
        private string Kvk_nummer { get; set; }

        private string Adres { get; set; }

        private WagenparkBeheerder[] WagenparkBeheerder { get; set; }
    }
}
