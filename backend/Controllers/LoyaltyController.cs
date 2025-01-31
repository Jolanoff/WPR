using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using backend.DbContext;
using backend.Models;
using backend.Models.Gebruiker;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/loyalty")]
public class LoyaltyController : ControllerBase
{
    private readonly ApplicationsDbContext _context;
    private readonly UserManager<User> _userManager;

    public LoyaltyController(ApplicationsDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet("points")]
    public async Task<IActionResult> GetLoyaltyPoints()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Unauthorized(new { message = "User not authenticated" });

        var klant = await _context.Klanten.FirstOrDefaultAsync(k => k.UserId == userId);
        if (klant == null)
            return NotFound(new { message = "Klant niet gevonden" });

        var loyalty = await _context.LoyaltyPrograms.FirstOrDefaultAsync(l => l.KlantId == klant.Id);
        if (loyalty == null)
            return Ok(new { points = 0 });

        return Ok(new { points = loyalty.LoyaltyPoints });
    }


    [HttpPost("use-points")]
    public async Task<IActionResult> UseLoyaltyPoints([FromBody] UseLoyaltyPointsRequest request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Unauthorized(new { message = "Gebruiker niet ingelogd" });

  
        var klant = await _context.Klanten.FirstOrDefaultAsync(k => k.UserId == userId);
        if (klant == null)
            return NotFound(new { message = "Geen klantgegevens gevonden" });

        var loyalty = _context.LoyaltyPrograms.FirstOrDefault(l => l.KlantId == klant.Id);
        if (loyalty == null || loyalty.LoyaltyPoints < request.PointsToUse)
            return BadRequest(new { message = "Onvoldoende punten" });

        loyalty.LoyaltyPoints -= request.PointsToUse;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Punten succesvol gebruikt", remainingPoints = loyalty.LoyaltyPoints });
    }
}

public class UseLoyaltyPointsRequest
{
    public int PointsToUse { get; set; }
}
