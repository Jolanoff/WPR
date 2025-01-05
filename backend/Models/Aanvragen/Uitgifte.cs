using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using backend.Models.Klanten;
using backend.Models.Voertuigen;

namespace backend.Models.Aanvragen
{public class Uitgifte
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public int KlantId{get; set;}
    public int VoertuigId { get; set; }
    public string Remarks { get; set; }
    public DateTime IssueDate { get; set; }
    public string Status { get; set; }
    public DateTime ToDate {get; set;}

    // Relatie met Voertuig
    [JsonIgnore]
    public Voertuig Voertuig { get; set; }  // Relatie naar Voertuig

    // Relatie naar klant
    [JsonIgnore]
    public Klant Klant { get; set; }
}
}