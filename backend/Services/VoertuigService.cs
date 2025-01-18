using System.Security.Claims;
using backend.DbContext;
using backend.Dtos.Voertuig;
using backend.Dtos.Voertuigen;
using backend.Models.Gebruiker;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class VoertuigService
{
    private readonly ApplicationsDbContext _context;
    private readonly UserManager<User> _userManager;

    public VoertuigService(ApplicationsDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;

    }

    public async Task<IEnumerable<VoertuigDto>> GetAllVoertuigenAsync(
    DateTime checkStartDatum,
    DateTime checkEindDatum,
    string userId
)
    {
        // Fetch user and roles
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            throw new KeyNotFoundException("User not found.");

        var roles = await _userManager.GetRolesAsync(user);

        // Define roles that require filtering for "Auto"
        var restrictedRoles = new[] { "ZakelijkeHuurder", "WagenparkBeheerder", "Bedrijf" };

        // Query voertuigen
        var query = _context.Voertuigen
            .Include(v => v.Reserveringen)
            .Select(v => new VoertuigDto
            {
                Id = v.Id,
                Merk = v.Merk,
                Type = v.Type,
                Kenteken = v.Kenteken,
                Kleur = v.Kleur,
                Aanschafjaar = v.Aanschafjaar,
                VoertuigType = v.VoertuigType,
                imageUrl = v.imageUrl,
                Prijs = v.Prijs,
                Reserveringen = v.Reserveringen.Select(r => new ReserveringDto
                {
                    Id = r.Id,
                    StartDatum = r.StartDatum,
                    EindDatum = r.EindDatum
                }).ToList()
            });

        // Apply filtering for restricted roles
        if (roles.Any(role => restrictedRoles.Contains(role)))
        {
            query = query.Where(v => v.VoertuigType.ToLower() == "auto");
        }

        // Execute query
        var voertuigen = await query.ToListAsync();

        // Update status based on reservation overlap
        foreach (var voertuig in voertuigen)
        {
            voertuig.Status = voertuig.Reserveringen.Any(r =>
                checkStartDatum <= r.EindDatum &&
                checkEindDatum >= r.StartDatum
            );
        }

        return voertuigen;
    }


}
