﻿namespace backend.Dtos.Voertuig
{
    public class ReserveringDto
    {
        public int Id { get; set; }
        public DateTime StartDatum { get; set; }
        public DateTime EindDatum { get; set; }
        public string KlantEmail { get; set; }
        public string KlantNaam { get; set; }
    }
}
