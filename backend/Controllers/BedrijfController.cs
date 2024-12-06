using System.Security.Claims;
using backend.Dtos.Abonnement;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Bedrijf")]
    public class BedrijfController : ControllerBase
    {
        private readonly BedrijfService _bedrijfService;

        public BedrijfController(BedrijfService bedrijfService)
        {
            _bedrijfService = bedrijfService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAbonnementen()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Gebruiker niet geauthenticeerd." });

                var abonnementen = await _bedrijfService.GetAbonnementenAsync(userId);
                return Ok(abonnementen);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateAbonnement([FromBody] CreateAbonnementDto dto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Gebruiker niet geauthenticeerd." });

                var abonnement = await _bedrijfService.CreateAbonnementAsync(
                    userId,
                    dto.AbonnementType,
                    dto.Betaalmethode,
                    dto.StartDatum,
                    dto.EindDatum,
                    dto.Kosten
                );

                return Ok(abonnement);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
