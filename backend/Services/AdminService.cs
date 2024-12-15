using System.Web;
using backend.DbContext;
using backend.Dtos.Admin;
using backend.Models.Gebruiker;
using backend.Models.Medewerkers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AdminService
    {
        private readonly ApplicationsDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly EmailService _emailService;
        public AdminService(ApplicationsDbContext context, UserManager<User> userManager, EmailService emailService)
        {
            _context = context;
            _userManager = userManager;
            _emailService = emailService;
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
            var emailBody = $"Hello {voornaam},<br><br>Please confirm your email by clicking the link below:<br>" +
                        $"<a href='{confirmationLink}'>Confirm Email</a>";

            await _emailService.SendEmailAsync(email, "Confirm your email", emailBody);


            Console.WriteLine($"Verificatie-e-mail:{confirmationLink} ");
            return $"{functie} medewerker met email {email} succesvol toegevoegd.";
        }

        
        public async Task<List<MedewerkerDto>> GetAllMedewerkersAsync()
        {
            return await _context.Set<Medewerker>()
            .Include(m => m.User)
            .Select(m => new MedewerkerDto
            {
                Gebruikersnaam = m.User.UserName,
                Voornaam = m.User.Voornaam,
                Achternaam = m.User.Achternaam,
                Email = m.User.Email,
                Functie = m.Functie
            })
            .ToListAsync();
        }
    }
}
