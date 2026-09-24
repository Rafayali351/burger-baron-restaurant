using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BurgerBaron.Api.Domain.Entities;
using BurgerBaron.Api.Infrastructure.Data;

namespace BurgerBaron.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomizationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomizationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<object>> GetAllCustomizationOptions()
        {
            var options = await _context.CustomizationOptions
                .Where(c => c.IsAvailable)
                .ToListAsync();

            var grouped = new
            {
                Buns = options.Where(o => o.Category == "Bun"),
                Proteins = options.Where(o => o.Category == "Patty"),
                Cheeses = options.Where(o => o.Category == "Cheese"),
                Toppings = options.Where(o => o.Category == "Topping"),
                Sauces = options.Where(o => o.Category == "Sauce")
            };

            return Ok(grouped);
        }
    }
}
