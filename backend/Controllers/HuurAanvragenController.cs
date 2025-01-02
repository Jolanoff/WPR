using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Dtos;

[Authorize(Roles = "ParticuliereHuurder,ZakelijkeHuurder,Wagenparkbeheerder,Bedrijf")]
[ApiController]
[Route("api/[controller]")]
public class HuurAanvraagController : ControllerBase
{
    private readonly HuurAanvraagService _huurAanvraagService;

    public HuurAanvraagController(HuurAanvraagService huurAanvraagService)
    {
        _huurAanvraagService = huurAanvraagService;
    }

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
}
