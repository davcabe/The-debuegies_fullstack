using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Fullstack.DTOs;
using Fullstack.Services;
using System.Security.Claims;
using Fullstack.Models;

namespace Fullstack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto request)
        {
            var (success, user, errorMessage) = await _userService.RegisterAsync(request.Email, request.Password);
            if (!success)
            {
                return BadRequest(new { message = errorMessage });
            }
            return Ok(new {user!.Id, user.Email});
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            var (success, token, errorMessage) = await _userService.LoginAsync(request.Email, request.Password);
            if (!success)
            {
                return Unauthorized(new { message = errorMessage });
            }
            return Ok(new { token });
        }

        [HttpGet("users")]
        [Authorize]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            var safeUsers = users.Select(u => new { u.Id, u.Email });
            return Ok(users);
        }
    }
}