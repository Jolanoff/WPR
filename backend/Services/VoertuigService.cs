using backend.DbContext;
using backend.Dtos.Voertuigen;
using Microsoft.EntityFrameworkCore;

public class VoertuigService
{
    private readonly ApplicationsDbContext _context;

    public VoertuigService(ApplicationsDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<VoertuigDto>> GetAllVoertuigenAsync()
    {
        // Vervang 'Voertuig' door jouw eigen entiteit en 'VoertuigDto' door de relevante DTO
        return await _context.Voertuigen
                             .Select(v => new VoertuigDto
                             {
                                 Id = v.Id,
                                 Merk = v.Merk,
                                 Type = v.Type,
                                 Kenteken = v.Kenteken,
                                 Kleur = v.Kleur,
                                 Aanschafjaar = v.Aanschafjaar,
                                 VoertuigType = v.VoertuigType
                                 
                             })
                             .ToListAsync();
    }
}
