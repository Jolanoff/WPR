
using backend.DbContext;
using backend.Dtos.Profiel;
using backend.Models;
using backend.Models.Gebruiker;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AccountService
    {
        private readonly ApplicationsDbContext _context;
        private readonly UserManager<User> _userManager;
        public AccountService(ApplicationsDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<ProfielDto> GetProfileAsync(string userId)
        {
            // Gebruik UserManager om de gebruiker op te halen
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return null;

            // Haal rollen op
            var roles = await _userManager.GetRolesAsync(user);

            var klant = await _context.Klanten
            .Include(k => k.Bedrijf) 
            .FirstOrDefaultAsync(k => k.UserId == userId);
            // Bouw het profiel
            return new ProfielDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Voornaam = user.Voornaam,
                Achternaam = user.Achternaam,
                Telefoonnummer = user.PhoneNumber,
                Adres = new ProfielDto.AddressDto
                {
                    Straatnaam = user.Klanten!.Straatnaam,
                    Huisnummer = user.Klanten!.Huisnummer
                },
                KvKNummer = user.Klanten!.Bedrijf?.KvkNummer,
                Roles = roles.ToList()
            };
        }

        public bool UpdateProfile(string userId, UpdateUserDto dto)
        {
            // Find the user by ID
            var user = _context.Users
                .Include(u => u.Klanten) // Include related Klanten entity
                .ThenInclude(k => k.Bedrijf) // Include related Bedrijf entity if applicable
                .FirstOrDefault(u => u.Id == userId);

            if (user == null)
                return false;

            // Update User fields
            user.UserName = dto.UserName;
            user.Voornaam = dto.Voornaam;
            user.Achternaam = dto.Achternaam;
            user.Email = dto.Email;
            user.PhoneNumber = dto.Telefoonnummer;

            // Update Klanten fields
            if (user.Klanten != null)
            {
                user.Klanten.Straatnaam = dto.Straatnaam;
                user.Klanten.Huisnummer = dto.Huisnummer;

                // If it's a company, update the KvKNummer
                if (user.Klanten.Bedrijf != null)
                {
                    user.Klanten.Bedrijf.KvkNummer = dto.KvKNummer;
                }
            }

            // Save changes to the database
            _context.Users.Update(user);
            return _context.SaveChanges() > 0;
        }

        public bool DeleteAccount(string userId)
        {
            var user = _context.Users.Find(userId);
            if (user == null)
                return false;

            _context.Users.Remove(user);
            return _context.SaveChanges() > 0;
        }

        public async Task<bool> ChangePasswordAsync(string userId, ChangePasswordDto dto)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return false;

            // Gebruik UserManager om wachtwoord te wijzigen
            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
            return result.Succeeded;
        }
    }
}
