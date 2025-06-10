using System.ComponentModel.DataAnnotations;

namespace Fullstack.Models;

public class User
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [EmailAddress]
    public string? Email { get; set; } 
    
    [Required]
    public string? PasswordHash { get; set; }

    }