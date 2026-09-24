using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BurgerBaron.Api.Application.DTOs;
using BurgerBaron.Api.Domain.Entities;
using BurgerBaron.Api.Infrastructure.Data;

namespace BurgerBaron.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CouponsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CouponsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coupon>>> GetActiveCoupons()
        {
            var coupons = await _context.Coupons
                .Where(c => c.IsActive && c.ExpiryDate >= DateTime.UtcNow)
                .ToListAsync();

            return Ok(coupons);
        }

        [HttpPost("validate")]
        public async Task<ActionResult<ValidateCouponResponse>> ValidateCoupon([FromBody] ValidateCouponRequest request)
        {
            var code = request.Code.Trim().ToUpper();
            var coupon = await _context.Coupons.FirstOrDefaultAsync(c => c.Code.ToUpper() == code);

            if (coupon == null || !coupon.IsActive)
            {
                return Ok(new ValidateCouponResponse(false, "Invalid or unrecognized promo code.", null, null, 0, 0));
            }

            if (coupon.ExpiryDate < DateTime.UtcNow)
            {
                return Ok(new ValidateCouponResponse(false, "This coupon has expired.", coupon.Code, coupon.DiscountType, coupon.DiscountValue, 0));
            }

            if (coupon.CurrentUsageCount >= coupon.MaxUsageLimit)
            {
                return Ok(new ValidateCouponResponse(false, "This promotional coupon has reached its maximum redemptions.", coupon.Code, coupon.DiscountType, coupon.DiscountValue, 0));
            }

            if (request.OrderSubtotal < coupon.MinSpend)
            {
                return Ok(new ValidateCouponResponse(
                    false,
                    $"Order minimum spend of ${coupon.MinSpend:F2} required. Current subtotal is ${request.OrderSubtotal:F2}.",
                    coupon.Code,
                    coupon.DiscountType,
                    coupon.DiscountValue,
                    0
                ));
            }

            decimal discountAmount = 0m;
            if (coupon.DiscountType == "Percentage")
            {
                discountAmount = (request.OrderSubtotal * coupon.DiscountValue) / 100m;
            }
            else
            {
                discountAmount = Math.Min(request.OrderSubtotal, coupon.DiscountValue);
            }

            return Ok(new ValidateCouponResponse(
                true,
                $"Coupon {coupon.Code} applied! You saved ${discountAmount:F2}.",
                coupon.Code,
                coupon.DiscountType,
                coupon.DiscountValue,
                decimal.Round(discountAmount, 2)
            ));
        }

        [HttpPost("create")]
        public async Task<ActionResult<Coupon>> CreateCoupon([FromBody] CreateCouponRequest request)
        {
            var existing = await _context.Coupons.AnyAsync(c => c.Code.ToUpper() == request.Code.ToUpper());
            if (existing)
            {
                return Conflict(new { message = $"Coupon code '{request.Code}' already exists." });
            }

            var coupon = new Coupon
            {
                Id = "c-" + Guid.NewGuid().ToString("N").Substring(0, 8),
                Code = request.Code.ToUpper(),
                DiscountType = request.DiscountType,
                DiscountValue = request.DiscountValue,
                MinSpend = request.MinSpend,
                ExpiryDate = request.ExpiryDate,
                Description = request.Description,
                IsActive = true
            };

            _context.Coupons.Add(coupon);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetActiveCoupons), new { id = coupon.Id }, coupon);
        }
    }
}
