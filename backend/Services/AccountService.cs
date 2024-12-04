
using System.ComponentModel.DataAnnotations;
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
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return null;

            var roles = await _userManager.GetRolesAsync(user);

            var klant = await _context.Klanten
                .Include(k => k.Bedrijf)
                .FirstOrDefaultAsync(k => k.UserId == userId);

            return new ProfielDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Voornaam = user.Voornaam,
                Achternaam = user.Achternaam,
                Telefoonnummer = user.PhoneNumber,
                Adres = klant != null
                    ? new ProfielDto.AddressDto
                    {
                        Straatnaam = klant.Straatnaam ?? "N/A",
                        Huisnummer = klant.Huisnummer
                    }
                    : null,
                KvKNummer = klant?.Bedrijf?.KvkNummer,
                Roles = roles.ToList()
            };
        }


        public async Task<(bool success, string message)> UpdateProfile(string userId, UpdateUserDto dto)
        {
            // Check for duplicate username
            if (await _userManager.FindByNameAsync(dto.UserName) is User existingUserWithUsername &&
                existingUserWithUsername.Id != userId)
            {
                return (false, "Username is already in use.");
            }

            // Check for duplicate email
            if (await _userManager.FindByEmailAsync(dto.Email) is User existingUserWithEmail &&
                existingUserWithEmail.Id != userId)
            {
                return (false, "Email is already in use.");
            }

            // Find the user by ID
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return (false, "User not found.");

            // Update User fields
            user.UserName = dto.UserName;
            user.Voornaam = dto.Voornaam;
            user.Achternaam = dto.Achternaam;
            user.Email = dto.Email;
            user.PhoneNumber = dto.Telefoonnummer;

            // Update Adres fields
            var klant = await _context.Klanten.FirstOrDefaultAsync(k => k.UserId == userId);
            if (klant != null)
            {
                klant.Straatnaam = dto.Adres.Straatnaam;
                klant.Huisnummer = dto.Adres.Huisnummer;

                if (klant.Bedrijf != null)
                {
                    klant.Bedrijf.KvkNummer = dto.KvKNummer;
                }
            }

            // Save changes
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return (false, "Failed to update user profile.");
            }

            _context.Klanten.Update(klant);
            await _context.SaveChangesAsync();

            return (true, "Profile updated successfully.");
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
