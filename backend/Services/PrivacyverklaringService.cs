using System.Threading.Tasks;
//using backend.Data; // Verwijst naar je DbContext
using backend.DbContext;
using backend.Models; // Verwijst naar je model
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class PrivacyverklaringService
    {
        private readonly ApplicationsDbContext _context;

        public PrivacyverklaringService(ApplicationsDbContext context)
        {
            _context = context;
        }

        // Ophalen van de privacyverklaring
        public async Task<string?> GetPrivacyverklaringAsync()
        {
            var privacyverklaring = await _context.Privacyverklaringen.FirstOrDefaultAsync();
            return privacyverklaring?.Tekst;
        }

        // Bijwerken van de privacyverklaring
        public async Task<string> UpdatePrivacyverklaringAsync(string nieuweTekst)
        {
            var privacyverklaring = await _context.Privacyverklaringen.FirstOrDefaultAsync();
            if (privacyverklaring == null)
            {
                // Als de privacyverklaring nog niet bestaat, maak een nieuwe
                privacyverklaring = new Privacyverklaring { Tekst = nieuweTekst };
                _context.Privacyverklaringen.Add(privacyverklaring);
            }
            else
            {
                // Update de bestaande tekst
                privacyverklaring.Tekst = nieuweTekst;
            }

            await _context.SaveChangesAsync();
            return privacyverklaring.Tekst;
        }
    }
}
