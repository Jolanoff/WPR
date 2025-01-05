using System.ComponentModel.DataAnnotations;
using backend.DbContext;
using Microsoft.AspNetCore.Mvc;

using backend.Models.Voertuigen;
using backend.Dtos.Aanvragen;
using backend.Models.Aanvragen;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/vehicle")]
public class VoertuigInnameController : ControllerBase
{
    private readonly ApplicationsDbContext _context;

    public VoertuigInnameController(ApplicationsDbContext context)
    {
        _context = context;
    }
    
[HttpGet("pending")]
public IActionResult GetPendingIntakes()
{
    var pendingIntakes = _context.Innames
        .Where(i => i.Status == "Pending")
        .Include(i => i.Voertuig) // Voeg voertuig details toe
        .Select(i => new
        {
            i.Id,
            i.VoertuigId,
            i.Remarks,
            
            i.IntakeDate,
            i.Status,
            i.KlantId,
             
            i.IssueDate,
            i.ToDate
        })
        .ToList();

    if (pendingIntakes == null || pendingIntakes.Count == 0)
    {
        return NotFound(new { message = "Geen voertuigen in behandeling." });
    }

    return Ok(pendingIntakes);
}


    // GET /vehicle/returned: Haal voertuigen op die moeten worden ingeleverd
    [HttpGet("returned")]
    public IActionResult GetReturnedVehicles()
    {
        var returnedVehicles = _context.Innames
            .Where(i => i.Status == "Teruggebracht")
            .Include(i => i.Voertuig) // Voeg voertuig details toe
            .ToList();

        if (returnedVehicles == null || returnedVehicles.Count == 0)
        {
            return NotFound(new { message = "Geen voertuigen om in te nemen." });
        }

        return Ok(returnedVehicles);
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

    // PATCH /vehicle/intake/{id}: Werk de status van de inname bij en voeg opmerkingen toe
    [HttpPatch("intake/{id}")]
    public IActionResult UpdateIntakeStatus(int id, [FromBody] UpdateInnameDTO request)
    {
        try
        {
            var intake = _context.Innames.FirstOrDefault(i => i.Id == id);
            if (intake == null)
            {
                return NotFound(new { message = "Inname niet gevonden." });
            }

            intake.Status = request.Status ?? intake.Status; // Als geen nieuwe status wordt gegeven, blijft de oude
            intake.Remarks = request.Remarks ?? intake.Remarks; // Zelfde voor opmerkingen

            _context.Innames.Update(intake);
            _context.SaveChanges();

            return Ok(new { message = "Inname succesvol bijgewerkt.", data = intake });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Er is een fout opgetreden.", error = ex.Message });
        }
    }
}
