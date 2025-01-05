using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Aanvragen
{public class AcceptUitgifteRequest //DTO voor de uitgifte model
{
    [Required]
    [StringLength(100)]
    public string CustomerName { get; set; }

    [Required]
    public int KlantId {get; set;} 

    [Required]
    public int VoertuigId { get; set; }

    [Required]
    public DateTime FromDate { get; set; }

    [Required]
    public DateTime ToDate { get; set; }

    [StringLength(500)]
    public string Remarks { get; set; }
}
}
