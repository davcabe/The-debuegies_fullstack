using System.ComponentModel.DataAnnotations;
namespace MyAuthApp.DTOs;
public record LoginRequestDto([Required][EmailAddress] string Email, [Required] string Password);