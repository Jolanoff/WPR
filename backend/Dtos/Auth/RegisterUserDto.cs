namespace backend.Dtos.Auth
{
    public class RegisterUserDto
    {

        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } 
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Naam { get; set; } 
        public string? Initials { get; set; } 
        public string? KvkNummer { get; set; } 
    }
}
