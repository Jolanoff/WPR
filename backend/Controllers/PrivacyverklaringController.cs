using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services; // Zorg dat je service toegevoegd wordt
using backend.Models; // Verwijs naar je model voor Privacyverklaring

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrivacyverklaringController : ControllerBase
    {
        private readonly PrivacyverklaringService _privacyService;

        public PrivacyverklaringController(PrivacyverklaringService privacyService)
        {
            _privacyService = privacyService;
        }

        // GET: api/privacyverklaring
        [HttpGet] 
        public async Task<IActionResult> GetPrivacyverklaring()
        {
            try
            {
                var privacyverklaring = await _privacyService.GetPrivacyverklaringAsync();
                if (privacyverklaring == null)
                {
                    return NotFound(new { message = "Privacyverklaring niet gevonden." });
                }
                return Ok(privacyverklaring);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Fout bij het ophalen van de privacyverklaring.", details = ex.Message });
            }
        }

        [HttpPut]
        [Authorize(Roles = "Admin,BackOfficeMedewerker")]
        public async Task<IActionResult> UpdatePrivacyverklaring([FromBody] string nieuweTekst)
        {
            try
            {
                var updatedPrivacyverklaring = await _privacyService.UpdatePrivacyverklaringAsync(nieuweTekst);
                return Ok(updatedPrivacyverklaring);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Fout bij het bijwerken van de privacyverklaring.", details = ex.Message });
            }
        }
    }
}
