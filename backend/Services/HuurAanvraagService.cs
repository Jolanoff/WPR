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

        var klant = await _context.Klanten
            .Include(k => k.User)
            .FirstOrDefaultAsync(k => k.UserId == userId);

        if (klant == null)
            throw new KeyNotFoundException("Klant not found for the authenticated user.");


        var voertuig = await _context.Voertuigen.FindAsync(aanvraagDto.VoertuigId);
        if (voertuig == null)
            throw new KeyNotFoundException("Voertuig not found.");

        var huurAanvraag = new HuurAanvraag
        {
            StartDatum = aanvraagDto.StartDatum,
            EindDatum = aanvraagDto.EindDatum,
            Status = false,
            AardVanReis = aanvraagDto.AardVanReis,
            VerwachteKilometers = aanvraagDto.VerwachteKilometers,
            Klant = klant, 
            Voertuig = voertuig 
        };

        _context.HuurAanvragen.Add(huurAanvraag);
        await _context.SaveChangesAsync();

        return huurAanvraag;
    }

}
