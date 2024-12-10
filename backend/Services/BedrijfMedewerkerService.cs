using System.Web;
using backend.DbContext;
using backend.Models.Gebruiker;
using backend.Models.Klanten;
using backend.Models.Klanten.Bedrijven;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class BedrijfMedewerkerService
    {
        private readonly ApplicationsDbContext _context;
        private readonly UserManager<User> _userManager;


        public BedrijfMedewerkerService(ApplicationsDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        private async Task<int?> GetBedrijfIdFromUser(string userId)
        {
            // Check if the user is directly associated with a bedrijf
            var klant = await _context.Klanten
                .Include(k => k.Bedrijf)
                .FirstOrDefaultAsync(k => k.UserId == userId);

            if (klant?.Bedrijf != null)
                return klant.Bedrijf.Id;

            // Check if the user is a Wagenparkbeheerder
            var beheerder = await _context.WagenparkBeheerders
                .FirstOrDefaultAsync(w => w.Klant.UserId == userId);

            if (beheerder != null)
                return beheerder.BedrijfId;

            return null;
        }

        public async Task<string> AddBedrijfMedewerkerAsync(string userId, string medewerkerEmail, string role)
        {
            // Fetch Bedrijf based on the user's role
            var bedrijfId = await GetBedrijfIdFromUser(userId);
            if (bedrijfId == null)
                throw new ArgumentException("Geen bedrijf gevonden voor deze gebruiker.");

            // Create a new User for the medewerker
            var newUser = new User
            {
                Email = medewerkerEmail,
                UserName = medewerkerEmail,
                EmailConfirmed = false
            };

            var createUserResult = await _userManager.CreateAsync(newUser);
            if (!createUserResult.Succeeded)
                throw new InvalidOperationException($"Gebruiker kon niet worden aangemaakt: {string.Join(", ", createUserResult.Errors.Select(e => e.Description))}");

            // Assign role to the new user
            if (!await _userManager.IsInRoleAsync(newUser, role))
                await _userManager.AddToRoleAsync(newUser, role);

            // Add the medewerker to the appropriate table
            var newKlant = new Klant
            {
                User = newUser,
                Straatnaam = "Onbekend", // Default value
                Huisnummer = 0,          // Default value
                KlantType = role
            };
            _context.Klanten.Add(newKlant);

            if (role == "Wagenparkbeheerder")
            {
                var newBeheerder = new WagenparkBeheerder
                {
                    Klant = newKlant,
                    BedrijfId = bedrijfId.Value
                };
                _context.WagenparkBeheerders.Add(newBeheerder);
            }
            else if (role == "ZakelijkeHuurder")
            {
                var newHuurder = new ZakelijkeHuurder
                {
                    Klant = newKlant,
                    BedrijfId = bedrijfId.Value
                };
                _context.ZakelijkeHuurders.Add(newHuurder);
            }
            else
            {
                throw new ArgumentException("Ongeldige rol opgegeven.");
            }

            await _context.SaveChangesAsync();

            // Send verification email
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            var encodedToken = HttpUtility.UrlEncode(token);
            var confirmationLink = $"http://localhost:5173/set-password?userId={newUser.Id}&token={encodedToken}";
            await SendVerificationEmailAsync(medewerkerEmail, confirmationLink);

            return $"{role} {medewerkerEmail} succesvol toegevoegd.";
        }

        public async Task<string> RemoveBedrijfMedewerkerAsync(string userId, int medewerkerId)
        {
            // Fetch Bedrijf based on the user's role
            var bedrijfId = await GetBedrijfIdFromUser(userId);
            if (bedrijfId == null)
                throw new ArgumentException("Geen bedrijf gevonden voor deze gebruiker.");

            // Check if the medewerker is a WagenparkBeheerder
            var beheerder = await _context.WagenparkBeheerders
                .FirstOrDefaultAsync(w => w.Id == medewerkerId && w.BedrijfId == bedrijfId.Value);

            if (beheerder != null)
            {
                _context.WagenparkBeheerders.Remove(beheerder);
                await _context.SaveChangesAsync();
                return $"Wagenparkbeheerder succesvol verwijderd.";
            }

            // Check if the medewerker is a ZakelijkeHuurder
            var huurder = await _context.ZakelijkeHuurders
                .FirstOrDefaultAsync(z => z.Id == medewerkerId && z.BedrijfId == bedrijfId.Value);

            if (huurder != null)
            {
                _context.ZakelijkeHuurders.Remove(huurder);
                await _context.SaveChangesAsync();
                return $"ZakelijkeHuurder succesvol verwijderd.";
            }

            throw new ArgumentException("Medewerker niet gevonden onder dit bedrijf.");
        }

        private async Task SendVerificationEmailAsync(string email, string link)
        {
            // Replace with your email sending logic
            Console.WriteLine($"Verificatie-e-mail verzonden naar {email} met link: {link}");
        }

        public async Task<List<object>> GetAllMedewerkersAsync(string userId)
        {

            var bedrijfId = await GetBedrijfIdFromUser(userId);
            if (bedrijfId == null)
                throw new ArgumentException("Geen bedrijf gevonden voor deze gebruiker.");


            var wagenparkbeheerders = await _context.WagenparkBeheerders
                .Where(w => w.BedrijfId == bedrijfId)
                .Select(w => new
                {
                    Id = w.Id,
                    Email = w.Klant.User.Email,
                    Role = "Wagenparkbeheerder",
                    Straatnaam = w.Klant.Straatnaam,
                    Huisnummer = w.Klant.Huisnummer
                })
                .ToListAsync();

            var zakelijkeHuurders = await _context.ZakelijkeHuurders
                .Where(z => z.BedrijfId == bedrijfId)
                .Select(z => new
                {
                    Id = z.Id,
                    Email = z.Klant.User.Email,
                    Role = "ZakelijkeHuurder",
                    Straatnaam = z.Klant.Straatnaam,
                    Huisnummer = z.Klant.Huisnummer
                })
                .ToListAsync();

            var medewerkers = wagenparkbeheerders.Concat<object>(zakelijkeHuurders).ToList();
            return medewerkers;
        }



    }
}
