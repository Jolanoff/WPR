using backend.Models.Aanvragen;
using backend.DbContext;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class HuurAanvraagService
    {
        private readonly ApplicationsDbContext _context;

        public HuurAanvraagService(ApplicationsDbContext context)
        {
            _context = context;
        }

        public async Task<HuurAanvraag> CreateHuurAanvraagAsync(HuurAanvraag huurAanvraag)
        {
            // Validate the dates
            if (huurAanvraag.StartDatum >= huurAanvraag.EindDatum)
            {
                throw new ArgumentException("StartDatum moet vóór EindDatum zijn.");
            }

            // Add the HuurAanvraag to the database
            _context.HuurAanvragen.Add(huurAanvraag);
            await _context.SaveChangesAsync();

            return huurAanvraag;
        }
    }
}
