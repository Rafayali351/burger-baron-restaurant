-- ============================================================================
-- THE BURGER BARON - PRODUCTION RELATIONAL DATABASE SCHEMA (MICROSOFT SQL SERVER)
-- Enterprise-grade DDL with Primary Keys, Foreign Keys, Indexes & Seed Data
-- ============================================================================

CREATE DATABASE BurgerBaronDb;
GO

USE BurgerBaronDb;
GO

-- 1. USERS TABLE
CREATE TABLE [dbo].[Users] (
    [Id] INT IDENTITY(1,1) NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [Email] NVARCHAR(256) NOT NULL,
    [PasswordHash] NVARCHAR(MAX) NOT NULL,
    [Role] NVARCHAR(50) NOT NULL DEFAULT 'Customer', -- 'Customer', 'Admin', 'DeliveryStaff'
    [Phone] NVARCHAR(25) NULL,
    [CreatedAt] DATETIME2(7) NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE UNIQUE NONCLUSTERED INDEX [IX_Users_Email] ON [dbo].[Users]([Email] ASC);
GO

-- 2. CATEGORIES TABLE
CREATE TABLE [dbo].[Categories] (
    [Id] NVARCHAR(50) NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [IconUrl] NVARCHAR(255) NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

-- 3. PRODUCTS TABLE
CREATE TABLE [dbo].[Products] (
    [Id] NVARCHAR(50) NOT NULL,
    [CategoryId] NVARCHAR(50) NOT NULL,
    [Name] NVARCHAR(150) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    [BasePrice] DECIMAL(18,2) NOT NULL,
    [ImageUrl] NVARCHAR(500) NOT NULL,
    [IsAvailable] BIT NOT NULL DEFAULT 1,
    [Calories] INT NULL,
    [Rating] DECIMAL(3,2) NOT NULL DEFAULT 5.0,
    [ReviewCount] INT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2(7) NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Products_Categories] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([Id]) ON DELETE CASCADE
);
CREATE NONCLUSTERED INDEX [IX_Products_CategoryId] ON [dbo].[Products]([CategoryId] ASC);
GO

-- 4. CUSTOMIZATION OPTIONS TABLE
CREATE TABLE [dbo].[CustomizationOptions] (
    [Id] NVARCHAR(50) NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [Category] NVARCHAR(50) NOT NULL, -- 'Bun', 'Patty', 'Cheese', 'Topping', 'Sauce'
    [ExtraPrice] DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    [IsAvailable] BIT NOT NULL DEFAULT 1,
    CONSTRAINT [PK_CustomizationOptions] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE NONCLUSTERED INDEX [IX_CustomizationOptions_Category] ON [dbo].[CustomizationOptions]([Category] ASC);
GO

-- 5. COUPONS TABLE
CREATE TABLE [dbo].[Coupons] (
    [Id] NVARCHAR(50) NOT NULL,
    [Code] NVARCHAR(50) NOT NULL,
    [DiscountType] NVARCHAR(20) NOT NULL, -- 'Percentage', 'Fixed'
    [DiscountValue] DECIMAL(18,2) NOT NULL,
    [MinSpend] DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    [ExpiryDate] DATETIME2(7) NOT NULL,
    [Description] NVARCHAR(255) NOT NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [MaxUsageLimit] INT NOT NULL DEFAULT 1000,
    [CurrentUsageCount] INT NOT NULL DEFAULT 0,
    CONSTRAINT [PK_Coupons] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE UNIQUE NONCLUSTERED INDEX [IX_Coupons_Code] ON [dbo].[Coupons]([Code] ASC);
GO

-- 6. ORDERS TABLE
CREATE TABLE [dbo].[Orders] (
    [Id] NVARCHAR(50) NOT NULL,
    [OrderNumber] NVARCHAR(50) NOT NULL,
    [UserId] INT NULL, -- NULL for Guest checkout
    [CustomerName] NVARCHAR(100) NOT NULL,
    [CustomerEmail] NVARCHAR(256) NOT NULL,
    [CustomerPhone] NVARCHAR(25) NOT NULL,
    [OrderType] NVARCHAR(20) NOT NULL DEFAULT 'delivery', -- 'delivery', 'pickup'
    [OrderStatus] NVARCHAR(50) NOT NULL DEFAULT 'Placed', -- 'Placed', 'Confirmed', 'Preparing in Kitchen', 'Out for Delivery', 'Delivered'
    [TotalAmount] DECIMAL(18,2) NOT NULL,
    [DiscountAmount] DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    [FinalAmount] DECIMAL(18,2) NOT NULL,
    [PaymentMethod] NVARCHAR(50) NOT NULL DEFAULT 'card', -- 'card', 'cod', 'applepay'
    [DeliveryAddress] NVARCHAR(MAX) NULL,
    [CourierName] NVARCHAR(100) NULL,
    [CreatedAt] DATETIME2(7) NOT NULL DEFAULT SYSUTCDATETIME(),
    [UpdatedAt] DATETIME2(7) NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Orders_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE SET NULL
);
CREATE NONCLUSTERED INDEX [IX_Orders_UserId] ON [dbo].[Orders]([UserId] ASC);
CREATE NONCLUSTERED INDEX [IX_Orders_OrderStatus] ON [dbo].[Orders]([OrderStatus] ASC);
GO

-- 7. ORDER ITEMS TABLE
CREATE TABLE [dbo].[OrderItems] (
    [Id] INT IDENTITY(1,1) NOT NULL,
    [OrderId] NVARCHAR(50) NOT NULL,
    [ProductId] NVARCHAR(50) NOT NULL,
    [Quantity] INT NOT NULL DEFAULT 1,
    [UnitPrice] DECIMAL(18,2) NOT NULL,
    [SelectedCustomizationsJson] NVARCHAR(MAX) NULL, -- JSON string storing custom buns, patties, cheeses, toppings
    CONSTRAINT [PK_OrderItems] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_OrderItems_Orders] FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Orders] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_OrderItems_Products] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products] ([Id])
);
CREATE NONCLUSTERED INDEX [IX_OrderItems_OrderId] ON [dbo].[OrderItems]([OrderId] ASC);
GO

-- 8. REVIEWS TABLE
CREATE TABLE [dbo].[Reviews] (
    [Id] NVARCHAR(50) NOT NULL,
    [UserId] INT NULL,
    [UserName] NVARCHAR(100) NOT NULL,
    [ProductId] NVARCHAR(50) NULL,
    [OrderedItemName] NVARCHAR(150) NOT NULL,
    [Rating] INT NOT NULL CHECK ([Rating] BETWEEN 1 AND 5),
    [Comment] NVARCHAR(MAX) NOT NULL,
    [IsVerifiedBuyer] BIT NOT NULL DEFAULT 1,
    [CreatedAt] DATETIME2(7) NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT [PK_Reviews] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE NONCLUSTERED INDEX [IX_Reviews_ProductId] ON [dbo].[Reviews]([ProductId] ASC);
GO

-- ============================================================================
-- SEED INITIAL SYSTEM DATA (CATEGORIES, PRODUCTS, CUSTOMIZATIONS & COUPONS)
-- ============================================================================

INSERT INTO [dbo].[Categories] ([Id], [Name], [IconUrl], [IsActive]) VALUES
('smash-burgers', 'Gourmet Smash Burgers', 'flame', 1),
('crispy-chicken', 'Crispy Chicken', 'drumstick', 1),
('value-combos', 'Value Combos', 'percent', 1),
('fries-sides', 'Artisanal Fries & Sides', 'utensils', 1),
('craft-beverages', 'Craft Beverages', 'coffee', 1),
('shakes-desserts', 'Shakes & Desserts', 'icecream', 1);

INSERT INTO [dbo].[CustomizationOptions] ([Id], [Name], [Category], [ExtraPrice], [IsAvailable]) VALUES
('bun-brioche', 'Artisanal Golden Brioche', 'Bun', 0.00, 1),
('bun-potato', 'Amish Potato Roll', 'Bun', 0.50, 1),
('bun-sesame', 'Toasted Sesame Brioche', 'Bun', 0.50, 1),
('bun-glutenfree', 'Gluten-Free Seeded Roll', 'Bun', 1.75, 1),
('protein-wagyu', '100% Prime Wagyu Beef (4oz Patty)', 'Patty', 0.00, 1),
('protein-angus', 'Certified Black Angus Beef', 'Patty', 0.00, 1),
('protein-zinger', 'Crispy Fried Nashville Chicken', 'Patty', 1.00, 1),
('protein-veggie', 'Beyond Plant-Based Wagyu Patty', 'Patty', 2.00, 1),
('cheese-wisconsin', 'Aged Wisconsin Yellow Cheddar', 'Cheese', 1.00, 1),
('cheese-swiss', 'Melted Swiss Gruyère', 'Cheese', 1.25, 1),
('cheese-monterey', 'Ghost Pepper Monterey Jack', 'Cheese', 1.25, 1),
('top-bacon', 'Crispy Applewood Smoked Bacon', 'Topping', 2.00, 1),
('top-shallotjam', 'Slow-Caramelized Shallot Jam', 'Topping', 1.25, 1),
('top-onionrings', 'Beer-Battered Onion Rings', 'Topping', 1.50, 1),
('sauce-truffle', 'Black Truffle Garlic Aioli', 'Sauce', 1.00, 1),
('sauce-baronsecret', 'Baron Signature Secret Sauce', 'Sauce', 0.75, 1);

INSERT INTO [dbo].[Coupons] ([Id], [Code], [DiscountType], [DiscountValue], [MinSpend], [ExpiryDate], [Description], [IsActive]) VALUES
('c-1', 'BARON25', 'Percentage', 25.00, 25.00, '2026-12-31', '25% OFF orders over $25 for our Grand Celebration!', 1),
('c-2', 'MIDNIGHT30', 'Percentage', 30.00, 30.00, '2026-11-30', '30% OFF late night crave orders over $30.', 1),
('c-3', 'WELCOME10', 'Fixed', 10.00, 20.00, '2026-12-31', '$10 OFF your first order with The Baron family.', 1);

INSERT INTO [dbo].[Products] ([Id], [CategoryId], [Name], [Description], [BasePrice], [ImageUrl], [IsAvailable], [Calories], [Rating], [ReviewCount]) VALUES
('prod-1', 'smash-burgers', 'The Baron''s Grand Wagyu Smash', 'Double 100% Australian Wagyu patties smashed lace-thin on 450°F cast iron, triple aged Wisconsin cheddar, shallot jam, house truffle aioli on toasted brioche.', 15.99, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', 1, 890, 4.9, 428),
('prod-2', 'smash-burgers', 'Truffle & Smoked Bacon Melt', 'Double smashed beef patties, thick-cut applewood smoked bacon, black truffle mushroom butter, Swiss Gruyère on golden potato roll.', 16.49, 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=80', 1, 940, 4.8, 312),
('prod-10', 'value-combos', 'Baron''s Double Crunch Wagyu Combo', 'The Baron''s Grand Wagyu Smash, Large Truffle Parmesan Fries, and Craft Shake or Soda.', 20.99, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80', 1, 1380, 5.0, 820),
('prod-13', 'fries-sides', 'Truffle Parmesan Hand-Cut Fries', 'Skin-on Russet potatoes tossed in white truffle oil, 24-month aged Parmigiano Reggiano, served with house truffle dip.', 6.99, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80', 1, 460, 4.9, 630);
GO
