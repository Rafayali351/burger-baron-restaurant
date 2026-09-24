using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using BurgerBaron.Api.Infrastructure.Data;
using BurgerBaron.Api.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Controllers & JSON Serialization
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// 2. Configure Entity Framework Core with SQL Server (or InMemory for test environments)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (!string.IsNullOrEmpty(connectionString))
    {
        options.UseSqlServer(connectionString);
    }
});

// 3. Register Application Services
builder.Services.AddScoped<ITokenService, TokenService>();

// 4. Configure JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? "TheBurgerBaronUltraSecretSuperKey2026!#FlameBroiledGoldMasterSecretKey";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "BurgerBaronApi",
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "BurgerBaronClient",
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("StaffOnly", policy => policy.RequireRole("Admin", "DeliveryStaff"));
});

// 5. Configure CORS for React Client (Vite port 5173/5174/etc.)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 6. OpenAPI / Swagger Documentation
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Health Check Endpoint
app.MapGet("/api/health", () => Results.Ok(new
{
    Status = "Healthy",
    Service = "The Burger Baron Web API",
    Runtimes = ".NET 10 / .NET 9 Clean Architecture",
    Timestamp = DateTime.UtcNow
}));

app.Run();
