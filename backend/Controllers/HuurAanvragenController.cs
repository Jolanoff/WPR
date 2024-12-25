using backend.Models.Aanvragen;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HuurAanvragenController : ControllerBase
    {
        private readonly HuurAanvraagService _huurAanvraagService;

        public HuurAanvragenController(HuurAanvraagService huurAanvraagService)
        {
            _huurAanvraagService = huurAanvraagService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateHuurAanvraag([FromBody] HuurAanvraag huurAanvraag)
        {
            try
            {
                var createdHuurAanvraag = await _huurAanvraagService.CreateHuurAanvraagAsync(huurAanvraag);
                return Ok(new { message = "HuurAanvraag succesvol aangemaakt.", aanvraagId = createdHuurAanvraag.Id });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden bij het maken van de HuurAanvraag.", details = ex.Message });
            }
        }
    }
}
