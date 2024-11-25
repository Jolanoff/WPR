using Microsoft.AspNetCore.Identity;

namespace backend.Models.Gebruiker
{
    public class User : IdentityUser
    {
        public string? initials { get; set; }
    }
}
