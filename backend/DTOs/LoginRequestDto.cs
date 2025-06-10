using System.ComponentModel.DataAnnotations;
namespace Fullstack.DTOs;
public record LoginRequestDto([Required][EmailAddress] string Email, [Required] string Password);