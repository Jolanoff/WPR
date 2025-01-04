namespace backend.Dtos.Aanvragen
{
    public class UpdateInnameDTO
    {
        public string Status { get; set; } // De nieuwe status voor de inname (bijv. "Geaccepteerd")
        public string Remarks { get; set; } // De opmerkingen voor de inname
    }
}
