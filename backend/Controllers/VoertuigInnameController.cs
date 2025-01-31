using System.ComponentModel.DataAnnotations;
using backend.DbContext;
using Microsoft.AspNetCore.Mvc;

using backend.Models.Voertuigen;
using backend.Dtos.Aanvragen;
using backend.Models.Aanvragen;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("api/vehicle")]
public class VoertuigInnameController : ControllerBase
{
    private readonly ApplicationsDbContext _context;

    public VoertuigInnameController(ApplicationsDbContext context)
    {
        _context = context;
    }
    
// GET /vehicle/pending: Fetch vehicles with "Pending" status
    [HttpGet("innamen")]
    public IActionResult GetInnamen()
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

        var innamen = _context.Innames
            .Where(i => i.Status == "Pending" && i.Voertuig.Locatie == locatie)
            .Select(i => new
            {
                i.Id,
                i.VoertuigId,
                KlantNaam = i.KlantNaam,
                i.Remarks,
                i.IntakeDate,
                i.Status,
                i.KlantId,
                i.IssueDate,
                i.ToDate
            })
            .ToList();

        if (innamen == null || innamen.Count == 0)
        {
            return NotFound(new { message = "Geen voertuigen in behandeling." });
        }

        return Ok(innamen);
    }


    // POST /vehicle/intake: Registreer een voertuig inname
    [HttpPost("intake")]
    public IActionResult RegisterVehicleIntake([FromForm] InnameDTO request)
    {
        try
        {
            var voertuig = _context.Voertuigen.FirstOrDefault(v => v.Id == request.VoertuigId);
            if (voertuig == null)
            {
                return BadRequest(new { message = "Voertuig bestaat niet." });
            }

            var intake = new Inname
            {
                VoertuigId = request.VoertuigId,
                Remarks = request.Remarks,
                IntakeDate = DateTime.Now,
                Status = request.Status
            };

            _context.Innames.Add(intake);
            _context.SaveChanges();

            return Ok(new { message = "Inname succesvol geregistreerd.", data = intake });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Er is een fout opgetreden.", error = ex.Message });
        }
    }
    

[HttpPatch("intake/update/{id}")]
public IActionResult UpdateVehicleIntake(int id, [FromForm] UpdateInnameDTO request)
{
    try
    {
        var intake = _context.Innames.Include(i => i.Voertuig).FirstOrDefault(i => i.Id == id);
        if (intake == null)
        {
            return NotFound(new { message = "Inname niet gevonden." });
        }

        // Update de issueDate naar de huidige tijd als deze niet wordt meegegeven in de request
        intake.IssueDate = request.IssueDate ?? DateTime.Now;

        if (request.ToDate.HasValue)
        {
            intake.ToDate = request.ToDate.Value;  // Wijzig toDate
        }

        // Update de status en opmerkingen
        intake.Status = request.Status ?? intake.Status;
        intake.Remarks = request.Remarks ?? intake.Remarks;

        // Foto's verwerken
        if (request.Photos != null && request.Photos.Any())
        {
            string uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            intake.PhotoPaths = new List<string>();
            foreach (var photo in request.Photos)
            {
                string fileName = $"{Guid.NewGuid()}_{photo.FileName}";
                string filePath = Path.Combine(uploadPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    photo.CopyTo(stream);
                }

                intake.PhotoPaths.Add($"/uploads/{fileName}");
            }
        }

        _context.Innames.Update(intake);
        _context.SaveChanges();

        return Ok(new { message = "Inname succesvol bijgewerkt.", data = intake });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = "Er is een fout opgetreden.", error = ex.Message });
    }
}


[HttpGet("intake/{id}")]
public IActionResult GetVehicleIntake(int id)
{
    try
    {
        var intake = _context.Innames
            .Include(i => i.Voertuig)
            .FirstOrDefault(i => i.Id == id);

        if (intake == null)
        {
            return NotFound(new { message = "Inname niet gevonden." });
        }

        // Return intake details, including intakeDate and toDate
        return Ok(new 
        { 
            intake.IntakeDate, 
            intake.ToDate, 
            intake.Status, 
            intake.Remarks, 
            intake.PhotoPaths 
        });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = "Er is een fout opgetreden.", error = ex.Message });
    }
}


}
