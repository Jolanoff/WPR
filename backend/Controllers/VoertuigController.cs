using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services;

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

        [HttpGet]
        public async Task<IActionResult> GetAllVoertuigen()
        {
            try
            {
                var voertuigen = await _voertuigService.GetAllVoertuigenAsync();
                if (voertuigen == null || !voertuigen.Any())
                    return NotFound(new { message = "Geen voertuigen gevonden." });

                return Ok(voertuigen);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
