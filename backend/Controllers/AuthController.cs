using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend.Models.Gebruiker;
using Microsoft.AspNetCore.Authorization;
using backend.Dtos.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Configuration;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        public AuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration) 
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("voeg-medewerker")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateEmployee([FromBody] VoegMedewerkerDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (model.Role != "BackOfficeMedewerker" && model.Role != "FrontOfficeMedewerker")
                return BadRequest("Ongeldige rol.");

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddToRoleAsync(user, model.Role);
            return Ok(new { message = $"Medewerker met rol {model.Role} aangemaakt!" });
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Ongeldige invoer." }); 

            if (model.Role != "ParticuliereHuurder" && model.Role != "Bedrijf")
                return BadRequest(new { message = "Ongeldige rol." }); 

            var existingUserName = await _userManager.FindByNameAsync(model.UserName);
            if (existingUserName != null)
                return BadRequest(new { message = "Gebruikersnaam is al in gebruik." }); 

            var existingEmail = await _userManager.FindByEmailAsync(model.Email);
            if (existingEmail != null)
                return BadRequest(new { message = "E-mailadres is al in gebruik." }); 

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(new { message = "Account aanmaken mislukt.", errors = result.Errors }); 

            await _userManager.AddToRoleAsync(user, model.Role);
            return Ok(new { message = $"Account aangemaakt met rol {model.Role}!" }); 
        }




        [HttpPost("maak-zakelijk-huurder")]
        [Authorize(Roles = "ZakelijkeKlant")]
        public async Task<IActionResult> CreateBusinessRenter([FromBody] MaakZakelijkHuurderDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddToRoleAsync(user, "ZakelijkeHuurder");
            return Ok(new { message = "Zakelijke huurder succesvol aangemaakt!" });
        }


        // POST: /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Invalid input." });

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password." });

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (!result.Succeeded)
                return Unauthorized(new { message = "Invalid email or password." });

            // Generate JWT Token
            var token = GenerateJwtToken(user);

            return Ok(new { token });
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Retrieve user's roles
            var roles = await _userManager.GetRolesAsync(user);

            // Create claims
            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id), // User ID
        new Claim(JwtRegisteredClaimNames.Email, user.Email), // Email
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // Unique token ID
    };

            // Add role claims
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            // Generate token
            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30), // Token lifetime
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        // POST: /api/auth/logout
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "Logout successful" });
        }

        // GET: /api/auth/me
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var userId = User?.Identity?.Name; // Get the currently logged-in user ID
            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return Unauthorized();

            return Ok(new
            {
                user.Id,
                user.Email,
                user.UserName
            });
        }
    }

   
}
