using backend.Dtos.Admin;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _adminService;

        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }
        [HttpPost("voeg medewerker toe")]
        public async Task<IActionResult> AddMedewerker([FromBody] MaakMedewerkerDto dto)
        {
            try
            {
                var result = await _adminService.AddMedewerkerAsync(
                   dto.Gebruikersnaam,
                    dto.Voornaam,
                    dto.Achternaam,
                    dto.Email,
                    dto.Functie,
                    dto.Role
                );
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet("medewerkers")]
        public async Task<IActionResult> GetAllMedewerkers()
        {
            try
            {
                var medewerkers = await _adminService.GetAllMedewerkersAsync();
                return Ok(medewerkers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden tijdens het ophalen van medewerkers", details = ex.Message });
            }
        }
    }
}
