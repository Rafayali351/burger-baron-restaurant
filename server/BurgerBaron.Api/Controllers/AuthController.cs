using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BurgerBaron.Api.Application.DTOs;
using BurgerBaron.Api.Domain.Entities;
using BurgerBaron.Api.Infrastructure.Data;
using BurgerBaron.Api.Infrastructure.Services;

namespace BurgerBaron.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ITokenService _tokenService;

        public AuthController(AppDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == request.Email.ToLower()))
            {
                return BadRequest(new { message = "An account with this email already exists." });
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new User
            {
                Name = request.Name,
                Email = request.Email.ToLower(),
                PasswordHash = passwordHash,
                Role = string.IsNullOrWhiteSpace(request.Role) ? "Customer" : request.Role,
                Phone = request.Phone,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _tokenService.GenerateToken(user);
            return Ok(new AuthResponse(user.Id, user.Name, user.Email, user.Role, token));
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password credentials." });
            }

            var token = _tokenService.GenerateToken(user);
            return Ok(new AuthResponse(user.Id, user.Name, user.Email, user.Role, token));
        }
    }
}
