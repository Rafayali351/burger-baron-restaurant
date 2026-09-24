using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BurgerBaron.Api.Application.DTOs;
using BurgerBaron.Api.Domain.Entities;
using BurgerBaron.Api.Infrastructure.Data;

namespace BurgerBaron.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders([FromQuery] string? status)
        {
            var query = _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(o => o.OrderStatus == status);
            }

            var orders = await query.OrderByDescending(o => o.CreatedAt).ToListAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrderById(string id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.Id == id || o.OrderNumber == id);

            if (order == null)
            {
                return NotFound(new { message = $"Order '{id}' not found." });
            }

            return Ok(order);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUserId(int userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return Ok(orders);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] CreateOrderRequest request)
        {
            var orderId = "ord-" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var orderNumber = "#BB-" + new Random().Next(1000, 9999);

            var order = new Order
            {
                Id = orderId,
                OrderNumber = orderNumber,
                UserId = request.UserId,
                CustomerName = request.CustomerName,
                CustomerEmail = request.CustomerEmail,
                CustomerPhone = request.CustomerPhone,
                OrderType = request.OrderType,
                OrderStatus = "Placed",
                TotalAmount = request.TotalAmount,
                DiscountAmount = request.DiscountAmount,
                FinalAmount = request.FinalAmount,
                PaymentMethod = request.PaymentMethod,
                DeliveryAddress = request.DeliveryAddress,
                CourierName = "Tyler Vance",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                OrderItems = request.Items.Select(item => new OrderItem
                {
                    OrderId = orderId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    SelectedCustomizationsJson = item.SelectedCustomizationsJson
                }).ToList()
            };

            _context.Orders.Add(order);

            // Increment coupon usage if coupon used
            if (!string.IsNullOrWhiteSpace(request.CouponCode))
            {
                var coupon = await _context.Coupons.FirstOrDefaultAsync(c => c.Code == request.CouponCode);
                if (coupon != null)
                {
                    coupon.CurrentUsageCount++;
                }
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
        }

        [HttpPatch("{id}/status")]
        public async Task<ActionResult> UpdateOrderStatus(string id, [FromBody] UpdateOrderStatusRequest request)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id || o.OrderNumber == id);
            if (order == null)
            {
                return NotFound(new { message = $"Order '{id}' not found." });
            }

            order.OrderStatus = request.Status;
            order.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Order '{order.OrderNumber}' status updated to '{request.Status}'", order });
        }

        [HttpGet("analytics")]
        public async Task<ActionResult<SalesAnalyticsDto>> GetSalesAnalytics()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToListAsync();

            var totalRevenue = orders.Sum(o => o.FinalAmount);
            var totalOrdersCount = orders.Count;
            var averageOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0m;

            var topDishes = orders
                .SelectMany(o => o.OrderItems)
                .GroupBy(oi => oi.ProductId)
                .Select(g => new TopSellingDishDto(
                    g.Key,
                    g.FirstOrDefault()?.Product?.Name ?? g.Key,
                    g.Sum(oi => oi.Quantity),
                    g.Sum(oi => oi.UnitPrice * oi.Quantity)
                ))
                .OrderByDescending(d => d.QuantitySold)
                .Take(5)
                .ToList();

            return Ok(new SalesAnalyticsDto(totalRevenue, totalOrdersCount, averageOrderValue, topDishes));
        }
    }
}
