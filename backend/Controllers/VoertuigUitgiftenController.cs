using Microsoft.AspNetCore.Mvc;
using backend.Models.Voertuigen;  // Zorg ervoor dat de juiste namespaces worden geïmporteerd
using System.ComponentModel.DataAnnotations;
using backend.DbContext;
using backend.Models.Aanvragen;

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

    // Endpoint voor het ophalen van uitgiften
    [HttpGet("uitgiften")]
    public IActionResult GetUitgiften()
    {
        var uitgiften = _context.Uitgiften
            
            .Select(u => new {
                u.Id,
                u.CustomerName,
                u.VoertuigId,
                u.Remarks
            })
            .ToList();

        return Ok(uitgiften);
    }

    
    
[HttpGet("uitgifte/{id}")]
public IActionResult GetUitgifteById(int id)
{
    var uitgifte = _context.Uitgiften
        .Where(u => u.Id == id)
        .Select(u => new
        {
            u.CustomerName,
            u.VoertuigId,
            u.Remarks,
            FromDate = u.IssueDate.ToString("yyyy-MM-dd"),
            ToDate = u.ToDate.ToString("yyyy-MM-dd")
        })
        .FirstOrDefault();

    if (uitgifte == null)
    {
        return NotFound(new { message = "Uitgifte niet gevonden" });
    }

    return Ok(uitgifte);
}
[HttpPost("accept/{id}")]
public IActionResult AcceptUitgifte(int id, [FromBody] AcceptUitgifteRequest request)
{
    // Controleer of het model voldoet aan de validatie
    if (!ModelState.IsValid)
    {
        return BadRequest(new { message = "Ongeldige invoer", errors = ModelState });
    }

    // Zoek de uitgifte op basis van het ID
    var uitgifte = _context.Uitgiften.FirstOrDefault(u => u.Id == id);

    if (uitgifte == null)
    {
        return NotFound(new { message = "Uitgifte niet gevonden" });
    }

    try
{
    // Verwerk de aanvraag met de gegevens uit het request
    var newInname = new Inname
    {
        VoertuigId = request.VoertuigId,
        KlantNaam = request.CustomerName,
        Remarks = request.Remarks,
        IssueDate = DateTime.Now, // Stel de IssueDate in op de huidige datum
        Status = "Pending", // Stel een standaard status in
        IntakeDate = request.FromDate,
        ToDate = request.ToDate,
        KlantId = request.KlantId, // Dit moet later worden ingevuld, mogelijk met een klant-ID
        VoertuigNaam = "Onbekend Voertuig" // Dit kan later worden ingevuld, bijvoorbeeld door op de VoertuigId te zoeken
    };

    // Voeg de inname toe aan de database
    _context.Innames.Add(newInname);

    // Sla de wijzigingen op in de database
    _context.SaveChanges();

    return Ok(new { message = "Uitgifte geaccepteerd en nieuwe inname geregistreerd" });
}
catch (Exception ex)
{
    // Log de fout
    
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
    public int KlantId{get; set;}
    public int VoertuigId { get; set; }
    public string Remarks { get; set; }
    public DateTime IssueDate { get; set; }
    public string Status { get; set; }
    public DateTime ToDate {get; set;}

    // Relatie met Voertuig
    public Voertuig Voertuig { get; set; }  // Relatie naar Voertuig
}

public class AcceptUitgifteRequest //DTO voor de uitgifte model
{
    [Required]
    [StringLength(100)]
    public string CustomerName { get; set; }

    [Required]
    public int KlantId {get; set;} 

    [Required]
    public int VoertuigId { get; set; }

    [Required]
    public DateTime FromDate { get; set; }

    [Required]
    public DateTime ToDate { get; set; }

    [StringLength(500)]
    public string Remarks { get; set; }
}

