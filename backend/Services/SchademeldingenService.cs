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

        //schade melden!!!!!!!!!!!!!!!!!!!!!!!!!!
        public async Task<bool> ReportSchadeAsync(int huurAanvraagId, string beschrijving, string locatie)
        {
            var huurAanvraag = await _context.HuurAanvragen
                .Include(h => h.Schades)
                .FirstOrDefaultAsync(h => h.Id == huurAanvraagId);

            if (huurAanvraag == null)
            {
                throw new KeyNotFoundException("HuurAanvraag niet gevonden.");
            }

            var schade = new Schade
            {
                Beschrijving = beschrijving,
                Locatie = locatie,
                Datum = DateTime.UtcNow,
                Status = SchadeStatus.InAfwachting,
                HuurAanvraagId = huurAanvraagId
            };

            _context.Schades.Add(schade);
            await _context.SaveChangesAsync();

            return true;
        }


    }
}
