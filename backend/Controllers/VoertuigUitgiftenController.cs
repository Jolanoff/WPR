using Microsoft.AspNetCore.Mvc;
using backend.Models.Voertuigen;  // Zorg ervoor dat de juiste namespaces worden geïmporteerd
using System.ComponentModel.DataAnnotations;
using backend.DbContext;

[ApiController]
[Route("api/vehicle")]
public class VoertuigUitgiftenController : ControllerBase
{
    private readonly ApplicationsDbContext _context;

    // Constructor om de DbContext te injecteren
    public VoertuigUitgiftenController(ApplicationsDbContext context)
    {
        _context = context;
    }

    [HttpPost("issue")]
    public IActionResult RegisterVehicleIssue([FromBody] VehicleIssueRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { message = "Ongeldige invoer", errors = ModelState });
        }

        try
        {
            // Maak een nieuw Uitgifte object
            var issuedVehicle = new Uitgifte
            {
                CustomerName = request.CustomerName,
                VoertuigId = request.VoertuigId,
                Remarks = request.Remarks,
                IssueDate = DateTime.Now,
                Status = "Uitgegeven"
            };

            // Log de ontvangen request voor debugging
            Console.WriteLine($"Request ontvangen: {request.CustomerName}, {request.VoertuigId}, {request.Remarks}");

            // Zoek het voertuig in de drie tabellen: Autos, Campers en Caravans
            Voertuig voertuig = _context.Autos
                .FirstOrDefault(a => a.Id == request.VoertuigId);

            if (voertuig == null)
            {
                voertuig = _context.Campers
                    .FirstOrDefault(c => c.Id == request.VoertuigId);
            }

            if (voertuig == null)
            {
                voertuig = _context.Caravans
                    .FirstOrDefault(c => c.Id == request.VoertuigId);
            }

            if (voertuig == null)
            {
                // Als het voertuig niet bestaat, stuur een foutmelding
                Console.WriteLine("Fout: Voertuig bestaat niet.");
                return BadRequest(new { message = "Voertuig bestaat niet." });
            }

            // Voeg de uitgifte toe aan de database
            _context.Uitgiften.Add(issuedVehicle);
            _context.SaveChanges();

            // Log het succes
            Console.WriteLine($"Uitgifte succesvol geregistreerd voor voertuig {issuedVehicle.VoertuigId}");

            // Retourneer een succesbericht met de data
            return Ok(new { message = "Uitgifte succesvol geregistreerd", data = issuedVehicle });
        }
        catch (Exception ex)
        {
            // Log de fout als er een uitzondering optreedt
            Console.WriteLine($"Er is een fout opgetreden: {ex.Message}");

            // Retourneer een interne serverfout als er een uitzondering optreedt
            return StatusCode(500, new { message = "Er is een fout opgetreden", error = ex.Message });
        }
    }
}

// Request class voor de API (DTO)
public class VehicleIssueRequest
{
    [Required]
    [StringLength(100)]
    public string CustomerName { get; set; }

    [Required]
    public int VoertuigId { get; set; }  // Verander dit naar int als het voertuigId een integer is

    [StringLength(500)]
    public string Remarks { get; set; }
}

// Uitgifte class (model)
public class Uitgifte
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public int VoertuigId { get; set; }
    public string Remarks { get; set; }
    public DateTime IssueDate { get; set; }
    public string Status { get; set; }

    // Relatie met Voertuig
    public Voertuig Voertuig { get; set; }  // Relatie naar Voertuig
}
