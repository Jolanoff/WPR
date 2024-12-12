using System.Web;
using backend.DbContext;
using backend.Models.Gebruiker;
using backend.Models.Medewerkers;
using Microsoft.AspNetCore.Identity;

namespace backend.Services
{
    public class AdminService
    {
        private readonly ApplicationsDbContext _context;
        private readonly UserManager<User> _userManager;

        public AdminService(ApplicationsDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<string> AddMedewerkerAsync(string gebruikersnaam, string voornaam, string achternaam, string email, string functie, string role)
        {
            var newUser = new User
            {
                UserName = gebruikersnaam,
                Voornaam = voornaam,
                Achternaam = achternaam,
                Email = email,
                EmailConfirmed = false
            };
             var createUserResult = await _userManager.CreateAsync(newUser);
            if (!createUserResult.Succeeded)
            {
                throw new InvalidOperationException($"Gebruiker kon niet worden aangemaakt: {string.Join(", ", createUserResult.Errors.Select(e => e.Description))}");
            }
            if (!await _userManager.IsInRoleAsync(newUser, role))
            {
                await _userManager.AddToRoleAsync(newUser, role);
            }

            var medewerker = new Medewerker
            {
                Functie = role,
                UserId = newUser.Id,
                User = newUser

            };
            _context.Set<Medewerker>().Add(medewerker);
            await _context.SaveChangesAsync();

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            var encodedToken = HttpUtility.UrlEncode(token);
            var confirmationLink = $"http://localhost:5173/set-password?userId={newUser.Id}&token={encodedToken}";
            Console.WriteLine($"Verificatie-e-mail:{confirmationLink} ");
            return $"{functie} medewerker met email {email} succesvol toegevoegd.";
        }
        
    }
}
