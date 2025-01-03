using backend.DbContext;
using backend.Dtos.Voertuig;
using backend.Dtos.Voertuigen;
using Microsoft.EntityFrameworkCore;

public class VoertuigService
{
    private readonly ApplicationsDbContext _context;

    public VoertuigService(ApplicationsDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<VoertuigDto>> GetAllVoertuigenAsync(DateTime checkStartDatum, DateTime checkEindDatum)
    {
        var voertuigen = await _context.Voertuigen
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
            })
            .ToListAsync();

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
