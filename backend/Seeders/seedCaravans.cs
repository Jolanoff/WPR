using backend.DbContext;
using backend.Models.Voertuigen;
using Microsoft.EntityFrameworkCore;

namespace backend.Seeders
{
    public class SeedCaravans
    {
        public static async Task Seed(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<ApplicationsDbContext>();

            if (await context.Caravans.AnyAsync())
            {
                Console.WriteLine("Er zijn al caravans in de database.");
                return;
            }

            var caravans = new List<Caravan>
    {
new Caravan{Merk = "Hobby", Type = "De Luxe", Kenteken = "AB-123-CD", Kleur = "Wit", Aanschafjaar = 2018, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Fendt", Type = "Bianco", Kenteken = "EF-456-GH", Kleur = "Grijs", Aanschafjaar = 2019, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Knaus", Type = "Sport", Kenteken = "IJ-789-KL", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Adria", Type = "Altea", Kenteken = "MN-012-OP", Kleur = "Zilver", Aanschafjaar = 2017, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Dethleffs", Type = "Camper", Kenteken = "QR-345-ST", Kleur = "Groen", Aanschafjaar = 2021, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Tabbert", Type = "Puccini", Kenteken = "UV-678-WX", Kleur = "Zwart", Aanschafjaar = 2016, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Burstner", Type = "Premio", Kenteken = "YZ-901-AB", Kleur = "Wit", Aanschafjaar = 2022, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "LMC", Type = "Musica", Kenteken = "CD-234-EF", Kleur = "Blauw", Aanschafjaar = 2015, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Sprite", Type = "Cruzer", Kenteken = "GH-567-IJ", Kleur = "Rood", Aanschafjaar = 2021, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Hobby", Type = "De Luxe", Kenteken = "AB-123-CD", Kleur = "Wit", Aanschafjaar = 2018, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Fendt", Type = "Bianco", Kenteken = "EF-456-GH", Kleur = "Grijs", Aanschafjaar = 2019, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Knaus", Type = "Sport", Kenteken = "IJ-789-KL", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Adria", Type = "Altea", Kenteken = "MN-012-OP", Kleur = "Zilver", Aanschafjaar = 2017, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Dethleffs", Type = "Camper", Kenteken = "QR-345-ST", Kleur = "Groen", Aanschafjaar = 2021, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Tabbert", Type = "Puccini", Kenteken = "UV-678-WX", Kleur = "Zwart", Aanschafjaar = 2016, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Burstner", Type = "Premio", Kenteken = "YZ-901-AB", Kleur = "Wit", Aanschafjaar = 2022, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "LMC", Type = "Musica", Kenteken = "CD-234-EF", Kleur = "Blauw", Aanschafjaar = 2015, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Sprite", Type = "Cruzer", Kenteken = "GH-567-IJ", Kleur = "Rood", Aanschafjaar = 2021, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Buccaneer", Type = "Barracuda", Kenteken = "WX-789-YZ", Kleur = "Rood", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Caravelair", Type = "Antares", Kenteken = "AB-012-CD", Kleur = "Groen", Aanschafjaar = 2016, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Sterckeman", Type = "EvoluƟon", Kenteken = "EF-345-GH", Kleur = "Zwart", Aanschafjaar = 2018, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Tab", Type = "400", Kenteken = "IJ-678-KL", Kleur = "Zilver", Aanschafjaar = 2021, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Eriba", Type = "Nova", Kenteken = "MN-901-OP", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Adria", Type = "Adora", Kenteken = "QR-234-ST", Kleur = "Wit", Aanschafjaar = 2019, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Fendt", Type = "Opal", Kenteken = "UV-567-WX", Kleur = "Zwart", Aanschafjaar = 2022, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Knaus", Type = "Sky Traveller", Kenteken = "YZ-890-AB", Kleur = "Groen", Aanschafjaar = 2017, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Hobby", Type = "PresƟge", Kenteken = "CD-123-EF", Kleur = "Grijs", Aanschafjaar = 2018, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Dethleffs", Type = "C'go", Kenteken = "GH-456-IJ", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan"},
new Caravan{Merk = "Burstner", Type = "Premio Life", Kenteken = "KL-789-MN", Kleur = "Rood", Aanschafjaar = 2017, Status = false, VoertuigType = "Caravan"},

    };

            Console.WriteLine("Caravans worden toegevoegd...");

            context.Caravans.AddRange(caravans);

            await context.SaveChangesAsync();

            Console.WriteLine("Caravans succesvol toegevoegd.");
        }

    }
}
