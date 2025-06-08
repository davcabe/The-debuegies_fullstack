using System.ComponentModel.DataAnnotations;

namespace Fullstack.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string? email { get; set; } 
    
    [Required]
    public string? password { get; set; }

    }