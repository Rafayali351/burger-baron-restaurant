using System.ComponentModel.DataAnnotations;

namespace BurgerBaron.Api.Application.DTOs
{
    // Auth DTOs
    public record RegisterRequest(
        [Required] string Name,
        [Required, EmailAddress] string Email,
        [Required, MinLength(6)] string Password,
        string? Phone,
        string Role = "Customer"
    );

    public record LoginRequest(
        [Required, EmailAddress] string Email,
        [Required] string Password
    );

    public record AuthResponse(
        int Id,
        string Name,
        string Email,
        string Role,
        string Token
    );

    // Coupon DTOs
    public record ValidateCouponRequest(
        [Required] string Code,
        [Range(0, 10000)] decimal OrderSubtotal
    );

    public record ValidateCouponResponse(
        bool IsValid,
        string Message,
        string? Code,
        string? DiscountType,
        decimal DiscountValue,
        decimal CalculatedDiscountAmount
    );

    public record CreateCouponRequest(
        [Required] string Code,
        [Required] string DiscountType,
        decimal DiscountValue,
        decimal MinSpend,
        DateTime ExpiryDate,
        string Description
    );

    // Order DTOs
    public record CreateOrderItemDto(
        string ProductId,
        int Quantity,
        decimal UnitPrice,
        string? SelectedCustomizationsJson
    );

    public record CreateOrderRequest(
        int? UserId,
        [Required] string CustomerName,
        [Required, EmailAddress] string CustomerEmail,
        [Required] string CustomerPhone,
        [Required] string OrderType,
        decimal TotalAmount,
        decimal DiscountAmount,
        decimal FinalAmount,
        string PaymentMethod,
        string? DeliveryAddress,
        string? CouponCode,
        List<CreateOrderItemDto> Items
    );

    public record UpdateOrderStatusRequest(
        [Required] string Status
    );

    public record SalesAnalyticsDto(
        decimal TotalRevenue,
        int TotalOrdersCount,
        decimal AverageOrderValue,
        List<TopSellingDishDto> TopSellingDishes
    );

    public record TopSellingDishDto(
        string ProductId,
        string ProductName,
        int QuantitySold,
        decimal GrossRevenue
    );
}
