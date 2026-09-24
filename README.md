# 🍔 THE BURGER BARON — Enterprise Restaurant Platform

> **Gourmet Smash Burgers, Hand-Spun Frozen Custards & Live Kitchen Operations**  
> An enterprise-grade, full-stack commercial restaurant management and digital ordering system built with modern React (Vite + TypeScript) and a clean .NET Web API with Microsoft SQL Server.

---

## 🌟 Key Highlights & Features

### 👑 Customer Experience Portal
- **Appetite-Inducing Gourmet UI**: Custom tailored palette featuring Warm Off-White (`#F8F6F2`), Pure Elevated Surfaces (`#FFFFFF`), Sizzling Crimson Flame (`#DC2626`), Cheddar Gold (`#F59E0B`), and Deep Obsidian Charcoal (`#18181B`).
- **2D Visual Burger Customizer**: Interactive burger studio allowing customers to dynamically stack brioche buns, double Wagyu patties, cheese, caramelized onions, jalapeños, and secret Baron sauce with real-time layer visualization and live price calculation.
- **Flash Deal Engine**: Synchronized countdown timer with instant one-click coupon claiming (`BARON25` for 25% off).
- **Multi-Category Filterable Menu**: 7 curated categories (Prime Smash Burgers, Crispy Chicken, Value Combos, Artisanal Sides, Craft Shakes, Beverages, Signature Dips) with dynamic price and popularity sorting.
- **Cart & Fast Checkout Drawer**: Free delivery progress milestone meter, tip selector, delivery notes, and instant simulated order placement.
- **Live 5-Stage GPS Order Radar**: Visual progress tracking (Placed ➔ Confirmed ➔ On Grill ➔ Out for Delivery ➔ Delivered) with live courier contact.
- **Customer Account & Past Order History**: Built-in loyalty rewards (Baron Points), past order history with 1-click **Re-Order** and live tracking shortcuts.

### 🛡️ Restaurant Operations & Kitchen Desk (Admin Portal)
- **Live Kitchen Kanban Board**: Drag/click ticket workflow across 5 operational columns:
  1. `New Tickets`
  2. `Confirmed / Prep`
  3. `On Grill / Cooking`
  4. `Out for Delivery`
  5. `Completed / Delivered`
- **Real-Time Sales Metrics**: Live revenue calculations, average order value (AOV), total order counter, and active preparation load.
- **Inventory & Menu Availability Control**: 1-click toggle to mark items in-stock or 86'd (sold out).
- **Promo Code Engine**: Dynamic coupon management with minimum order thresholds and discount rules.

---

## 🏗️ System & Enterprise Tech Stack

### Frontend (`/client`)
- **Core**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Design Tokens
- **Icons & Animation**: Lucide React + CSS Micro-animations
- **State Management**: React Context + Custom Reducer Hook (`StoreContext`)
- **Packaging**: Zero runtime dependencies outside standard React ecosystem

### Backend (`/server/BurgerBaron.Api`)
- **Framework**: .NET 10 / .NET 8 Web API
- **Architecture**: Domain-Driven Clean Architecture (API, Application DTOs, Domain Entities, Infrastructure)
- **ORM**: Entity Framework Core with Code-First Migrations
- **Database**: Microsoft SQL Server (Normalized relational schema in `BurgerBaron_Schema.sql`)
- **Authentication**: JWT Bearer Tokens & Role-Based Authorization (`Customer` vs `RestaurantAdmin`)

---

## 🚀 Getting Started

### 1. Run Frontend (Client)
```bash
cd client
npm install
npm run dev
```
Open your browser at `http://127.0.0.1:5174/` (or port indicated by Vite).

### 2. Run Backend API (.NET)
```bash
cd server/BurgerBaron.Api
dotnet restore
dotnet build
dotnet run
```
Access Swagger API documentation at: `https://localhost:5001/swagger`

### 3. Database Setup (SQL Server)
Open SQL Server Management Studio (SSMS) or Azure Data Studio and execute the script:
```
server/BurgerBaron_Schema.sql
```

---

## 👥 Demo Logins (Built-in 1-Click Access)

| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **Customer** | Alex Sterling | `alex.sterling@gmail.com` | `Customer@123` |
| **Admin** | Chef Sarah Lin | `admin@burgerbaron.com` | `BaronAdmin@2026` |

---

## 📄 License
MIT License. Built for high-performance commercial restaurant operations.
