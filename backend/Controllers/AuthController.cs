using backend.Dtos.Auth;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto model)
        {
            if (!ModelState.IsValid)
            return BadRequest(new { message = "Invalid input." });

            var (success, message) = await _authService.RegisterUserAsync(model);
            return success ? Ok(new { message }) : BadRequest(new { message });
        }

        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string userId, [FromQuery] string token)
        {
            var success = await _authService.VerifyEmailAsync(userId, token);
            return success ? Ok(new { message = "Email verified successfully." }) : BadRequest(new { message = "Email verification failed." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var (success, message) = await _authService.LoginAsync(model);
            return success ? Ok(new { message }) : Unauthorized(new { message });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authService.LogoutAsync();
            return Ok(new { message = "Logout successful" });
        }
    }
}
