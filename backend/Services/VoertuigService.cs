using System.Security.Claims;
using backend.DbContext;
using backend.Dtos.Voertuig;
using backend.Dtos.Voertuigen;
using backend.Models.Gebruiker;
using backend.Models.Voertuigen;
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
            .Where(v => !v.MarkedForDeletion)
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
    public async Task<VoertuigDto> CreateVoertuigAsync(CreateVoertuigDto dto)
    {
        // Validate required fields
        if (string.IsNullOrWhiteSpace(dto.Kenteken))
            throw new ArgumentException("Kenteken is required.");

        if (string.IsNullOrWhiteSpace(dto.VoertuigType) ||
            !new[] { "Auto", "Caravan", "Camper" }.Contains(dto.VoertuigType.ToLower()))
        {
            throw new ArgumentException("VoertuigType must be 'auto', 'caravan', or 'camper'.");
        }

        // Check if kenteken already exists
        var existingVoertuig = await _context.Voertuigen
            .FirstOrDefaultAsync(v => v.Kenteken.ToLower() == dto.Kenteken.ToLower());

        if (existingVoertuig != null)
            throw new InvalidOperationException($"A voertuig with kenteken '{dto.Kenteken}' already exists.");

        // Map DTO to entity
        var voertuig = new Voertuig
        {
            Merk = dto.Merk,
            Type = dto.Type,
            Kenteken = dto.Kenteken,
            Kleur = dto.Kleur,
            Aanschafjaar = dto.Aanschafjaar,
            Status = dto.Status,
            VoertuigType = dto.VoertuigType,
            imageUrl = dto.ImageUrl,
            Prijs = dto.Prijs
        };

        // Add to database
        _context.Voertuigen.Add(voertuig);
        await _context.SaveChangesAsync();

        // Map back to DTO
        return new VoertuigDto
        {
            Id = voertuig.Id,
            Merk = voertuig.Merk,
            Type = voertuig.Type,
            Kenteken = voertuig.Kenteken,
            Kleur = voertuig.Kleur,
            Aanschafjaar = voertuig.Aanschafjaar,
            Status = voertuig.Status,
            VoertuigType = voertuig.VoertuigType,
            imageUrl = voertuig.imageUrl,
            Prijs = voertuig.Prijs,
            Reserveringen = new List<ReserveringDto>()
        };
    }

    public async Task<VoertuigDto> GetVoertuigByIdAsync(int id)
    {
        var voertuig = await _context.Voertuigen
            .Include(v => v.Reserveringen)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (voertuig == null)
            throw new KeyNotFoundException("Voertuig not found.");

        return new VoertuigDto
        {
            Id = voertuig.Id,
            Merk = voertuig.Merk,
            Type = voertuig.Type,
            Kenteken = voertuig.Kenteken,
            Kleur = voertuig.Kleur,
            Aanschafjaar = voertuig.Aanschafjaar,
            Status = voertuig.Status,
            VoertuigType = voertuig.VoertuigType,
            imageUrl = voertuig.imageUrl,
            Prijs = voertuig.Prijs,
            Reserveringen = voertuig.Reserveringen.Select(r => new ReserveringDto
            {
                Id = r.Id,
                StartDatum = r.StartDatum,
                EindDatum = r.EindDatum
            }).ToList()
        };
    }

    public async Task UpdateVoertuigAsync(UpdateVoertuigDto dto)
    {
        var voertuig = await _context.Voertuigen.FindAsync(dto.Id);
        if (voertuig == null)
            throw new KeyNotFoundException("Voertuig not found.");

        voertuig.Merk = dto.Merk;
        voertuig.Type = dto.Type;
        voertuig.Kenteken = dto.Kenteken;
        voertuig.Kleur = dto.Kleur;
        voertuig.Aanschafjaar = dto.Aanschafjaar;
        voertuig.Status = dto.Status;
        voertuig.VoertuigType = dto.VoertuigType;
        voertuig.imageUrl = dto.ImageUrl;
        voertuig.Prijs = dto.Prijs;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteVoertuigAsync(int id)
    {
        var voertuig = await _context.Voertuigen
            .Include(v => v.HuurAanvragen)
            .Include(v => v.Reserveringen)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (voertuig == null)
            throw new KeyNotFoundException("Voertuig not found.");

        if (voertuig.HuurAanvragen.Any(ha => ha.Status == true) ||
            voertuig.Reserveringen.Any(r => r.EindDatum > DateTime.UtcNow))
        {
            throw new InvalidOperationException("Voertuig kan niet verwijderd worden omdat het een actieve reservering heeft.");
        }

        voertuig.MarkedForDeletion = true;

        _context.Voertuigen.Update(voertuig);
        await _context.SaveChangesAsync();
    }
    public async Task<List<VoertuigDto>> GetMarkedForDeletionAsync()
    {
        var voertuigen = await _context.Voertuigen
            .Where(v => v.MarkedForDeletion)
            .Select(v => new VoertuigDto
            {
                Id = v.Id,
                Merk = v.Merk,
                Type = v.Type,
                Kenteken = v.Kenteken,
                VoertuigType = v.VoertuigType
            })
            .ToListAsync();

        return voertuigen;
    }
    public async Task<bool> RestoreVoertuigAsync(int id)
    {
        var voertuig = await _context.Voertuigen.FirstOrDefaultAsync(v => v.Id == id);

        if (voertuig == null)
        {
            throw new KeyNotFoundException("Voertuig not found.");
        }

        if (!voertuig.MarkedForDeletion)
        {
            throw new InvalidOperationException("Voertuig is not marked for deletion.");
        }

        voertuig.MarkedForDeletion = false;
        _context.Voertuigen.Update(voertuig);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<ReserveringDto>> GetReserveringenByVoertuigIdAsync(int voertuigId)
    {
        var reserveringen = await _context.Reserveringen
            .Where(r => r.Voertuig.Id == voertuigId)
            .Include(r => r.Voertuig)
            .Include(r => r.Klant)
                .ThenInclude(k => k.User)
            .Select(r => new ReserveringDto
            {
                Id = r.Id,
                StartDatum = r.StartDatum,
                EindDatum = r.EindDatum,
                KlantNaam = r.Klant.User.Voornaam + " " + r.Klant.User.Achternaam,
                KlantEmail = r.Klant.User.Email,
            })
            .ToListAsync();

        return reserveringen;
    }


}
