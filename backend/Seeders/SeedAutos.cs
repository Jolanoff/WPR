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
                
new Auto{Locatie ="Denhaag", AantalDeuren = 2,Prijs = 50.00, Merk = "Toyota", Type = "Corolla", Kenteken = "AB-123-CD", Kleur = "Rood", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto", imageUrl = "https://daisypstrg.blob.core.windows.net/vehicles-media/6fc4059d-a75f-4515-ab25-b217c62302c3/media.0029-1920w.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 69.00, Merk = "Ford", Type = "Focus", Kenteken = "EF-456-GH", Kleur = "Blauw", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto", imageUrl = "https://www.ford.nl/content/dam/guxeu/rhd/central/cars/2021-focus/launch/gallery/exterior/ford-focusc519-eu-205334561_STL_01_C519_Focus_Ext_Front_3_4_Dynamic__V_MY23-9x8-1200x1066-gt3.jpg.renditions.original.png"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 70.00, Merk = "Volkswagen", Type = "Golf", Kenteken = "IJ-789-KL", Kleur = "Zwart", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto", imageUrl = "https://i.ytimg.com/vi/PlTfuBdwe5I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAGTNABo9jvpvmwgHJobNoUbv7zKg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 55.00, Merk = "Honda", Type = "Civic", Kenteken = "MN-012-OP", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto", imageUrl = "https://img.autovisie.nl/images/RTbu7SMgo84WjFgg9K0U66Wl_xM=/1280x0/filters:quality(80):format(jpeg):background_color(fff)/https%3A%2F%2Fwww.autovisie.nl%2Fwp-content%2Fuploads%2F2022%2F08%2FDuik-in-de-Prijslijst-Honda-Civic-4.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 54.00, Merk = "BMW", Type = "3 Serie", Kenteken = "QR-345-ST", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto", imageUrl = "https://www.onlycabrios.nl/wp-content/uploads/2019/05/2203001-BMW-335i-cabrio-twin-turbo-E93-grijs-met-rood-leder-171000-km-008-762x456.jpg.webp"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 53.00, Merk = "Audi", Type = "A4", Kenteken = "UV-678-WX", Kleur = "Grijs", Aanschafjaar = 2016, Status = false, VoertuigType = "Auto", imageUrl = "https://blog.jackdanielsusraudi.com/wp-content/uploads/2016/11/2017-Audi-A4-exterior.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 58.00, Merk = "Mercedes", Type = "C-Klasse", Kenteken = "YZ-901-AB", Kleur = "Blauw", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto", imageUrl = "https://s3.eu-central-1.amazonaws.com/hedinautomotive-nl/10/model-c-klasse.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 80.00, Merk = "Nissan", Type = "Qashqai", Kenteken = "CD-234-EF", Kleur = "Groen", Aanschafjaar = 2015, Status = false, VoertuigType = "Auto", imageUrl = "https://abdnissan.nl/sites/default/files/styles/half_width/public/2024-07/ABD%20Nissan%20-%20Nieuwe%20Qashqai%20-%20Zijkant%20voor.jpg?itok=mkXOA05j"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 60.00, Merk = "Peugeot", Type = "208", Kenteken = "GH-567-IJ", Kleur = "Rood", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto", imageUrl = "https://cloud.leparking.fr/2022/03/11/09/01/peugeot-e-208-2021-peugeot-e-208-50kwh-gt-premium-auto-5dr-hatchback-electric-automatic-rouge_8448216055.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 65.00, Merk = "Renault", Type = "Clio", Kenteken = "KL-890-MN", Kleur = "Zwart", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto", imageUrl = "https://image.usedcarsni.com/photos/000/289/287/217/289288382.1920.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 55.00, Merk = "Kia", Type = "Sportage", Kenteken = "QR-123-ST", Kleur = "Grijs", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto", imageUrl = "https://i.ytimg.com/vi/sgVuvfnaKm4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBKdpTaonRVbo39gN9V_thq83IHTQ"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 55.00, Merk = "Hyundai", Type = "Tucson", Kenteken = "UV-456-WX", Kleur = "Blauw", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto", imageUrl = "https://alle-autos.nl/uploads/2019/02/Hyundai%20Tucson%201.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 52.00, Merk = "Skoda", Type = "Octavia", Kenteken = "YZ-789-AB", Kleur = "Groen", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto", imageUrl = "https://www.autoblog.nl/files/2020/01/skoda-octavia-rs-green-front-side-2019-970.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 57.00, Merk = "Mazda", Type = "3", Kenteken = "CD-012-EF", Kleur = "Wit", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto", imageUrl = "https://daisypstrg.blob.core.windows.net/vehicles-media/d270c33c-41ca-4eca-8b42-99c22b576f7e/media.0001-1920w.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 53.00, Merk = "Subaru", Type = "Impreza", Kenteken = "GH-345-IJ", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto", imageUrl = "https://www.vanderbijautos.nl/images/igallery/resized/12901-13000/DSC_0112-12988-750-565-80.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 44.00, Merk = "Suzuki", Type = "Vitara", Kenteken = "KL-678-MN", Kleur = "Zwart", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto", imageUrl = "https://i.ytimg.com/vi/sYBnKfpvufs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBa86V9S3YoCViOAR6JeTg7VxRVog"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 40.00, Merk = "Volvo", Type = "XC60", Kenteken = "OP-901-QR", Kleur = "Grijs", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto", imageUrl = "https://www.servamobility.nl/wp-content/uploads/Volvo-XC60-Essential-Edition.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 40.00, Merk = "Mitsubishi", Type = "Outlander", Kenteken = "ST-234-UV", Kleur = "Rood", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto", imageUrl = "https://lease-auto-website-production.s3.eu-central-1.amazonaws.com/media/407602/2024-mitsubishi-outlander-overview-fb.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 35.00, Merk = "Jeep", Type = "Wrangler", Kenteken = "WX-567-YZ", Kleur = "Groen", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto", imageUrl = "https://prod.pictures.autoscout24.net/listing-images/f7cb9d61-51e0-421b-803e-24b1d7e5fd35_c0eb4a74-bf29-45fd-b5d7-cc486eb8f9f9.jpg/1920x1080.webp"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 55.00, Merk = "Land Rover", Type = "Defender", Kenteken = "YZ-890-AB", Kleur = "Blauw", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto", imageUrl = "https://www.autoblog.nl/files/2023/08/land-rovr-defender-90-d250-maritime-blue-edition-2023-1600-019.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 2,Prijs = 60.00, Merk = "Toyota", Type = "Yaris", Kenteken = "CD-123-EF", Kleur = "Wit", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto", imageUrl = "https://cdn.autowereld.nl/I608675276/640x0/toyota-yaris-1-5-hybrid-dynamic-1-5-hybrid-dynamic.jpg "},
new Auto{Locatie ="Denhaag",AantalDeuren = 4,Prijs = 60.00, Merk = "Ford", Type = "Kuga", Kenteken = "GH-456-IJ", Kleur = "Grijs", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto", imageUrl = "https://media.lincoln.com/content/fordmedia/feu/nl/nl/asset.download.image.original.html/content/dam/fordmedia/Europe/en/2017/07/FORD_KUGA_MS_34Front_04_eciRGB.jpg"},
new Auto{Locatie ="Denhaag",AantalDeuren = 4,Prijs = 60.00, Merk = "Volkswagen", Type = "Passat", Kenteken = "KL-789-MN", Kleur = "Blauw", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto", imageUrl = "https://d109q44rbp6sn7.cloudfront.net/eyJidWNrZXQiOiJ2YWFydGxhbmQiLCJrZXkiOiJ1cGxvYWRzXC92YWFydGxhbmRubFwvNWY3MWQ4NDIwYzZmN19wYXNzYXRfdGh1bWJuYWlsLmpwZWcifQ=="},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 60.00, Merk = "Honda", Type = "Accord", Kenteken = "OP-012-QR", Kleur = "Groen", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto", imageUrl = "https://cdn.proxyparts.com/vehicles/100008/6616915/large/73ecdf33-4667-46aa-9175-a84e6d5067b7.jpg"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 60.00, Merk = "BMW", Type = "X5", Kenteken = "ST-345-UV", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto", imageUrl = "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x5-anniversary-01-6675705fa14d6.jpg?crop=0.774xw:0.653xh;0.167xw,0.194xh&resize=640:*"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 60.00, Merk = "Audi", Type = "Q7", Kenteken = "WX-678-YZ", Kleur = "Zwart", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto", imageUrl = "https://prod.pictures.autoscout24.net/listing-images/1aa400f5-4bad-4d5c-82ce-95e74e9056e3_713aebb3-850e-4df9-aae5-311aa680f180.jpg/1920x1080.webp"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 59.00, Merk = "Mercedes", Type = "GLC", Kenteken = "AB-901-CD", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto", imageUrl = "https://prod.pictures.autoscout24.net/listing-images/e9737700-c01c-49b7-ac6e-785ffca1b43d_718fa74f-9dd7-4b80-9408-272144e27c42.jpg/1920x1080.webp"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 59.00, Merk = "Nissan", Type = "Juke", Kenteken = "EF-234-GH", Kleur = "Grijs", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto", imageUrl = "https://www.groenlicht.be/wp-content/uploads/Nissan-Juke-Enigma-special-edition-2021.jpg"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 59.00, Merk = "Peugeot", Type = "308", Kenteken = "IJ-567-KL", Kleur = "Blauw", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto", imageUrl = "https://i.ytimg.com/vi/7rolVMBFTRU/maxresdefault.jpg"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 59.00, Merk = "Renault", Type = "Megane", Kenteken = "MN-890-OP", Kleur = "Groen", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto", imageUrl = "https://live.staticflickr.com/3439/3865055200_7b078fe944_b.jpg"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 59.00, Merk = "Kia", Type = "Picanto", Kenteken = "QR-123-ST", Kleur = "Groen", Aanschafjaar = 2018, Status = false, VoertuigType = "Auto", imageUrl = "https://prod.pictures.autoscout24.net/listing-images/a24bdb15-d775-48ab-a67e-8c84a6e63ed3_d28cc903-f48e-41c4-a1e5-0e247d2dfc5f.jpg/1920x1080.webp"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 59.00, Merk = "Hyundai", Type = "i30", Kenteken = "UV-456-WX", Kleur = "Rood", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto", imageUrl = "https://media-cdn.vwe.nl/Images/138242354?templateid=&overlay=&bgc=f5f5f5"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 80.00, Merk = "Skoda", Type = "Superb", Kenteken = "YZ-789-AB", Kleur = "Zwart", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto", imageUrl = "https://content.presspage.com/uploads/1443/1920_superb-lk-14-395873.jpg?10000"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 80.00, Merk = "Mazda", Type = "6", Kenteken = "CD-012-EF", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto", imageUrl = "https://assets.autoweek.nl/m/duiyn2bbscsv_800.jpg"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 80.00, Merk = "Subaru", Type = "Forester", Kenteken = "GH-345-IJ", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto", imageUrl = "https://www.garagemathieu.nl/site/wp-content/uploads/2021/07/Subaru-Forster-e-Boxer-001.jpg"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 80.00, Merk = "Suzuki", Type = "Swift", Kenteken = "KL-678-MN", Kleur = "Blauw", Aanschafjaar = 2019, Status = false, VoertuigType = "Auto", imageUrl = "https://www.adggroep.nl/media/dealer_cars/15/2010-suzuki-swift-4bc83ae5-69da-4f30-8604-2f49a452692b.jpg?s=1722333666"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 80.00, Merk = "Volvo", Type = "XC90", Kenteken = "OP-901-QR", Kleur = "Groen", Aanschafjaar = 2020, Status = false, VoertuigType = "Auto", imageUrl = "https://wrapfanatics.nl/wp-content/uploads/2019/06/COLORCHANGE-wrap-VOLVO-XC90-Urbanjungle-2-1.jpg"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 80.00, Merk = "Mitsubishi", Type = "Eclipse Cross", Kenteken = "ST-234-UV", Kleur = "Rood", Aanschafjaar = 2017, Status = false, VoertuigType = "Auto", imageUrl = "https://pers.mitsubishi-motors.nl/wp-content/uploads/2018/11/caroftheyear-mitsubishi-eclipse-cross-1-1920x1277.jpg"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 80.00, Merk = "Jeep", Type = "Renegade", Kenteken = "WX-567-YZ", Kleur = "Zwart", Aanschafjaar = 2022, Status = false, VoertuigType = "Auto", imageUrl = "https://cdn3.autokopen.nl/attachments/30e3a7c2-54c8-11ef-919b-06a9c8bf8284.webp"},
new Auto{Locatie ="Rotterdam",AantalDeuren = 4,Prijs = 80.00, Merk = "Land Rover", Type = "Discovery", Kenteken = "YZ-890-AB", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Auto", imageUrl = "https://media.production.jlrms.com/alf/images/2019-06/75dc626c-41bd-4914-b254-946673d53c8f/discoverysiliconsilver237.JPG?VersionId=EDaivUvmZ0klRh6fWgevz.N9NaaHT258"},
    };

            Console.WriteLine("Auto's worden toegevoegd...");

            context.Autos.AddRange(autos);

            await context.SaveChangesAsync();

            Console.WriteLine("Auto's succesvol toegevoegd.");
        }

    }
}
