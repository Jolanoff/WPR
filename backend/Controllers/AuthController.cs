using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Models.Gebruiker;
using backend.Models.Klanten.Bedrijven;
using backend.Models.Klanten;
using backend.DbContext;
using backend.Dtos.Auth;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ApplicationsDbContext _context;

        public AuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            ApplicationsDbContext context
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Invalid input." });

            if (model.Role != "ParticuliereHuurder" && model.Role != "Bedrijf")
                return BadRequest(new { message = "Invalid role." });

            var existingUserName = await _userManager.FindByNameAsync(model.UserName);
            if (existingUserName != null)
                return BadRequest(new { message = "Username is already in use." });

            var existingEmail = await _userManager.FindByEmailAsync(model.Email);
            if (existingEmail != null)
                return BadRequest(new { message = "Email is already in use." });

            if (model.Role == "Bedrijf" && string.IsNullOrWhiteSpace(model.KvkNummer))
                return BadRequest(new { message = "KvK-nummer is required for a company." });

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                Adres = model.Address,
                Naam = model.Naam,
                initials = model.Initials
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "Account creation failed.",
                    errors = result.Errors.Select(e => e.Description).ToList()
                });
            }

            await _userManager.AddToRoleAsync(user, model.Role);

            if (model.Role == "Bedrijf")
            {
                AddBedrijf(user, model);
            }
            else if (model.Role == "ParticuliereHuurder")
            {
                AddParticuliereHuurder(user);
            }

            await _context.SaveChangesAsync();

            // Generate email confirmation token
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = HttpUtility.UrlEncode(token);

            var confirmationLink = $"http://localhost:5173/verify-email?userId={user.Id}&token={encodedToken}";

            // TODO: Send this confirmation link via email (e.g., using an email service like SendGrid or SMTP)
            Console.WriteLine($"Confirmation Link: {confirmationLink}");

            return Ok(new { message = $"Account created. Please verify your email address." });
        }

        private void AddBedrijf(User user, RegisterUserDto model)
        {
            var bedrijf = new Bedrijf
            {
                UserId = user.Id,
                KvkNummer = model.KvkNummer
            };
            _context.Bedrijven.Add(bedrijf);
        }

        private void AddParticuliereHuurder(User user)
        {
            var particulier = new ParticuliereHuurder
            {
                UserId = user.Id
            };
            _context.ParticuliereHuurders.Add(particulier);
        }

        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string userId, [FromQuery] string token)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(token))
                return BadRequest(new { message = "Invalid userId or token." });

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded)
                return BadRequest(new { message = "Email verification failed." });

            return Ok(new { message = "Email verified successfully." });
        }




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

            return Ok(new { message = "Login successful" });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "Logout successful" });
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> Me()
        {
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                Roles = roles
            });
        }

        [HttpGet("validate-session")]
        public IActionResult ValidateSession()
        {
            return Ok(new { isValid = User.Identity != null && User.Identity.IsAuthenticated });
        }
    }
}
