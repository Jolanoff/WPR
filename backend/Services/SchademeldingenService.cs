using backend.DbContext;
using backend.Dtos.Schade;
using backend.Models.Aanvragen;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class SchademeldingenService
    {
        private readonly ApplicationsDbContext _context;

        public SchademeldingenService(ApplicationsDbContext context)
        {
            _context = context;
        }

        public async Task<List<SchadeDto>> GetAllSchadesAsync()
        {
            return await _context.Schades
                .Include(s => s.HuurAanvraag)
                .ThenInclude(h => h.Voertuig) 
                .Include(s => s.HuurAanvraag)
                .ThenInclude(h => h.Klant) 
                .Select(s => new SchadeDto
                {
                    Id = s.Id,
                    Beschrijving = s.Beschrijving,
                    Locatie = s.Locatie,
                    Datum = s.Datum,
                    Status = s.Status.ToString(), 
                    HuurAanvraagId = s.HuurAanvraagId,
                    VoertuigId = s.HuurAanvraag.VoertuigId,
                    Merk = s.HuurAanvraag.Voertuig.Merk,
                    Type = s.HuurAanvraag.Voertuig.Type,
                    Kentenken = s.HuurAanvraag.Voertuig.Kenteken,
                    KlantId = s.HuurAanvraag.KlantId
                })
                .ToListAsync();
        }
        public async Task<Schade?> SwitchSchadeStatusAsync(int id, string newStatus)
        {
            var schade = await _context.Schades.FindAsync(id);
            if (schade == null) return null;

            if (!Enum.TryParse<SchadeStatus>(newStatus, true, out var status))
            {
                throw new ArgumentException($"Invalid status: {newStatus}");
            }

            schade.Status = status;
            _context.Schades.Update(schade);
            await _context.SaveChangesAsync();

            return schade;
        }


    }
}
