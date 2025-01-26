using System.Security.Claims;
using backend.Dtos.Profiel;
using backend.Models.Gebruiker;
using backend.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly UserManager<User> _gebruikersManager;

        public AccountController(AccountService accountService, UserManager<User> gebruikersManager)
        {
            _accountService = accountService;
            _gebruikersManager = gebruikersManager;
        }

        [HttpGet("Account")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var profile = await _accountService.GetProfileAsync(userId);
            return profile != null ? Ok(profile) : NotFound(new { message = "Gebruiker niet gevonden" });
        }

        [HttpPut("Account")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                );
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var (success, message) = await _accountService.UpdateProfile(userId, dto);
            return success
                ? Ok(new { message })
                : BadRequest(new { message });
        }

        [HttpDelete("Account")]
        [Authorize]
        public async Task<IActionResult> DeleteAccount()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var success = _accountService.DeleteAccount(userId);
            if (success)
            {
                await HttpContext.SignOutAsync();
                return Ok(new { message = "Account succesvol verwijdert" });
            }

            return BadRequest(new { message = "Niet gelukt om account te verwijderen" });
        }

        [HttpPut("Account/ChangePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var success = await _accountService.ChangePasswordAsync(userId, dto);
            return success ? Ok(new { message = "Wachtwoord succesvol verandert" }) : BadRequest(new { message = "Niet gelukt om wachtwoord aan te passen" });
        }

        [Authorize]
        [HttpGet("role")]
        public async Task<IActionResult> GetUserRole()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                    return Unauthorized(new { message = "Gebruiker is niet geauthenticeerd" });

                var user = await _gebruikersManager.FindByIdAsync(userId);
                if (user == null)
                    return NotFound(new { message = "Gebruiker niet gevonden" });

                var roles = await _gebruikersManager.GetRolesAsync(user);
                return Ok(new { roles });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
