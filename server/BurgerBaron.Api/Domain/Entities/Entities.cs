using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BurgerBaron.Api.Domain.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, EmailAddress, MaxLength(256)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string Role { get; set; } = "Customer"; // Customer, Admin, DeliveryStaff

        [MaxLength(25)]
        public string? Phone { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }

    public class Category
    {
        [Key, MaxLength(50)]
        public string Id { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? IconUrl { get; set; }

        public bool IsActive { get; set; } = true;

        public ICollection<Product> Products { get; set; } = new List<Product>();
    }

    public class Product
    {
        [Key, MaxLength(50)]
        public string Id { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string CategoryId { get; set; } = string.Empty;

        [ForeignKey(nameof(CategoryId))]
        public Category? Category { get; set; }

        [Required, MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal BasePrice { get; set; }

        [Required, MaxLength(500)]
        public string ImageUrl { get; set; } = string.Empty;

        public bool IsAvailable { get; set; } = true;

        public int? Calories { get; set; }

        [Column(TypeName = "decimal(3,2)")]
        public decimal Rating { get; set; } = 5.0m;

        public int ReviewCount { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class CustomizationOption
    {
        [Key, MaxLength(50)]
        public string Id { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string Category { get; set; } = string.Empty; // Bun, Patty, Cheese, Topping, Sauce

        [Column(TypeName = "decimal(18,2)")]
        public decimal ExtraPrice { get; set; } = 0.00m;

        public bool IsAvailable { get; set; } = true;
    }

    public class Coupon
    {
        [Key, MaxLength(50)]
        public string Id { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string Code { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string DiscountType { get; set; } = "Percentage"; // Percentage, Fixed

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountValue { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal MinSpend { get; set; } = 0.00m;

        public DateTime ExpiryDate { get; set; }

        [Required, MaxLength(255)]
        public string Description { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        public int MaxUsageLimit { get; set; } = 1000;

        public int CurrentUsageCount { get; set; } = 0;
    }

    public class Order
    {
        [Key, MaxLength(50)]
        public string Id { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string OrderNumber { get; set; } = string.Empty;

        public int? UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        [Required, MaxLength(100)]
        public string CustomerName { get; set; } = string.Empty;

        [Required, EmailAddress, MaxLength(256)]
        public string CustomerEmail { get; set; } = string.Empty;

        [Required, MaxLength(25)]
        public string CustomerPhone { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string OrderType { get; set; } = "delivery"; // delivery, pickup

        [Required, MaxLength(50)]
        public string OrderStatus { get; set; } = "Placed"; // Placed, Confirmed, Preparing in Kitchen, Out for Delivery, Delivered

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountAmount { get; set; } = 0.00m;

        [Column(TypeName = "decimal(18,2)")]
        public decimal FinalAmount { get; set; }

        [Required, MaxLength(50)]
        public string PaymentMethod { get; set; } = "card";

        public string? DeliveryAddress { get; set; }

        [MaxLength(100)]
        public string? CourierName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }

    public class OrderItem
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string OrderId { get; set; } = string.Empty;

        [ForeignKey(nameof(OrderId))]
        public Order? Order { get; set; }

        [Required, MaxLength(50)]
        public string ProductId { get; set; } = string.Empty;

        [ForeignKey(nameof(ProductId))]
        public Product? Product { get; set; }

        public int Quantity { get; set; } = 1;

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }

        public string? SelectedCustomizationsJson { get; set; }
    }

    public class Review
    {
        [Key, MaxLength(50)]
        public string Id { get; set; } = string.Empty;

        public int? UserId { get; set; }

        [Required, MaxLength(100)]
        public string UserName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? ProductId { get; set; }

        [Required, MaxLength(150)]
        public string OrderedItemName { get; set; } = string.Empty;

        [Range(1, 5)]
        public int Rating { get; set; } = 5;

        [Required]
        public string Comment { get; set; } = string.Empty;

        public bool IsVerifiedBuyer { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
