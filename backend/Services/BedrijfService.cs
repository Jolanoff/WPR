using backend.DbContext;
using backend.Models;
using backend.Models.Klanten;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class BedrijfService
    {
        private readonly ApplicationsDbContext _context;

        public BedrijfService(ApplicationsDbContext context)
        {
            _context = context;
        }

        public async Task<List<Abonnement>> GetAbonnementenAsync(string userId)
        {
            // Vind de Klant die hoort bij de ingelogde gebruiker
            var klant = await _context.Klanten
                .Include(k => k.Bedrijf)
                .FirstOrDefaultAsync(k => k.UserId == userId);

            if (klant?.Bedrijf == null)
                throw new ArgumentException("Geen bedrijf gevonden voor deze gebruiker.");

            // Haal alle abonnementen van het bedrijf op
            return await _context.Abonnementen
                .Where(a => a.BedrijfId == klant.Bedrijf.Id)
                .ToListAsync();
        }

        public async Task<Abonnement> CreateAbonnementAsync(string userId, string abonnementType, string betaalmethode, DateOnly startDatum, DateOnly eindDatum, int kosten)
        {
            // Vind de Klant die hoort bij de ingelogde gebruiker
            var klant = await _context.Klanten
                .Include(k => k.Bedrijf)
                .FirstOrDefaultAsync(k => k.UserId == userId);

            if (klant?.Bedrijf == null)
                throw new ArgumentException("Geen bedrijf gevonden voor deze gebruiker.");

            // Maak een nieuw abonnement aan
            var abonnement = new Abonnement
            {
                BedrijfId = klant.Bedrijf.Id,
                AbonnementType = abonnementType,
                Betaalmethode = betaalmethode,
                StartDatum = startDatum,
                EindDatum = eindDatum,
                Kosten = kosten,
                Status = true
            };

            _context.Abonnementen.Add(abonnement);
            await _context.SaveChangesAsync();

            return abonnement;
        }
    }
}
