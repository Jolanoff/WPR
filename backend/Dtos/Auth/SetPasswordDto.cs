﻿namespace backend.Dtos.Auth
{
    public class SetPasswordDto
    {
        public string UserId { get; set; }
        public string Token { get; set; }
        public string Password { get; set; }
    }
}
