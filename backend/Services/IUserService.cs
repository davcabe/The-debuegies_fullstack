using Fullstack.Models;

namespace Fullstack.Services
{
    public interface IUserService
    {
        Task<(bool Success, User? User, string? ErrorMessage)> RegisterAsync(string email, string password);
        Task<(bool Success, string? Token, string? ErrorMessage)> LoginAsync(string email, string password);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(Guid id);
    }
}