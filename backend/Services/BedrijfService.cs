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
            // Vind de klant en het bedrijf
            var klant = await _context.Klanten
                .Include(k => k.Bedrijf)
                .FirstOrDefaultAsync(k => k.UserId == userId);

            if (klant?.Bedrijf == null)
                throw new ArgumentException("Geen bedrijf gevonden voor deze gebruiker.");

            // Haal alle abonnementen van het bedrijf op
            var abonnementen = await _context.Abonnementen
                .Where(a => a.BedrijfId == klant.Bedrijf.Id)
                .OrderByDescending(a => a.StartDatum)
                .ToListAsync();

            var today = DateOnly.FromDateTime(DateTime.Now);

            // Controleer of abonnementen verlopen zijn en update hun status
            foreach (var abonnement in abonnementen)
            {
                if (today > abonnement.EindDatum || (abonnement.StopDatum.HasValue && today > abonnement.StopDatum))
                {
                    abonnement.Status = false;
                }
            }

            // Sla eventuele wijzigingen op
            await _context.SaveChangesAsync();

            return abonnementen;
        }


        public async Task<Abonnement> CreateAbonnementAsync(string userId, string abonnementType, string betaalmethode, DateOnly startDatum)
        {
            var klant = await _context.Klanten
                .Include(k => k.Bedrijf)
                .FirstOrDefaultAsync(k => k.UserId == userId);

            if (klant?.Bedrijf == null)
                throw new ArgumentException("Geen bedrijf gevonden voor deze gebruiker.");

            var bedrijfId = klant.Bedrijf.Id;

            // Ensure no conflicting active subscriptions exist
            var today = DateOnly.FromDateTime(DateTime.Now);

            var conflictingAbonnement = await _context.Abonnementen
                .FirstOrDefaultAsync(a =>
                    a.BedrijfId == bedrijfId &&
                    a.Status && // Still marked as active
                    (today < a.StartDatum || today <= a.EindDatum || (a.StopDatum.HasValue && today <= a.StopDatum)));

            if (conflictingAbonnement != null)
            {
                throw new InvalidOperationException(
                    "U kunt geen nieuw abonnement aanmaken, omdat u een actief of geannuleerd abonnement heeft dat nog geldig is."
                );
            }

            var kosten = abonnementType.ToLower() switch
            {
                "pay-as-you-go" => 50,
                "prepaid" => 500,
                _ => throw new ArgumentException("Ongeldig abonnementstype.")
            };

            var eindDatum = startDatum.AddMonths(1);

            var abonnement = new Abonnement
            {
                BedrijfId = bedrijfId,
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


        public async Task<bool> CancelAbonnementAsync(string userId)
        {
            var klant = await _context.Klanten
                .Include(k => k.Bedrijf)
                .FirstOrDefaultAsync(k => k.UserId == userId);

            if (klant?.Bedrijf == null)
                throw new ArgumentException("Geen bedrijf gevonden voor deze gebruiker.");

            var today = DateOnly.FromDateTime(DateTime.Now);

            var abonnement = await _context.Abonnementen
                .FirstOrDefaultAsync(a =>
                    a.BedrijfId == klant.Bedrijf.Id &&
                    a.Status); // Active subscriptions only

            if (abonnement == null)
                throw new ArgumentException("Geen actief abonnement gevonden.");

            // Allow cancellation anytime
            abonnement.StopDatum ??= today; // Set StopDatum only if it hasn't been set yet

            // If the subscription starts in the future, mark it as not active
            if (abonnement.StartDatum > today)
            {
                abonnement.Status = false;
            }

            _context.Abonnementen.Update(abonnement);
            await _context.SaveChangesAsync();

            return true;
        }






        public async Task<Abonnement> UpdateAbonnementAsync(string userId, string nieuwAbonnementType, string nieuweBetaalmethode)
        {
            var klant = await _context.Klanten
                .Include(k => k.Bedrijf)
                .FirstOrDefaultAsync(k => k.UserId == userId);

            if (klant?.Bedrijf == null)
                throw new ArgumentException("Geen bedrijf gevonden voor deze gebruiker.");

            var abonnement = await _context.Abonnementen
                .FirstOrDefaultAsync(a => a.BedrijfId == klant.Bedrijf.Id && a.Status);

            if (abonnement == null)
                throw new ArgumentException("Geen actief abonnement gevonden.");

            // Kosten bepalen op basis van het nieuwe type
            var kosten = nieuwAbonnementType.ToLower() switch
            {
                "pay-as-you-go" => 50,
                "prepaid" => 500,
                _ => throw new ArgumentException("Ongeldig abonnementstype.")
            };

            // Update de eigenschappen
            abonnement.AbonnementType = nieuwAbonnementType;
            abonnement.Betaalmethode = nieuweBetaalmethode;
            abonnement.Kosten = kosten;

            _context.Abonnementen.Update(abonnement);
            await _context.SaveChangesAsync();

            return abonnement;
        }





    }
}
