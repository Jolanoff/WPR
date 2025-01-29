using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using System.Security.Claims;
using backend.Models.Gebruiker;
using Microsoft.AspNetCore.Identity;
using backend.Dtos.Voertuigen;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VoertuigController : ControllerBase
    {
        private readonly VoertuigService _voertuigService;
    


        public VoertuigController(VoertuigService voertuigService)
        {
            _voertuigService = voertuigService;
        }


        public class DateRangeDto
        {
            public DateTime StartDatum { get; set; }
            public DateTime EindDatum { get; set; }
        }
        [HttpPost]
        public async Task<IActionResult> GetAllVoertuigen([FromBody] DateRangeDto dateRange)
        {
            try
            {
                // Get the authenticated user's ID from the claims
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Gebruiker niet geauthenticeerd." });
                }

                // Call the service method with the userId and date range
                var voertuigen = await _voertuigService.GetAllVoertuigenAsync(dateRange.StartDatum, dateRange.EindDatum, userId);

                if (voertuigen == null || !voertuigen.Any())
                {
                    return NotFound(new { message = "Geen voertuigen gevonden." });
                }

                return Ok(voertuigen);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [Authorize(Roles = "BackOfficeMedewerker,Admin")]
        [HttpPost("CreateVoertuig")]
        public async Task<IActionResult> CreateVoertuig([FromBody] CreateVoertuigDto dto)
        {
            try
            {
                var result = await _voertuigService.CreateVoertuigAsync(dto);
                return CreatedAtAction(nameof(GetVoertuigById), new { id = result.Id }, result);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message }); 
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message }); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Er heeft zich een onverwachte fout voorgedaan", detail = ex.Message });
            }
        }
        [Authorize(Roles = "BackOfficeMedewerker,Admin")]
        [HttpGet("GetVoertuigById/{id}")]
        public async Task<IActionResult> GetVoertuigById(int id)
        {
            try
            {
                var result = await _voertuigService.GetVoertuigByIdAsync(id);
                if (result == null)
                {
                    return NotFound(new { message = "Voertuig niet gevonden." });
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [Authorize(Roles = "BackOfficeMedewerker,Admin")]
        [HttpPut("UpdateVoertuig/{id}")]
        public async Task<IActionResult> UpdateVoertuig(int id, [FromBody] UpdateVoertuigDto dto)
        {
            try
            {
                if (id != dto.Id)
                {
                    return BadRequest(new { message = "ID in de route komt niet overeen met ID in het object." });
                }

                await _voertuigService.UpdateVoertuigAsync(dto);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [Authorize(Roles = "BackOfficeMedewerker,Admin")]
        [HttpDelete("DeleteVoertuig/{id}")]
        public async Task<IActionResult> DeleteVoertuig(int id)
        {
            try
            {
                await _voertuigService.DeleteVoertuigAsync(id);
                return Ok(new { message = "Voertuig succesvol gemarkeerd voor verwijdering" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message }); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Er heeft zich een onverwachte fout voorgedaan", detail = ex.Message });
            }
        }
        [Authorize(Roles = "BackOfficeMedewerker,Admin")]
        [HttpGet("MarkedForDeletion")]
        public async Task<IActionResult> GetMarkedForDeletion()
        {
            try
            {
                var voertuigen = await _voertuigService.GetMarkedForDeletionAsync();
                if (!voertuigen.Any())
                {
                    return NotFound(new { message = "Geen voertuigen zijn gemarkeerd voor verwijdering" });
                }

                return Ok(voertuigen);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Er heeft zich een onverwachte fout voorgedaan", detail = ex.Message });
            }
        }
        [Authorize(Roles = "BackOfficeMedewerker,Admin")]
        [HttpPut("Restore/{id}")]
        public async Task<IActionResult> RestoreVoertuig(int id)
        {
            try
            {
                var result = await _voertuigService.RestoreVoertuigAsync(id);
                if (result)
                {
                    return Ok(new { message = "Voertuig succesvol teruggehaald" });
                }
                return BadRequest(new { message = "Het is niet gelukt om het voertuig terug te halen" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Er heeft zich een onverwachte fout voorgedaan", detail = ex.Message });
            }
        }
        [Authorize(Roles = "BackOfficeMedewerker,Admin")]
        [HttpGet("Voertuig/{voertuigId}")]
        public async Task<IActionResult> GetReserveringenByVoertuigId(int voertuigId)
        {
            try
            {
                var reserveringen = await _voertuigService.GetReserveringenByVoertuigIdAsync(voertuigId);
                if (!reserveringen.Any())
                {
                    return NotFound(new { message = $"Er zijn geen reserveringen gevonden met het volgende ID: {voertuigId}." });
                }
                return Ok(reserveringen);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Er heeft zich een onverwachte fout voorgedaan", detail = ex.Message });
            }
        }

    }
}
