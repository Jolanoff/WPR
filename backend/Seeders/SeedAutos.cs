using backend.DbContext;
using backend.Models.Voertuigen;
using Microsoft.EntityFrameworkCore;

namespace backend.Seeders
{
    public class SeedAutos
    {
        public static async Task Seed(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<ApplicationsDbContext>();

            if (await context.Autos.AnyAsync())
            {
                Console.WriteLine("Er zijn al auto's in de database.");
                return;
            }

            var autos = new List<Auto>
    {
                new Auto{Merk = "Toyota", Type = "Corolla", Kenteken = "AB-123-CD", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Ford", Type = "Focus", Kenteken = "EF-456-GH", Kleur = "Blauw", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Volkswagen", Type = "Golf", Kenteken = "IJ-789-KL", Kleur = "Zwart", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Honda", Type = "Civic", Kenteken = "MN-012-OP", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "BMW", Type = "3 Serie", Kenteken = "QR-345-ST", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Audi", Type = "A4", Kenteken = "UV-678-WX", Kleur = "Zilver", Aanschafjaar = 2016, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Mercedes", Type = "C-Klasse", Kenteken = "YZ-901-AB", Kleur = "Blauw", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Nissan", Type = "Qashqai", Kenteken = "CD-234-EF", Kleur = "Groen", Aanschafjaar = 2015, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Peugeot", Type = "208", Kenteken = "GH-567-IJ", Kleur = "Rood", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Renault", Type = "Clio", Kenteken = "KL-890-MN", Kleur = "Zwart", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Hobby", Type = "De Luxe", Kenteken = "OP-123-QR", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Fendt", Type = "Bianco", Kenteken = "ST-456-UV", Kleur = "Grijs", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Knaus", Type = "Sport", Kenteken = "WX-789-YZ", Kleur = "Blauw", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Dethleffs", Type = "Camper", Kenteken = "AB-012-CD", Kleur = "Groen", Aanschafjaar = 2016, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Adria", Type = "Altea", Kenteken = "EF-345-GH", Kleur = "Zilver", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Eriba", Type = "Touring", Kenteken = "IJ-678-KL", Kleur = "Rood", Aanschafjaar = 2015, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Tabbert", Type = "Puccini", Kenteken = "MN-901-OP", Kleur = "Zwart", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Burstner", Type = "Premio", Kenteken = "QR-234-ST", Kleur = "Wit", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "LMC", Type = "Musica", Kenteken = "UV-567-WX", Kleur = "Blauw", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Sprite", Type = "Cruzer", Kenteken = "YZ-890-AB", Kleur = "Grijs", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Volkswagen", Type = "California", Kenteken = "CD-123-EF", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Mercedes", Type = "Marco Polo", Kenteken = "GH-456-IJ", Kleur = "Blauw", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Ford", Type = "Nugget", Kenteken = "KL-789-MN", Kleur = "Zwart", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Fiat", Type = "Ducato", Kenteken = "OP-012-QR", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Citroen", Type = "Jumper", Kenteken = "ST-345-UV", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Peugeot", Type = "Boxer", Kenteken = "WX-678-YZ", Kleur = "Zilver", Aanschafjaar = 2016, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Renault", Type = "Master", Kenteken = "AB-901-CD", Kleur = "Blauw", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Iveco", Type = "Daily", Kenteken = "EF-234-GH", Kleur = "Groen", Aanschafjaar = 2015, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Opel", Type = "Movano", Kenteken = "IJ-567-KL", Kleur = "Rood", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Nissan", Type = "NV400", Kenteken = "MN-890-OP", Kleur = "Zwart", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Kia", Type = "Sportage", Kenteken = "QR-123-ST", Kleur = "Zilver", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Hyundai", Type = "Tucson", Kenteken = "UV-456-WX", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Skoda", Type = "Octavia", Kenteken = "YZ-789-AB", Kleur = "Groen", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Mazda", Type = "3", Kenteken = "CD-012-EF", Kleur = "Wit", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Subaru", Type = "Impreza", Kenteken = "GH-345-IJ", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Suzuki", Type = "Vitara", Kenteken = "KL-678-MN", Kleur = "Zwart", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Volvo", Type = "XC60", Kenteken = "OP-901-QR", Kleur = "Zilver", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Mitsubishi", Type = "Outlander", Kenteken = "ST-234-UV", Kleur = "Rood", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Jeep", Type = "Wrangler", Kenteken = "WX-567-YZ", Kleur = "Groen", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Land Rover", Type = "Defender", Kenteken = "YZ-890-AB", Kleur = "Blauw", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Bailey", Type = "Unicorn", Kenteken = "CD-123-EF", Kleur = "Grijs", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Lunar", Type = "Clubman", Kenteken = "GH-456-IJ", Kleur = "Zwart", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "SwiŌ", Type = "Conqueror", Kenteken = "KL-789-MN", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Elddis", Type = "Avante", Kenteken = "OP-012-QR", Kleur = "Zilver", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Compass", Type = "Casita", Kenteken = "ST-345-UV", Kleur = "Blauw", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Coachman", Type = "VIP", Kenteken = "WX-678-YZ", Kleur = "Groen", Aanschafjaar = 2016, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Buccaneer", Type = "Commodore", Kenteken = "AB-901-CD", Kleur = "Rood", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Caravelair", Type = "Allegra", Kenteken = "EF-234-GH", Kleur = "Zwart", Aanschafjaar = 2015, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Sterckeman", Type = "StarleƩ", Kenteken = "IJ-567-KL", Kleur = "Wit", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Tab", Type = "320", Kenteken = "MN-890-OP", Kleur = "Grijs", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Volkswagen", Type = "Grand California", Kenteken = "QR-123-ST", Kleur = "Blauw", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Mercedes", Type = "Sprinter", Kenteken = "UV-456-WX", Kleur = "Groen", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Ford", Type = "Transit Custom", Kenteken = "YZ-789-AB", Kleur = "Rood", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Fiat", Type = "Talento", Kenteken = "CD-012-EF", Kleur = "Zwart", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Citroen", Type = "SpaceTourer", Kenteken = "GH-345-IJ", Kleur = "Wit", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Peugeot", Type = "Traveller", Kenteken = "KL-678-MN", Kleur = "Grijs", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Renault", Type = "Trafic", Kenteken = "OP-901-QR", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Iveco", Type = "Daily", Kenteken = "ST-234-UV", Kleur = "Groen", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Opel", Type = "Vivaro", Kenteken = "WX-567-YZ", Kleur = "Rood", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Nissan", Type = "Primastar", Kenteken = "YZ-890-AB", Kleur = "Zwart", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Toyota", Type = "Yaris", Kenteken = "CD-123-EF", Kleur = "Wit", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Ford", Type = "Kuga", Kenteken = "GH-456-IJ", Kleur = "Grijs", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Volkswagen", Type = "Passat", Kenteken = "KL-789-MN", Kleur = "Blauw", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Honda", Type = "Accord", Kenteken = "OP-012-QR", Kleur = "Groen", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "BMW", Type = "X5", Kenteken = "ST-345-UV", Kleur = "Zilver", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Audi", Type = "Q7", Kenteken = "WX-678-YZ", Kleur = "Zwart", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Mercedes", Type = "GLC", Kenteken = "AB-901-CD", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Nissan", Type = "Juke", Kenteken = "EF-234-GH", Kleur = "Grijs", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Peugeot", Type = "308", Kenteken = "IJ-567-KL", Kleur = "Blauw", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Renault", Type = "Megane", Kenteken = "MN-890-OP", Kleur = "Groen", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Tabbert", Type = "Rossini", Kenteken = "QR-123-ST", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Dethleffs", Type = "Beduin", Kenteken = "UV-456-WX", Kleur = "Zwart", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Fendt", Type = "Tendenza", Kenteken = "YZ-789-AB", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Knaus", Type = "Sudwind", Kenteken = "CD-012-EF", Kleur = "Zilver", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Hobby", Type = "Excellent", Kenteken = "GH-345-IJ", Kleur = "Blauw", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Adria", Type = "AcƟon", Kenteken = "KL-678-MN", Kleur = "Groen", Aanschafjaar = 2016, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Eriba", Type = "Feeling", Kenteken = "OP-901-QR", Kleur = "Rood", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Burstner", Type = "Averso", Kenteken = "ST-234-UV", Kleur = "Zwart", Aanschafjaar = 2015, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "LMC", Type = "Vivo", Kenteken = "WX-567-YZ", Kleur = "Wit", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Sprite", Type = "Major", Kenteken = "YZ-890-AB", Kleur = "Grijs", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Volkswagen", Type = "MulƟvan", Kenteken = "CD-123-EF", Kleur = "Zwart", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Mercedes", Type = "Vito", Kenteken = "GH-456-IJ", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Ford", Type = "Custom", Kenteken = "KL-789-MN", Kleur = "Grijs", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Fiat", Type = "Scudo", Kenteken = "OP-012-QR", Kleur = "Blauw", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Citroen", Type = "Berlingo", Kenteken = "ST-345-UV", Kleur = "Groen", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Peugeot", Type = "Partner", Kenteken = "WX-678-YZ", Kleur = "Rood", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Renault", Type = "Kangoo", Kenteken = "AB-901-CD", Kleur = "Zwart", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Iveco", Type = "Eurocargo", Kenteken = "EF-234-GH", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Opel", Type = "Combo", Kenteken = "IJ-567-KL", Kleur = "Grijs", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Nissan", Type = "NV200", Kenteken = "MN-890-OP", Kleur = "Blauw", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Kia", Type = "Picanto", Kenteken = "QR-123-ST", Kleur = "Groen", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Hyundai", Type = "i30", Kenteken = "UV-456-WX", Kleur = "Rood", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Skoda", Type = "Superb", Kenteken = "YZ-789-AB", Kleur = "Zwart", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Mazda", Type = "6", Kenteken = "CD-012-EF", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Subaru", Type = "Forester", Kenteken = "GH-345-IJ", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Suzuki", Type = "SwiŌ", Kenteken = "KL-678-MN", Kleur = "Blauw", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Volvo", Type = "XC90", Kenteken = "OP-901-QR", Kleur = "Groen", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Mitsubishi", Type = "Eclipse Cross", Kenteken = "ST-234-UV", Kleur = "Rood", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Jeep", Type = "Renegade", Kenteken = "WX-567-YZ", Kleur = "Zwart", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto"},
new Auto{Merk = "Land Rover", Type = "Discovery", Kenteken = "YZ-890-AB", Kleur = "Zilver", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto"},

    };

            Console.WriteLine("Auto's worden toegevoegd...");

            context.Autos.AddRange(autos);

            await context.SaveChangesAsync();

            Console.WriteLine("Auto's succesvol toegevoegd.");
        }

    }
}
