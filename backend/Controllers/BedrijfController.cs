using System.Security.Claims;
using backend.Dtos.Abonnement;
using backend.Dtos.Bedrijf;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class BedrijfController : ControllerBase
    {
        private readonly BedrijfService _bedrijfService;

        private readonly BedrijfMedewerkerService _bedrijfMedewerkerService;

        public BedrijfController(BedrijfService bedrijfService, BedrijfMedewerkerService bedrijfMedewerkerService)
        {
            _bedrijfService = bedrijfService;
            _bedrijfMedewerkerService = bedrijfMedewerkerService;
        }

        [HttpGet]
        [Authorize(Roles = "Bedrijf")]
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
        [HttpDelete("cancel")]
        [Authorize(Roles = "Bedrijf")]
        public async Task<IActionResult> CancelAbonnement()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Gebruiker niet geauthenticeerd." });

                var success = await _bedrijfService.CancelAbonnementAsync(userId);
                return success ? Ok(new { message = "Abonnement succesvol geannuleerd." }) : BadRequest(new { message = "Annuleren mislukt." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPut("update")]
        [Authorize(Roles = "Bedrijf")]
        public async Task<IActionResult> UpdateAbonnement([FromBody] UpdateAbonnementDto dto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Gebruiker niet geauthenticeerd." });

                var updatedAbonnement = await _bedrijfService.UpdateAbonnementAsync(userId, dto.AbonnementType, dto.Betaalmethode);
                return Ok(updatedAbonnement);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



        [HttpPost]
        [Authorize(Roles = "Bedrijf")]
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
                    dto.StartDatum
                  
                );

                return Ok(abonnement);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("toevoegen-bedrijf-medewerker")]
        [Authorize(Roles = "Bedrijf,Wagenparkbeheerder")]
        public async Task<IActionResult> AddBedrijfMedewerker([FromBody] ToevoegenBedrijfMedewerkerDto dto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                    return Unauthorized(new { message = "Gebruiker niet geauthenticeerd." });

                var userRoles = User.FindAll(ClaimTypes.Role).Select(role => role.Value).ToList();

                // Allow only "Bedrijf" to add any role
                if (userRoles.Contains("Bedrijf"))
                {
                    var result = await _bedrijfMedewerkerService.AddBedrijfMedewerkerAsync(userId, dto.Email, dto.Role);
                    return Ok(new { message = result });
                }

                // Allow "Wagenparkbeheerder" to add only ZakelijkeHuurder
                if (userRoles.Contains("Wagenparkbeheerder") && dto.Role == "ZakelijkeHuurder")
                {
                    var result = await _bedrijfMedewerkerService.AddBedrijfMedewerkerAsync(userId, dto.Email, "ZakelijkeHuurder");
                    return Ok(new { message = result });
                }

                return Forbid(); // If neither role is valid for the requested action
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("verwijderen-bedrijf-medewerker/{medewerkerId}")]
        [Authorize(Roles = "Bedrijf,Wagenparkbeheerder")]
        public async Task<IActionResult> RemoveBedrijfMedewerker(int medewerkerId)
        {
            try
            {
                var result = await _bedrijfMedewerkerService.RemoveBedrijfMedewerkerAsync(User.Identity.Name, medewerkerId);
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("medewerkers")]
        [Authorize(Roles = "Bedrijf,Wagenparkbeheerder")]

        public async Task<IActionResult> GetAllMedewerkers()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Gebruiker niet geauthenticeerd." });

                var medewerkers = await _bedrijfMedewerkerService.GetAllMedewerkersAsync(userId);
                return Ok(medewerkers);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


    }
}
