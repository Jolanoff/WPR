using backend.DbContext;
using backend.Models.Aanvragen;
using backend.Models.Gebruiker;
using backend.Models.Klanten;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class HuurAanvraagService
{
    private readonly ApplicationsDbContext _context;
    private readonly UserManager<User> _userManager;
    public HuurAanvraagService(ApplicationsDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<HuurAanvraag> CreateHuurAanvraagAsync(string userId, CreateHuurAanvraagDto aanvraagDto)
    {
        
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            throw new KeyNotFoundException("User not found.");

        var roles = await _userManager.GetRolesAsync(user);

        if (!roles.Any(r => new[] { "ParticuliereHuurder", "ZakelijkeHuurder", "WagenparkBeheerder", "Bedrijf" }.Contains(r)))
            throw new UnauthorizedAccessException("You are not authorized to create a HuurAanvraag.");

   
        Klant klant = null;

        if (roles.Contains("ParticuliereHuurder"))
        {
    
            klant = await _context.Klanten.FirstOrDefaultAsync(k => k.UserId == userId);
            if (klant == null)
                throw new KeyNotFoundException("Klant not found.");
        }
        else if (roles.Contains("ZakelijkeHuurder") || roles.Contains("WagenparkBeheerder") || roles.Contains("Bedrijf"))
        {
            
            klant = await _context.Klanten
                .Include(k => k.Bedrijf)
                    .ThenInclude(b => b.Abonnementen)
                .FirstOrDefaultAsync(k => k.UserId == userId);

            if (klant?.Bedrijf == null || !klant.Bedrijf.Abonnementen.Any(a => a.Status && a.EindDatum > DateOnly.FromDateTime(DateTime.Now)))
            {
                throw new UnauthorizedAccessException("Your bedrijf does not have an active abonnement.");
            }
        }

        var voertuig = await _context.Voertuigen.FindAsync(aanvraagDto.VoertuigId);
        if (voertuig == null)
            throw new KeyNotFoundException("Voertuig not found.");

        var startDate = aanvraagDto.StartDatum;
        var endDate = aanvraagDto.EindDatum;
        var days = Math.Max((endDate - startDate).Days, 1); 

        var dailyPrice = voertuig.Prijs; 
        var totalPrice = days * dailyPrice;

        // Create the HuurAanvraag
        var huurAanvraag = new HuurAanvraag
        {
            StartDatum = aanvraagDto.StartDatum,
            EindDatum = aanvraagDto.EindDatum,
            Status = false,
            AardVanReis = aanvraagDto.AardVanReis,
            VerwachteKilometers = aanvraagDto.VerwachteKilometers,
            KlantId = klant.Id,
            VoertuigId = aanvraagDto.VoertuigId
        };

        _context.HuurAanvragen.Add(huurAanvraag);
        await _context.SaveChangesAsync(); 

        // Create the Factuur
        var factuur = new Factuur
        {
            Bedrag = totalPrice,
            BetaalStatus = false,
            BetalingsOptie = "Onbekend", 
            HuurAanvraagId = huurAanvraag.Id 
        };

        // Add Factuur to the context
        _context.Facturen.Add(factuur);
        await _context.SaveChangesAsync();

        return huurAanvraag;
    }





}
