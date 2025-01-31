using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.DbContext;
using backend.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/blog")]
public class BlogController : ControllerBase
{
    private readonly ApplicationsDbContext _context;

    public BlogController(ApplicationsDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetPublishedPosts()
    {
        var posts = await _context.BlogPosts
            .Where(p => p.IsPublished)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return Ok(posts);
    }

    [Authorize(Roles = "FrontOfficeMedewerker")]
    [HttpPost]
    public async Task<IActionResult> CreatePost([FromBody] BlogPost post)
    {
        if (string.IsNullOrWhiteSpace(post.Title) || string.IsNullOrWhiteSpace(post.Content))
            return BadRequest("Title and content are required.");

        post.CreatedAt = DateTime.UtcNow;
        post.Author = User.FindFirstValue(ClaimTypes.Name); 
        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();

        return Ok(post);
    }

    [Authorize(Roles = "FrontOfficeMedewerker")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePost(int id, [FromBody] BlogPost updatedPost)
    {
        var existingPost = await _context.BlogPosts.FindAsync(id);
        if (existingPost == null) return NotFound();

        existingPost.Title = updatedPost.Title;
        existingPost.Content = updatedPost.Content;
        existingPost.ImageUrl = updatedPost.ImageUrl;
        existingPost.IsPublished = updatedPost.IsPublished;

        _context.BlogPosts.Update(existingPost);
        await _context.SaveChangesAsync();

        return Ok(existingPost);
    }

    [Authorize(Roles = "FrontOfficeMedewerker")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();

        _context.BlogPosts.Remove(post);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Post deleted successfully" });
    }
}
