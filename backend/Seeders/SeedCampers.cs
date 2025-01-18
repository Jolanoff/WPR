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
                new Camper{Prijs = 50.00, Merk = "Volkswagen", Type = "California", Kenteken = "AB-123-CD", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper", imageUrl = "https://www.4sky.nl/wp-content/uploads/2023/12/VW-T6.1-GRILLE-KIT-GRILLE-KIT-4.jpg"},
new Camper{Prijs = 60.00, Merk = "Mercedes", Type = "Marco Polo", Kenteken = "EF-456-GH", Kleur = "Grijs", Aanschafjaar = 2019, Status = false, VoertuigType = "Camper", imageUrl = "https://f7432d8eadcf865aa9d9-9c672a3a4ecaaacdf2fee3b3e6fd2716.ssl.cf3.rackcdn.com/C1703/U5482/IMG_375-large.jpg"},
new Camper{Prijs = 60.00, Merk = "Ford", Type = "Transit Custom", Kenteken = "IJ-789-KL", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper", imageUrl = "https://d2e5b8shawuel2.cloudfront.net/vehicle/301845/hrv/original.jpg"},
new Camper{Prijs = 60.00, Merk = "Fiat", Type = "Ducato", Kenteken = "MN-012-OP", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Camper", imageUrl = "https://cdn.autowereld.nl/I678944559/640x0/fiat-ducato-30-2-3-multijet-l2h2-trekhaak.jpg"},
new Camper{Prijs = 60.00, Merk = "Citroën", Type = "Jumper", Kenteken = "QR-345-ST", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Camper", imageUrl = "https://pics.auto-commerce.eu/ac0003/foto/1724922048360335.JPG"},
new Camper{Prijs = 60.00, Merk = "Peugeot", Type = "Boxer", Kenteken = "UV-678-WX", Kleur = "Zwart", Aanschafjaar = 2016, Status = false, VoertuigType = "Camper", imageUrl = "https://d2e5b8shawuel2.cloudfront.net/vehicle/303648/hlb/original.jpg"},
new Camper{Prijs = 60.00, Merk = "Renault", Type = "Master", Kenteken = "YZ-901-AB", Kleur = "Groen", Aanschafjaar = 2022, Status = false, VoertuigType = "Camper", imageUrl = "https://d2e5b8shawuel2.cloudfront.net/vehicle/285271/hrv/original.jpg"},
new Camper{Prijs = 60.00, Merk = "Nissan", Type = "NV400", Kenteken = "CD-234-EF", Kleur = "Blauw", Aanschafjaar = 2015, Status = false, VoertuigType = "Camper", imageUrl = "https://www.bestelauto.nl/wp-content/uploads/2011/11/image12.jpg"},
new Camper{Prijs = 70.00, Merk = "Opel", Type = "Movano", Kenteken = "GH-567-IJ", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Camper", imageUrl = "https://prod.pictures.autoscout24.net/listing-images/23c9e4a3-3a4e-4317-8e57-619e434d9690_6c09e6ea-a19a-428c-8022-0a5b097ded95.jpg/1920x1080.webp"},
new Camper{Prijs = 70.00, Merk = "Iveco", Type = "Daily", Kenteken = "KL-890-MN", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper", imageUrl = "https://d2e5b8shawuel2.cloudfront.net/vehicle/287648/hlv/original.jpg"},
new Camper{Prijs = 70.00, Merk = "Volkswagen", Type = "Grand California", Kenteken = "OP-123-QR", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Camper", imageUrl = "https://res.cloudinary.com/hqxyevlf6/image/upload/c_fit,f_auto,h_1200,q_auto,w_1200/gokcytgpfblvn8fj8foc.jpg"},
new Camper{Prijs = 70.00, Merk = "Mercedes", Type = "Sprinter", Kenteken = "ST-456-UV", Kleur = "Blauw", Aanschafjaar = 2019, Status = false, VoertuigType = "Camper", imageUrl = "https://d2e5b8shawuel2.cloudfront.net/vehicle/267076/hrv/original.jpg"},
new Camper{Prijs = 70.00, Merk = "Ford", Type = "Nugget", Kenteken = "WX-789-YZ", Kleur = "Zwart", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper", imageUrl = "https://cdn.truckscout24.com/data/listing/img/vga/ts/28/76/15315394-02.jpg?v=1713512827"},
new Camper{Prijs = 70.00, Merk = "Fiat", Type = "Talento", Kenteken = "AB-012-CD", Kleur = "Groen", Aanschafjaar = 2016, Status = false, VoertuigType = "Camper", imageUrl = "https://cloud.leparking.fr/2024/09/11/15/49/fiat-talento-fiat-talento-kasten-l1h1-1-2t-sx-navi-ahk-rfk-6-sitze-grun_9170550465.jpg"},
new Camper{Prijs = 70.00, Merk = "Citroën", Type = "SpaceTourer", Kenteken = "EF-345-GH", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper", imageUrl = "https://www.autoscout24.nl/cms-content-assets/2pMl2ynwCKlxESB40cveAs-a5281e8928f5982d569a3bca6bd574cb-citroen-jumpy-1100.jpg"},
new Camper{Prijs = 70.00, Merk = "Peugeot", Type = "Traveller", Kenteken = "IJ-678-KL", Kleur = "Zwart", Aanschafjaar = 2021, Status = false, VoertuigType = "Camper", imageUrl = "https://i.ytimg.com/vi/_M2esLlbrYk/maxresdefault.jpg"},
new Camper{Prijs = 80.00, Merk = "Renault", Type = "Trafic", Kenteken = "MN-901-OP", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper", imageUrl = "https://d2e5b8shawuel2.cloudfront.net/vehicle/305222/hrv/original.jpg"},
new Camper{Prijs = 80.00, Merk = "Nissan", Type = "Primastar", Kenteken = "QR-234-ST", Kleur = "Grijs", Aanschafjaar = 2019, Status = false, VoertuigType = "Camper", imageUrl = "https://upload.wikimedia.org/wikipedia/commons/b/b6/Nissan_Primastar_dCi_100_%E2%80%93_Frontansicht%2C_1._M%C3%A4rz_2014%2C_Wuppertal.jpg"},
new Camper{Prijs = 80.00, Merk = "Opel", Type = "Vivaro", Kenteken = "UV-567-WX", Kleur = "Grijs", Aanschafjaar = 2022, Status = false, VoertuigType = "Camper", imageUrl = "https://www.debedrijfswagenadviseurs.nl/wp-content/uploads/2020/10/DSC01873.jpg"},
new Camper{Prijs = 80.00, Merk = "Volkswagen", Type = "Multivan", Kenteken = "CD-123-EF", Kleur = "Blauw", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper", imageUrl = "https://assets.autoweek.nl/m/kcvtbn8d1h0rtv_800.jpg"},
new Camper{Prijs = 80.00, Merk = "Mercedes", Type = "Vito", Kenteken = "GH-456-IJ", Kleur = "Groen", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper", imageUrl = "https://www.fxuk.net/wp-content/uploads/2017/06/Metallic-green-vito-van-wrap-by-creative-fx-3.jpg"},
new Camper{Prijs = 80.00, Merk = "Fiat", Type = "Scudo", Kenteken = "OP-012-QR", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper", imageUrl = "https://assets.autoweek.nl/m/m1fyan5bt6py_800.jpg"},
new Camper{Prijs = 80.00, Merk = "Citroën", Type = "Berlingo", Kenteken = "ST-345-UV", Kleur = "Wit", Aanschafjaar = 2019, Status = false, VoertuigType = "Camper", imageUrl = "https://media.carflowmanager.com/api/ImageDownload/Xd/694813/117612211_0.jpg"},
new Camper{Prijs = 69.00, Merk = "Peugeot", Type = "Expert", Kenteken = "WX-678-YZ", Kleur = "Grijs", Aanschafjaar = 2016, Status = false, VoertuigType = "Camper", imageUrl = "https://www.vanmossel.nl/assets/Uploads/NoBearsImageContentBlock/peugeot-expert-l-01__FillWzY4MCwzODNd.jpg"},
new Camper{Prijs = 69.00, Merk = "Renault", Type = "Kangoo", Kenteken = "AB-901-CD", Kleur = "Blauw", Aanschafjaar = 2022, Status = false, VoertuigType = "Camper", imageUrl = "https://assets.autoweek.nl/m/m1cyj8gbr4xs_800.jpg"},
new Camper{Prijs = 69.00, Merk = "Mercedes", Type = "Sprinter XXL", Kenteken = "ST-456-UV", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Camper", imageUrl = "https://certified.vans.mercedes-benz.nl/static-storage2/mercedes-occasions/images/occasions-module/80/19245580_31.jpg?1019997370"},
new Camper{Prijs = 69.00, Merk = "Ford", Type = "Custom", Kenteken = "WX-789-YZ", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Camper", imageUrl = "https://media.autodisk.nl/fotos/geel/121318/16-9/1200/a.jpg"},
new Camper{Prijs = 69.00, Merk = "Fiat", Type = "Ducato Maxi", Kenteken = "AB-012-CD", Kleur = "Wit", Aanschafjaar = 2016, Status = false, VoertuigType = "Camper", imageUrl = "https://img.hey.car/unsafe/480x/filters:quality(90):no_upscale()/https://cdn.de.prod.group-mobility-trader.com/images/cas/873269dec10ebc113fb544820e4526f0/original.jpg"},
new Camper{Prijs = 69.00, Merk = "Citroën", Type = "Jumper", Kenteken = "EF-345-GH", Kleur = "Groen", Aanschafjaar = 2018, Status = false, VoertuigType = "Camper", imageUrl = "https://tinttotaal.nl/wp-content/uploads/2023/05/Banner-erox-1.jpg"},
new Camper{Prijs = 69.00, Merk = "Renault", Type = "Master", Kenteken = "MN-901-OP", Kleur = "Grijs", Aanschafjaar = 2024, Status = false, VoertuigType = "Camper", imageUrl = "https://www.zeeuwenzeeuw.nl/content/uploads/2024/02/03_De-volledig-nieuwe-Renault-Master-multi-energie-Aerovan-van-de-volgende-generatie-1-1024x730.jpg"},
new Camper{Prijs = 69.00, Merk = "Opel", Type = "Vivaro XL", Kenteken = "UV-567-WX", Kleur = "Grijs", Aanschafjaar = 2017, Status = false, VoertuigType = "Camper", imageUrl = "https://d2e5b8shawuel2.cloudfront.net/vehicle/297504/hrv/original.jpg"},

    };

            Console.WriteLine("Campers worden toegevoegd...");

            context.Campers.AddRange(campers);

            await context.SaveChangesAsync();

            Console.WriteLine("Campers succesvol toegevoegd.");
        }

    }
}
