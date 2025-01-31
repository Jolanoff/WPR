using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Dtos.Schade;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "BackOfficeMedewerker")]

    public class SchademeldingenController : ControllerBase
    {
        private readonly SchademeldingenService _schadeService;

        public SchademeldingenController(SchademeldingenService schadeService)
        {
            _schadeService = schadeService;
        }

        [HttpGet("get_all")]
        public async Task<IActionResult> GetAllSchades()
        {
            try
            {
                var Schades = await _schadeService.GetAllSchadesAsync();
                if(Schades == null)
                {
                    return NotFound(new { message = "niks gevonden" });

                }
                return Ok(Schades);
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving Schades", details = ex.Message });
            }
        }

        [HttpPost("switch_status/{id}")]
        public async Task<IActionResult> SwitchStatus(int id, [FromQuery] string newStatus)
        {
            try
            {
                var updatedSchade = await _schadeService.SwitchSchadeStatusAsync(id, newStatus);
                if (updatedSchade == null)
                {
                    return NotFound(new { message = "Schade not found." });
                }
                return Ok(updatedSchade);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error switching status.", details = ex.Message });
            }
        }

        [HttpPost("report-schade")]
        public async Task<IActionResult> ReportSchade([FromBody] ReportSchadeDto schadeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _schadeService.ReportSchadeAsync(schadeDto.HuurAanvraagId, schadeDto.Beschrijving, schadeDto.Locatie);

            if (result)
            {
                return Ok(new { message = "Schade succesvol geregistreerd." });
            }

            return BadRequest(new { message = "Schade kon niet worden geregistreerd." });
        }



    }
}
