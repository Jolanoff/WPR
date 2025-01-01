using backend.Models.Aanvragen;
using backend.Models.Klanten;
using backend.Models.Voertuigen;
using backend.DbContext;
using Microsoft.EntityFrameworkCore;

public class HuurAanvraagService
{
    private readonly ApplicationsDbContext _context;

    public HuurAanvraagService(ApplicationsDbContext context)
    {
        _context = context;
    }

    public async Task<HuurAanvraag> CreateHuurAanvraagAsync(string userId, CreateHuurAanvraagDto aanvraagDto)
    {
        // Find the Klant linked to the UserId
        var klant = await _context.Klanten
            .Include(k => k.User)
            .FirstOrDefaultAsync(k => k.UserId == userId);

        if (klant == null)
            throw new KeyNotFoundException("Klant not found for the authenticated user.");

        // Validate the Voertuig
        var voertuig = await _context.Voertuigen.FindAsync(aanvraagDto.VoertuigId);
        if (voertuig == null)
            throw new KeyNotFoundException("Voertuig not found.");

        // Create a new HuurAanvraag
        var huurAanvraag = new HuurAanvraag
        {
            StartDatum = aanvraagDto.StartDatum,
            EindDatum = aanvraagDto.EindDatum,
            Status = aanvraagDto.Status,
            AardVanReis = aanvraagDto.AardVanReis,
            VerwachteKilometers = aanvraagDto.VerwachteKilometers,
            Klant = klant, // Attach the Klant object
            Voertuig = voertuig // Attach the Voertuig object
        };

        // Save the HuurAanvraag
        _context.HuurAanvragen.Add(huurAanvraag);
        await _context.SaveChangesAsync();

        return huurAanvraag;
    }

}
