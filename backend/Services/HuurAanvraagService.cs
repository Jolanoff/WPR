using backend.DbContext;
using backend.Dtos.HuurAanvraag;
using backend.Models.Aanvragen;
using backend.Models.Gebruiker;
using backend.Models.Klanten;
using backend.Models.Klanten.Bedrijven;
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
        // Fetch the user
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            throw new KeyNotFoundException("User not found.");

        // Fetch user roles
        var roles = await _userManager.GetRolesAsync(user);

        // Ensure the user has one of the allowed roles
        if (!roles.Any(r => new[] { "ParticuliereHuurder", "ZakelijkeHuurder", "WagenparkBeheerder", "Bedrijf" }.Contains(r)))
            throw new UnauthorizedAccessException("You are not authorized to create a HuurAanvraag.");

        Klant klant = null;
        Bedrijf? bedrijf = null;
        if (roles.Contains("ParticuliereHuurder"))
        {
            // Fetch ParticuliereHuurder klant
            klant = await _context.Klanten
                .Include(k => k.ParticuliereHuurder)
                .FirstOrDefaultAsync(k => k.UserId == userId);

            if (klant?.ParticuliereHuurder == null)
                throw new KeyNotFoundException("ParticuliereHuurder not found.");
        }
        else if (roles.Contains("Bedrijf"))
        {
            // Fetch the Bedrijf directly associated with the user
            bedrijf = await _context.Bedrijven
                .Include(b => b.Klant)
                .Include(b => b.Abonnementen)
                .FirstOrDefaultAsync(b => b.Klant.UserId == userId);

            if (bedrijf == null)
                throw new KeyNotFoundException("Bedrijf not found.");

            // Retrieve the associated Klant from the Bedrijf
            klant = bedrijf.Klant;

            // Ensure the bedrijf has an active abonnement
            bool hasActiveAbonnement = bedrijf.Abonnementen
                .Any(a => a.Status && a.EindDatum > DateOnly.FromDateTime(DateTime.UtcNow));

            if (!hasActiveAbonnement)
                throw new UnauthorizedAccessException("Your bedrijf does not have an active abonnement.");
        }
        else if (roles.Any(r => new[] { "ZakelijkeHuurder", "WagenparkBeheerder" }.Contains(r)))
        {
            // Fetch ZakelijkeHuurder or WagenparkBeheerder klant and check bedrijf abonnement
            klant = await _context.Klanten
         .Include(k => k.ZakelijkeHuurder)
             .ThenInclude(zh => zh.Bedrijf)
             .ThenInclude(b => b.Abonnementen)
         .Include(k => k.WagenparkBeheerder)
             .ThenInclude(wb => wb.Bedrijf)
             .ThenInclude(b => b.Abonnementen)
         .FirstOrDefaultAsync(k => k.UserId == userId);

            if (klant == null)
                throw new KeyNotFoundException("Klant not found.");



            if (klant.ZakelijkeHuurder?.Bedrijf != null)
            {
                bedrijf = klant.ZakelijkeHuurder.Bedrijf;
            }
            else if (klant.WagenparkBeheerder?.Bedrijf != null)
            {
                bedrijf = klant.WagenparkBeheerder.Bedrijf;
            }
            else
            {
                throw new UnauthorizedAccessException("Your account is not associated with any bedrijf.");
            }


            // Ensure the bedrijf has an active abonnement
            bool hasActiveAbonnement = bedrijf.Abonnementen
                .Any(a => a.Status && a.EindDatum > DateOnly.FromDateTime(DateTime.UtcNow));

            if (!hasActiveAbonnement)
                throw new UnauthorizedAccessException("Your bedrijf does not have an active abonnement.");
        }
        else
        {
            throw new UnauthorizedAccessException("Invalid user role.");
        }

        // Fetch voertuig
        var voertuig = await _context.Voertuigen.FindAsync(aanvraagDto.VoertuigId);
        if (voertuig == null)
            throw new KeyNotFoundException("Voertuig not found.");

        // Calculate total price
        var startDate = aanvraagDto.StartDatum;
        var endDate = aanvraagDto.EindDatum;
        var days = Math.Max((endDate - startDate).Days, 1); // Minimum of 1 day
        var dailyPrice = voertuig.Prijs;
        var totalPrice = days * dailyPrice;

        // Create the HuurAanvraag
        var huurAanvraag = new HuurAanvraag
        {
            StartDatum = aanvraagDto.StartDatum,
            EindDatum = aanvraagDto.EindDatum,
            Status = false, // Default status
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
            BetalingsOptie = "Onbekend", // Default payment option
            HuurAanvraagId = huurAanvraag.Id
        };

        // Save the Factuur
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
                Kenteken = h.Voertuig.Kenteken,
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
            IssueDate = huurAanvraag.StartDatum,
            Status = "Klaar om opgehaald te worden",
            ToDate = huurAanvraag.EindDatum
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

    public async Task<List<HuurAanvraagDto>> GetHuurAanvragenForUserAsync(string userId)
    {
        // Fetch the Klant associated with the User
        var klant = await _context.Klanten
            .Include(k => k.User)
            .FirstOrDefaultAsync(k => k.UserId == userId);

        if (klant == null)
            throw new KeyNotFoundException("Klant niet gevonden!");

        // Fetch and map HuurAanvragen to DTO
        var huuraanvragen = await _context.HuurAanvragen
            .Include(h => h.Voertuig)
            .Where(h => h.KlantId == klant.Id)
            .Select(h => new HuurAanvraagDto
            {
                Id = h.Id,
                StartDatum = h.StartDatum,
                EindDatum = h.EindDatum,
                Status = h.Status,
                AardVanReis = h.AardVanReis,
                VerwachteKilometers = h.VerwachteKilometers,
                ApprovalStatus = h.ApprovalStatus,
                RejectionReason = h.RejectionReason,
                Kenteken = h.Voertuig.Kenteken,

                // Voertuig Details
                VoertuigId = h.Voertuig.Id,
                VoertuigNaam = h.Voertuig.Merk,
                VoertuigType = h.Voertuig.Type,
                VoertuigPrijs = h.Voertuig.Prijs
            })
            .ToListAsync();

        return huuraanvragen;
    }

}
