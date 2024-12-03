namespace backend.Dtos.Profiel
{
    public class ProfielDto
    {
        public string UserName { get; set; } 
        public string Email { get; set; }   
        public string Voornaam { get; set; } 
        public string Achternaam { get; set; }

        public string Telefoonnummer {  get; set; } 
        public AddressDto Adres { get; set; } 

        public string KvKNummer { get; set; } 

        public List<string> Roles { get; set; } 

        public class AddressDto
        {
            public string Straatnaam { get; set; } 
            public int Huisnummer { get; set; }   
        }
    }
}
