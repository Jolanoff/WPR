using backend.DbContext;
using backend.Dtos.HuurAanvraag;
using backend.Models.Aanvragen;
using backend.Models.Gebruiker;
using backend.Models.Klanten;
using backend.Models.Voertuigen;
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

    public async Task<List<HuurAanvraagDto>> GetAllHuurAanvragenAsync()
    {
        return await _context.HuurAanvragen
            .Include(h => h.Klant)
            .ThenInclude(k => k.User)
            .Include(h => h.Voertuig)
            .Select(h => new HuurAanvraagDto
            {
                Id = h.Id,
                StartDatum = h.StartDatum,
                EindDatum = h.EindDatum,
                Status = h.Status,
                ApprovalStatus = h.ApprovalStatus,
                AardVanReis = h.AardVanReis,
                VerwachteKilometers = h.VerwachteKilometers,
                KlantNaam = $"{h.Klant.User.Voornaam} {h.Klant.User.Achternaam}",
                VoertuigNaam = $"{h.Voertuig.Merk} {h.Voertuig.Type}"
            })
            .ToListAsync();
    }

    public async Task<HuurAanvraag> ApproveHuurAanvraagAsync(int id, string remarks = "")
{
    // Fetch the HuurAanvraag with related entities
    var huurAanvraag = await _context.HuurAanvragen
        .Include(h => h.Klant)
        .ThenInclude(k => k.User)
        .Include(h => h.Voertuig)
        .FirstOrDefaultAsync(h => h.Id == id);

    if (huurAanvraag == null)
        throw new KeyNotFoundException("HuurAanvraag not found.");

    if (huurAanvraag.ApprovalStatus == "Approved")
        throw new InvalidOperationException("This HuurAanvraag is already approved.");

    // Update the HuurAanvraag status
    huurAanvraag.ApprovalStatus = "Approved";
    huurAanvraag.Status = true;

    // Create a new Reservering
    var reservering = new Reservering
    {
        StartDatum = huurAanvraag.StartDatum,
        EindDatum = huurAanvraag.EindDatum,
        KlantId = huurAanvraag.KlantId,
        VoertuigId = huurAanvraag.VoertuigId,
        HuurAanvraagId = huurAanvraag.Id
    };

    // Add the Reservering to the database
    _context.Reserveringen.Add(reservering);

    // Create a new Uitgifte
    var uitgifte = new Uitgifte
    {
        CustomerName = $"{huurAanvraag.Klant.User.Voornaam} {huurAanvraag.Klant.User.Achternaam}",
        VoertuigId = huurAanvraag.VoertuigId,
        KlantId = huurAanvraag.KlantId,
        Voertuig = huurAanvraag.Voertuig, // Include the related Voertuig entity
        Remarks = remarks,
        IssueDate = DateTime.Now,
        Status = "Klaar om opgehaald te worden"
    };

    // Add the Uitgifte to the database
    _context.Uitgiften.Add(uitgifte);

    // Save all changes
    _context.HuurAanvragen.Update(huurAanvraag);
    await _context.SaveChangesAsync();

    return huurAanvraag;
}


    public async Task<HuurAanvraag> RefuseHuurAanvraagAsync(int id, string reason)
    {
        // Fetch the HuurAanvraag
        var huurAanvraag = await _context.HuurAanvragen.FindAsync(id);

        if (huurAanvraag == null)
            throw new KeyNotFoundException("HuurAanvraag not found.");

        if (string.IsNullOrWhiteSpace(reason))
            throw new ArgumentException("Rejection reason cannot be empty.");

        // Update the rejection status
        huurAanvraag.ApprovalStatus = "Rejected";
        huurAanvraag.RejectionReason = reason;
        huurAanvraag.Status = false;

        // Save changes
        _context.HuurAanvragen.Update(huurAanvraag);
        await _context.SaveChangesAsync();

        return huurAanvraag;
    }

    public async Task<List<HuurAanvraag>> GetHuurAanvragenForUserAsync(string userId)
    {
        var klant = await _context.Klanten
            .Include(k => k.User)
            .FirstOrDefaultAsync(k => k.UserId == userId);

        if (klant == null)
            throw new KeyNotFoundException("klant niet gevonden!");

        var huuraanvragen = await _context.HuurAanvragen
            .Include(h => h.Voertuig)
            .Where(h => h.Klant.Id == klant.Id)
            .ToListAsync();

        return huuraanvragen;
    }
}
