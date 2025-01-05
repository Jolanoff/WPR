namespace backend.Dtos.Aanvragen
{
    public class UpdateInnameDTO
{
    public string? Status { get; set; }
    public string? Remarks { get; set; }
    public List<IFormFile>? Photos { get; set; }

     public DateTime? IssueDate { get; set; }  // Toevoegen van intakeDate
    public DateTime? ToDate { get; set; }  
}

}
