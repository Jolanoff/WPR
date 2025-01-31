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
                new Caravan{Locatie ="Denhaag", Prijs = 50.00, Merk = "Hobby", Type = "De Luxe", Kenteken = "AB-123-CD", Kleur = "Wit", Aanschafjaar = 2018, Status = false, VoertuigType = "Caravan", imageUrl = "https://images.caravans.nl/ac8db0ede26f6391e67e0f18d2e6a925771589c03a162db531bd679e597f6c49.jpg/large/normalfitcanvas/blank/"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Fendt", Type = "Bianco", Kenteken = "EF-456-GH", Kleur = "Wit", Aanschafjaar = 2019, Status = false, VoertuigType = "Caravan", imageUrl = "https://images.caravans.nl/ecf93ec0522466afb15bdc0102f30a276cf259365fb832a6173220fe89ddf429.jpg/large/normalfitcanvas/blank/"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Knaus", Type = "Sport", Kenteken = "IJ-789-KL", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan", imageUrl = "https://images.caravans.nl/76abec076f547100bcbe796ae12951a1f2814e5d5ba66f4b6d7b178d62bb6a05.jpg/large/normalfitcanvas/blank/"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Adria", Type = "Altea", Kenteken = "MN-012-OP", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Caravan", imageUrl = "https://meerbeek.nl/wp-content/uploads/Adria-caravan-Altea-2020-07.jpg"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Tabbert", Type = "Puccini", Kenteken = "UV-678-WX", Kleur = "Wit", Aanschafjaar = 2016, Status = false, VoertuigType = "Caravan", imageUrl = "https://images.hyperportal.org/eyJrZXkiOiJjYXJhdmFuLWV4cG8vYndFWFpnWWNQT3BScU1ubnRLV2RiIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDAwLCJoZWlnaHQiOjgwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfSwid2VicCI6eyJxdWFsaXR5Ijo3MCwicmVkdWN0aW9uRWZmb3J0Ijo1LCJhbHBoYVF1YWxpdHkiOjEwMH19LCJvdXRwdXRGb3JtYXQiOiJ3ZWJwIn0="},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Burstner", Type = "Premio", Kenteken = "YZ-901-AB", Kleur = "Wit", Aanschafjaar = 2022, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.acsifreelife.nl/wp-content/uploads/2020/06/DSC7820_WEB.jpeg"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "LMC", Type = "Musica", Kenteken = "CD-234-EF", Kleur = "Wit", Aanschafjaar = 2015, Status = false, VoertuigType = "Caravan", imageUrl = "https://minli-caravanworld.nl/wp-content/uploads/2023/05/lmc-musica-freisteller-542-grey.jpg"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Sprite", Type = "Cruzer", Kenteken = "GH-567-IJ", Kleur = "Wit", Aanschafjaar = 2021, Status = false, VoertuigType = "Caravan", imageUrl = "https://images.ovis.nl/a2022acf0612376c60121f7e16edb0cc6546d190ed126d0e9d8719dbfd862cd6.jpg/large/normalfitcanvas?w=700&h=480&ps=1"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Bailey", Type = "Unicorn", Kenteken = "KL-890-MN", Kleur = "Wit", Aanschafjaar = 2018, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.baileyofbristol.co.uk/wp-content/uploads/2021/06/Unicorn-V-exterior.jpg"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Lunar", Type = "Clubman", Kenteken = "OP-123-QR", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.northwesterncaravans.co.uk/wp-content/uploads/2023/12/IMG_2932.jpeg"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Swift", Type = "Conqueror", Kenteken = "ST-456-UV", Kleur = "Grijs", Aanschafjaar = 2019, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.practicalcaravan.com/wp-content/uploads/2013/03/5577107.jpg"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Compass", Type = "Casita", Kenteken = "WX-789-YZ", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.practicalcaravan.com/wp-content/uploads/2019/01/9653945-scaled.jpg"},
new Caravan{Locatie ="Denhaag", Prijs = 55.00, Merk = "Buccaneer", Type = "Commodore", Kenteken = "EF-345-GH", Kleur = "Grijs", Aanschafjaar = 2018, Status = false, VoertuigType = "Caravan", imageUrl = "https://motorhomesandcaravansltd.co.uk/wp-content/uploads/2024/04/IMG_7526.jpg"},
new Caravan{Locatie ="Denhaag", Prijs = 100.00, Merk = "Caravelair", Type = "Allegra", Kenteken = "IJ-678-KL", Kleur = "Wit", Aanschafjaar = 2021, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.acrcaravanservice.nl/wp-content/uploads/2023/03/20230325_155724-scaled.jpg"},
new Caravan{Locatie ="Delft",Prijs = 100.00, Merk = "Sterckeman", Type = "Starlett", Kenteken = "MN-901-OP", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan", imageUrl = "https://images.ovis.nl/64d26cb840754d0be46458ac2f5b0aab17c04c0eab8a490ba852ec14a67c8961.jpg/large/normalfitcanvas?w=700&h=480&ps=1"},
new Caravan{Locatie ="Delft",Prijs = 100.00, Merk = "Tab", Type = "320", Kenteken = "QR-234-ST", Kleur = "Wit", Aanschafjaar = 2019, Status = false, VoertuigType = "Caravan", imageUrl = "https://nucamprv.com/wp-content/uploads/2024/10/2025-TAB-320.jpg"},
new Caravan{Locatie ="Delft",Prijs = 100.00, Merk = "Eriba", Type = "Touring", Kenteken = "UV-567-WX", Kleur = "Grijs", Aanschafjaar = 2022, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.vossenhoek.nl/wp-content/uploads/sites/99/2024/03/cd7f8a5c9e0be53304b797004036080fd122056d12d594421072d6f098c5e2b9.jpg"},
new Caravan{Locatie ="Delft",Prijs = 100.00, Merk = "Adria", Type = "Action", Kenteken = "YZ-890-AB", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Caravan", imageUrl = "https://meerbeek.nl/wp-content/uploads/Adria-caravan-Action-2020-01.jpg"},
new Caravan{Locatie ="Delft",Prijs = 100.00, Merk = "Fendt", Type = "Tendenza", Kenteken = "CD-123-EF", Kleur = "Wit", Aanschafjaar = 2018, Status = false, VoertuigType = "Caravan", imageUrl = "https://meerbeek.nl/wp-content/uploads/IMG_5811.jpg"},
new Caravan{Locatie ="Delft",Prijs = 100.00, Merk = "Knaus", Type = "Sudwind", Kenteken = "GH-456-IJ", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.knaus.com/fileadmin/media/global/open-graphs/caravans/ktg-knaus-caravans-suedwind-opengraph.jpg"},
new Caravan{Locatie ="Delft",Prijs = 100.00, Merk = "Hobby", Type = "Excellent", Kenteken = "KL-789-MN", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.hobby-caravan.de/fileadmin/user_upload/03-CARAVANS/2025/Excellent_Edition/excellent-edition-hero.jpg"},
new Caravan{Locatie ="Delft",Prijs = 100.00, Merk = "Dethleffs", Type = "Beduin", Kenteken = "OP-012-QR", Kleur = "Wit", Aanschafjaar = 2019, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.weltencaravans.nl/images/caravans/8DC095D6-FFBF-402F-A8F7-F112C6F28271.jpeg"},
new Caravan{Locatie ="Delft",Prijs = 120.00, Merk = "Burstner", Type = "Averso", Kenteken = "ST-345-UV", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Caravan", imageUrl = "https://storage.mycamper.com/assets/vehicle/caravan/19707/LXcsSWYY52fVfLBv0zg8b3iXz0233yXxYeqAIRIs-card.jpg"},
new Caravan{Locatie ="Delft",Prijs = 120.00, Merk = "LMC", Type = "Vivo", Kenteken = "WX-678-YZ", Kleur = "Wit", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan", imageUrl = "https://caravanmakelaaronline.nl/image/1920x1280/80/uploads/item/lmc-vivo-energy-532-k-2018-1715855235.jpg?watermark_image=%2Fimages%2FwatermarkBig1.png&watermark_offsetx=10&watermark_offsety=10&watermark_position=top-right&signature=ec087d07d68f13738e36edf192664f06ec7dad742b3de7030caba981d725bd42"},
new Caravan{Locatie ="Delft",Prijs = 120.00, Merk = "Sprite", Type = "Major", Kenteken = "AB-901-CD", Kleur = "Wit", Aanschafjaar = 2019, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.qualitycaravans.com/images/stories/virtuemart/product/new-touring-caravan-for-sale-2023-sprite-major-4-sb-torksey-and-sheffield-caravans-(1)3.jpg"},
new Caravan{Locatie ="Delft",Prijs = 120.00, Merk = "Bailey", Type = "Phoenix", Kenteken = "EF-234-GH", Kleur = "Grijs", Aanschafjaar = 2022, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.venture-caravans.com/wp-content/uploads/2021/09/Bailey-Phoenix-SE-644-2023-2-Medium.jpeg"},
new Caravan{Locatie ="Rotterdam",Prijs = 120.00, Merk = "Lunar", Type = "Delta", Kenteken = "GH-567-IJ", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.pirancaravansales.co.uk/images/for_sale_items/intro_thumb/472/lunar-delta-ri035.jpg"},
new Caravan{Locatie ="Rotterdam",Prijs = 120.00, Merk = "Swift", Type = "Elegance", Kenteken = "KL-890-MN", Kleur = "Wit", Aanschafjaar = 2018, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.pirancaravansales.co.uk/images/for_sale_items/intro_thumb/412/swift-elegance-external-pics003.jpg"},
new Caravan{Locatie ="Rotterdam",Prijs = 120.00, Merk = "Compass", Type = "Corona", Kenteken = "OP-123-QR", Kleur = "Wit", Aanschafjaar = 2021, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.practicalcaravan.com/wp-content/uploads/2016/05/5972872-scaled.jpg"},
new Caravan{Locatie ="Rotterdam",Prijs = 80.00, Merk = "Coachman", Type = "Acadia", Kenteken = "ST-456-UV", Kleur = "Grijs", Aanschafjaar = 2019, Status = false, VoertuigType = "Caravan", imageUrl = "https://granthamcaravans.co.uk/wp-content/uploads/2024/08/2025-Coachman-Acadia-575-20.jpg"},
new Caravan{Locatie ="Rotterdam",Prijs = 80.00, Merk = "Buccaneer", Type = "Barracuda", Kenteken = "WX-789-YZ", Kleur = "Grijs", Aanschafjaar = 2020, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.practicalcaravan.com/wp-content/uploads/2017/12/6609772-scaled.jpg"},
new Caravan{Locatie ="Rotterdam",Prijs = 80.00, Merk = "Caravelair", Type = "Antares", Kenteken = "AB-012-CD", Kleur = "Wit", Aanschafjaar = 2016, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.cannenburg.nl/wp-content/uploads/2019/08/2020-Caravelair-Antares-Style-470-caravan-14.jpg"},
new Caravan{Locatie ="Rotterdam",Prijs = 80.00, Merk = "Sterckeman", Type = "Evolution", Kenteken = "EF-345-GH", Kleur = "Grijs", Aanschafjaar = 2018, Status = false, VoertuigType = "Caravan", imageUrl = "https://cdn.truckscout24.com/data/listing/img/vga/ts/02/53/15036295-01.jpg?v=1713532206"},
new Caravan{Locatie ="Rotterdam",Prijs = 80.00, Merk = "Tab", Type = "400", Kenteken = "IJ-678-KL", Kleur = "Grijs", Aanschafjaar = 2021, Status = false, VoertuigType = "Caravan", imageUrl = "https://cdn.dealerspike.com/imglib/v1/640x480/imglib/assets/inventory/80/3C/803C89C7-07A2-4289-B20B-03FD0D656104.jpg"},
new Caravan{Locatie ="Rotterdam",Prijs = 80.00, Merk = "Burstner", Type = "Premio Life", Kenteken = "KL-789-MN", Kleur = "Wit", Aanschafjaar = 2017, Status = false, VoertuigType = "Caravan", imageUrl = "https://www.shutterstock.com/image-photo/istanbul-turkey-july-15-2022-260nw-2180436519.jpg"},

    };

            Console.WriteLine("Caravans worden toegevoegd...");

            context.Caravans.AddRange(caravans);

            await context.SaveChangesAsync();

            Console.WriteLine("Caravans succesvol toegevoegd.");
        }

    }
}
