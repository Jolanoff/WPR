using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using System.Security.Claims;
using backend.Models.Gebruiker;
using Microsoft.AspNetCore.Identity;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VoertuigController : ControllerBase
    {
        private readonly VoertuigService _voertuigService;
    


        public VoertuigController(VoertuigService voertuigService)
        {
            _voertuigService = voertuigService;
        }


        public class DateRangeDto
        {
            public DateTime StartDatum { get; set; }
            public DateTime EindDatum { get; set; }
        }
        [HttpPost]
        public async Task<IActionResult> GetAllVoertuigen([FromBody] DateRangeDto dateRange)
        {
            try
            {
                // Get the authenticated user's ID from the claims
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Gebruiker niet geauthenticeerd." });
                }

                // Call the service method with the userId and date range
                var voertuigen = await _voertuigService.GetAllVoertuigenAsync(dateRange.StartDatum, dateRange.EindDatum, userId);

                if (voertuigen == null || !voertuigen.Any())
                {
                    return NotFound(new { message = "Geen voertuigen gevonden." });
                }

                return Ok(voertuigen);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
