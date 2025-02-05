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
        [HttpPost("add-medewerker")]
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
                    dto.Role,
                    dto.Locatie

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
                return StatusCode(500, new { message = "Error retrieving medewerkers", details = ex.Message });
            }
        }
        [HttpDelete("delete-medewerker/{email}")]
        public async Task<IActionResult> DeleteMedewerker(string email)
        {
            try
            {
                bool success = await _adminService.DeleteMedewerkerAsync(email);
                if (success)
                    return Ok(new { message = "Medewerker succesvol verwijderd." });

                return BadRequest(new { message = "Verwijdering mislukt." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden.", error = ex.Message });
            }
        }


    }
}
