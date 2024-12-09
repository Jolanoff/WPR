using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/vehicle")]
public class VoertuigUitgiftenController : ControllerBase
{
    [HttpPost("issue")]
    public IActionResult RegisterVehicleIssue([FromBody] VehicleIssueRequest request)
    {
        try
        {
            // Simuleer opslag van de gegevens
            var issuedVehicle = new VehicleIssue
            {
                CustomerName = request.CustomerName,
                VehicleId = request.VehicleId,
                Remarks = request.Remarks,
                IssueDate = DateTime.Now,
                Status = "Uitgegeven"
            };

            // Opslaan in database (optioneel)
            // dbContext.VehicleIssues.Add(issuedVehicle);
            // dbContext.SaveChanges();

            return Ok(new { message = "Uitgifte succesvol geregistreerd", data = issuedVehicle });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Er is een fout opgetreden", error = ex.Message });
        }
    }
}

public class VehicleIssueRequest
{
    public string CustomerName { get; set; }
    public string VehicleId { get; set; }
    public string Remarks { get; set; }
}

public class VehicleIssue
{
    public string CustomerName { get; set; }
    public string VehicleId { get; set; }
    public string Remarks { get; set; }
    public DateTime IssueDate { get; set; }
    public string Status { get; set; }
}
