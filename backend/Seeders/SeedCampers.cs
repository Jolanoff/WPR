using backend.DbContext;
using backend.Models.Voertuigen;
using Microsoft.EntityFrameworkCore;

namespace backend.Seeders
{
    public class SeedCampers
    {
        public static async Task Seed(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<ApplicationsDbContext>();

            if (await context.Campers.AnyAsync())
            {
                Console.WriteLine("Er zijn al campers in de database.");
                return;
            }

            var campers = new List<Camper>
    {
new Camper{Merk = "Volkswagen", Type = "California", Kenteken = "AB-123-CD", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Mercedes", Type = "Marco Polo", Kenteken = "EF-456-GH", Kleur = "Zilver", Aanschafjaar = 2019, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Ford", Type = "Transit Custom", Kenteken = "IJ-789-KL", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Fiat", Type = "Ducato", Kenteken = "MN-012-OP", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Citroën", Type = "Jumper", Kenteken = "QR-345-ST", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Peugeot", Type = "Boxer", Kenteken = "UV-678-WX", Kleur = "Zwart", Aanschafjaar = 2016, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Renault", Type = "Master", Kenteken = "YZ-901-AB", Kleur = "Groen", Aanschafjaar = 2022, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Nissan", Type = "NV400", Kenteken = "CD-234-EF", Kleur = "Blauw", Aanschafjaar = 2015, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Opel", Type = "Movano", Kenteken = "GH-567-IJ", Kleur = "Zilver", Aanschafjaar = 2021, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Iveco", Type = "Daily", Kenteken = "KL-890-MN", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Volkswagen", Type = "Grand California", Kenteken = "OP-123-QR", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Mercedes", Type = "Sprinter", Kenteken = "ST-456-UV", Kleur = "Blauw", Aanschafjaar = 2019, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Ford", Type = "Nugget", Kenteken = "WX-789-YZ", Kleur = "Zwart", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Fiat", Type = "Talento", Kenteken = "AB-012-CD", Kleur = "Groen", Aanschafjaar = 2016, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Citroën", Type = "SpaceTourer", Kenteken = "EF-345-GH", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Peugeot", Type = "Traveller", Kenteken = "IJ-678-KL", Kleur = "Zwart", Aanschafjaar = 2021, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Renault", Type = "Trafic", Kenteken = "MN-901-OP", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Nissan", Type = "Primastar", Kenteken = "QR-234-ST", Kleur = "Zilver", Aanschafjaar = 2019, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Opel", Type = "Vivaro", Kenteken = "UV-567-WX", Kleur = "Grijs", Aanschafjaar = 2022, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Iveco", Type = "Eurocargo", Kenteken = "YZ-890-AB", Kleur = "Zwart", Aanschafjaar = 2017, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Volkswagen", Type = "MulƟvan", Kenteken = "CD-123-EF", Kleur = "Blauw", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Mercedes", Type = "Vito", Kenteken = "GH-456-IJ", Kleur = "Groen", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Ford", Type = "Kuga Camper", Kenteken = "KL-789-MN", Kleur = "Zilver", Aanschafjaar = 2017, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Fiat", Type = "Scudo", Kenteken = "OP-012-QR", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Citroën", Type = "Berlingo", Kenteken = "ST-345-UV", Kleur = "Wit", Aanschafjaar = 2019, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Peugeot", Type = "Expert Camper", Kenteken = "WX-678-YZ", Kleur = "Grijs", Aanschafjaar = 2016, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Renault", Type = "Kangoo Camper", Kenteken = "AB-901-CD", Kleur = "Blauw", Aanschafjaar = 2022, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Nissan", Type = "Juke Camper", Kenteken = "EF-234-GH", Kleur = "Zwart", Aanschafjaar = 2015, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Opel", Type = "Zafira Camper", Kenteken = "GH-567-IJ", Kleur = "Groen", Aanschafjaar = 2021, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Iveco", Type = "Camper 2000", Kenteken = "KL-890-MN", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Volkswagen", Type = "Kombi", Kenteken = "OP-123-QR", Kleur = "Zwart", Aanschafjaar = 2017, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Mercedes", Type = "Sprinter XXL", Kenteken = "ST-456-UV", Kleur = "Zilver", Aanschafjaar = 2021, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Ford", Type = "Custom Camper", Kenteken = "WX-789-YZ", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Fiat", Type = "Ducato Maxi", Kenteken = "AB-012-CD", Kleur = "Wit", Aanschafjaar = 2016, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Citroën", Type = "Jumper Camper", Kenteken = "EF-345-GH", Kleur = "Groen", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Peugeot", Type = "Boxer XL", Kenteken = "IJ-678-KL", Kleur = "Zwart", Aanschafjaar = 2021, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Renault", Type = "Master Pro", Kenteken = "MN-901-OP", Kleur = "Grijs", Aanschafjaar = 2019, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Nissan", Type = "NV300 Camper", Kenteken = "QR-234-ST", Kleur = "Blauw", Aanschafjaar = 2022, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Opel", Type = "Vivaro XL", Kenteken = "UV-567-WX", Kleur = "Zilver", Aanschafjaar = 2017, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Iveco", Type = "Daily Pro", Kenteken = "YZ-890-AB", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Volkswagen", Type = "T6 California", Kenteken = "CD-123-EF", Kleur = "Groen", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Mercedes", Type = "V-Class Camper", Kenteken = "GH-456-IJ", Kleur = "Zwart", Aanschafjaar = 2019, Status = false, VoertuigType = "Camper"},
new Camper{Merk = "Ford", Type = "Transit Nugget Plus", Kenteken = "KL-789-MN", Kleur = "Wit", Aanschafjaar = 2022, Status = false, VoertuigType = "Camper"},
    };

            Console.WriteLine("Campers worden toegevoegd...");

            context.Campers.AddRange(campers);

            await context.SaveChangesAsync();

            Console.WriteLine("Campers succesvol toegevoegd.");
        }

    }
}
