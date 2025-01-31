using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class BlogPost
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public string? ImageUrl { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string Author { get; set; } 

        public bool IsPublished { get; set; } = false;
    }
}
