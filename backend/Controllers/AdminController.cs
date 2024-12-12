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
                    dto.Role
                );
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
    }
}
