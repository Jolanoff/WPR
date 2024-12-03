using backend.DbContext;
using backend.Dtos.Auth;
using backend.Models.Gebruiker;
using backend.Models.Klanten;
using backend.Models.Klanten.Bedrijven;
using Microsoft.AspNetCore.Identity;
using System.Web;

namespace backend.Services
{
    public class AuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ApplicationsDbContext _context;

        public AuthService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            ApplicationsDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        public async Task<(bool Success, string Message)> RegisterUserAsync(RegisterUserDto model)
        {
            if (!new[] { "ParticuliereHuurder", "Bedrijf" }.Contains(model.Role))
                return (false, "Invalid role.");

            if (await _userManager.FindByNameAsync(model.UserName) != null)
                return (false, "Username is already in use.");

            if (await _userManager.FindByEmailAsync(model.Email) != null)
                return (false, "Email is already in use.");

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                Voornaam = model.Voornaam,
                Achternaam = model.Achternaam,
                initials = model.Initials
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return (false, "Account creation failed.");

            await _userManager.AddToRoleAsync(user, model.Role);

            var klant = new Klant
            {
                UserId = user.Id,
                Straatnaam = model.Straatnaam,
                Huisnummer = model.Huisnummer ?? 0,
                KlantType = model.Role
            };

            _context.Klanten.Add(klant);
            await _context.SaveChangesAsync(); 

            if (model.Role == "Bedrijf")
            {
                var bedrijf = new Bedrijf
                {
                    KlantId = klant.Id, 
                    KvkNummer = model.KvkNummer
                };
                _context.Bedrijven.Add(bedrijf);
            }

            if (model.Role == "ParticuliereHuurder")
            {
                var particulier = new ParticuliereHuurder
                {
                    KlantId = klant.Id 
                };
                _context.ParticuliereHuurders.Add(particulier);
            }

            await _context.SaveChangesAsync(); 

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = HttpUtility.UrlEncode(token);
            var confirmationLink = $"http://localhost:5173/verify-email?userId={user.Id}&token={encodedToken}";
            Console.WriteLine($"Confirmation Link: {confirmationLink}");

            return (true, "Account created. Please verify your email address.");
        }

        public async Task<bool> VerifyEmailAsync(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return false;

            var result = await _userManager.ConfirmEmailAsync(user, token);
            return result.Succeeded;
        }

        public async Task<(bool Success, string Message)> LoginAsync(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return (false, "Invalid email or password.");

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (!result.Succeeded)
                return (false, "Invalid email or password.");

            return (true, "Login successful");
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
