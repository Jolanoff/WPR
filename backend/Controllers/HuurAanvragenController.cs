using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class HuurAanvraagController : ControllerBase
{
    private readonly HuurAanvraagService _huurAanvraagService;

    public HuurAanvraagController(HuurAanvraagService huurAanvraagService)
    {
        _huurAanvraagService = huurAanvraagService;
    }
    [Authorize(Roles = "ParticuliereHuurder,ZakelijkeHuurder,Wagenparkbeheerder,Bedrijf")]
    [HttpPost("create")]
    public async Task<IActionResult> CreateHuurAanvraag([FromBody] CreateHuurAanvraagDto aanvraagDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            // Extract UserId from the authenticated user
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            var createdAanvraag = await _huurAanvraagService.CreateHuurAanvraagAsync(userId, aanvraagDto);
            return Created("", createdAanvraag);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
        }
    }

    [Authorize(Roles = "BackOfficeMedewerker,Admin")]
    [HttpGet("all")]
    public async Task<IActionResult> GetAllHuurAanvragen()
    {
        try
        {
            var huuraanvragen = await _huurAanvraagService.GetAllHuurAanvragenAsync();
            return Ok(huuraanvragen);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
        }
    }

    [Authorize(Roles = "BackOfficeMedewerker,Admin")]
    [HttpPatch("{id}/approve")]
    public async Task<IActionResult> ApproveHuurAanvraag(int id)
    {
        try
        {
            var updatedAanvraag = await _huurAanvraagService.ApproveHuurAanvraagAsync(id);
            return Ok(updatedAanvraag);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
        }
    }
    [Authorize(Roles = "BackOfficeMedewerker,Admin")]
    [HttpPatch("{id}/refuse")]
    public async Task<IActionResult> RefuseHuurAanvraag(int id, [FromBody] string reason)
    {
        if (string.IsNullOrWhiteSpace(reason))
        {
            return BadRequest(new { message = "The reason field is required." });
        }

        try
        {
            var updatedAanvraag = await _huurAanvraagService.RefuseHuurAanvraagAsync(id, reason);
            return Ok(updatedAanvraag);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
        }
    }
    [Authorize(Roles = "ParticuliereHuurder,ZakelijkeHuurder,Wagenparkbeheerder,Bedrijf")]
    [HttpGet("UserHuuraanvragen")]
    public async Task<IActionResult> GetHuurAanvragenForUser()
    {
        try
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "Gebruiker niet gevonden" });
            }
            var huuraanvragen = await _huurAanvraagService.GetHuurAanvragenForUserAsync(userId);

            if (huuraanvragen == null)
            {
                return NotFound(new { message = "geen huuraanvragen gevonden" });
            }
            return Ok(huuraanvragen);

        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
        }
    }


}
