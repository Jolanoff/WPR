using Microsoft.AspNetCore.Mvc;
using backend.Models.Voertuigen; 
using System.ComponentModel.DataAnnotations;
using backend.DbContext;
using backend.Models.Aanvragen;
using backend.Dtos.Aanvragen;
using System.Security.Claims;


[ApiController]
[Route("api/vehicle")]
public class VoertuigUitgiftenController : ControllerBase
{
    private readonly ApplicationsDbContext _context;


    public VoertuigUitgiftenController(ApplicationsDbContext context)
    {
        _context = context;
    }

    [HttpGet("uitgiften")]
    public IActionResult GetUitgiften()
    {

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized(new { message = "Gebruiker niet geauthenticeerd" });
        }

        var medewerker = _context.Medewerkers
            .FirstOrDefault(m => m.UserId == userId);

        if (medewerker == null)
        {
            return NotFound(new { message = "Frontoffice medewerker niet gevonden" });
        }

        var locatie = medewerker.Locatie; 

        var uitgiften = _context.Uitgiften
            .Where(u => u.Status == "Klaar om opgehaald te worden" && u.Voertuig.Locatie == locatie)
            .Select(u => new
            {
                u.Id,
                u.CustomerName,
                u.VoertuigId,
                u.KlantId,
                u.Status,
                u.Voertuig,
                IssueDate = u.IssueDate.Date,
                ToDate = u.ToDate.Date
            })
            .ToList();

        return Ok(uitgiften);
    }

    [HttpGet("uitgifte/{id}")]
    public IActionResult GetUitgifteById(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized(new { message = "Gebruiker niet geauthenticeerd" });
        }

        var medewerker = _context.Medewerkers
            .FirstOrDefault(m => m.UserId == userId);

        if (medewerker == null)
        {
            return NotFound(new { message = "Frontoffice medewerker niet gevonden" });
        }

        var locatie = medewerker.Locatie;

        var uitgifte = _context.Uitgiften
            .Where(u => u.Id == id && u.Voertuig.Locatie == locatie) 
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
            return NotFound(new { message = "Uitgifte niet gevonden of niet beschikbaar voor uw locatie" });
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
        KlantId = request.KlantId, 
        
    };
    uitgifte.Status = "Geaccepteerd";
    _context.Uitgiften.Update(uitgifte);

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




