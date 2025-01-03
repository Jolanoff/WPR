using System.ComponentModel.DataAnnotations;
using backend.DbContext;
using Microsoft.AspNetCore.Mvc;

using backend.Models.Voertuigen;
using backend.Dtos.Aanvragen;
using backend.Models.Aanvragen;

[ApiController]
[Route("api/vehicle")]
public class VoertuigInnameController : ControllerBase
{
    private readonly ApplicationsDbContext _context;

    public VoertuigInnameController(ApplicationsDbContext context)
    {
        _context = context;
    }

    [HttpPost("intake")]
public IActionResult RegisterVehicleIntake([FromForm] InnameDTO request)
{
    try
    {
        // Zoek het voertuig op basis van VoertuigId
        var voertuig = _context.Voertuigen.FirstOrDefault(v => v.Id == request.VoertuigId);
        if (voertuig == null)
        {
            return BadRequest(new { message = "Voertuig bestaat niet." });
        }

        // Inname object maken zonder voertuigstatus bij te werken
        var intake = new Inname
        {
            VoertuigId = request.VoertuigId,
            Remarks = request.Remarks,
            DamagePhotos = string.Join(",", request.Photos?.Select(p => p.FileName) ?? new string[0]),
            IntakeDate = DateTime.Now,
            Status = request.Status // Bewaar de status van de inname
        };

        // Opslaan van inname
        _context.Innames.Add(intake);
        _context.SaveChanges();

        

        return Ok(new { message = "Inname succesvol geregistreerd.", data = intake });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = "Er is een fout opgetreden.", error = ex.Message });
    }
}
}
