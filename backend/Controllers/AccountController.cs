﻿using backend.Dtos.Profiel;
using backend.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("Account")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var profile = await _accountService.GetProfileAsync(userId);
            return profile != null ? Ok(profile) : NotFound(new { message = "User not found" });
        }


        [HttpPut("Account")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.ToDictionary(
                    kvp => kvp.Key,
                     kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                 );
                return BadRequest(ModelState); // Return validation errors
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var (success, message) = await _accountService.UpdateProfile(userId, dto);
            return success
                ? Ok(new { message })
                : BadRequest(new { message });
        }


        [HttpDelete("Account")]
        [Authorize]
        public async Task<IActionResult> DeleteAccount()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var success = _accountService.DeleteAccount(userId);
            if (success)
            {
                await HttpContext.SignOutAsync(); 
                return Ok(new { message = "Account deleted successfully" });
            }

            return BadRequest(new { message = "Delete failed" });
        }


        [HttpPut("Account/ChangePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var success = await _accountService.ChangePasswordAsync(userId, dto);
            return success ? Ok(new { message = "Password updated successfully" }) : BadRequest(new { message = "Password update failed" });
        }
    }
}
