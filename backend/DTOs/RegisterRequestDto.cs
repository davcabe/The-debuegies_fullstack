using System.ComponentModel.DataAnnotations;
namespace Fullstack.DTOs;
public record RegisterRequestDto([Required][EmailAddress] string Email, [Required] string Password);