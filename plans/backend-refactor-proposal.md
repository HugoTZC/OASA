# OASA Backend Refactor Proposal

## Executive Summary

This document proposes refactoring the OASA backend from a complex PostgreSQL-based system with authentication/admin features to a simplified SQLite-based product catalog API. The original request was for a simple digital catalog without login or admin panel, but the current implementation has evolved into an overly complex system that isn't fully functional.

---

## 1. Current Backend Analysis

### 1.1 Why the Backend API Isn't Working

The frontend is attempting to fetch products from an external backend service at `http://localhost:3001/api/products` (configurable via `NEXT_PUBLIC_BACKEND_URL`), but **this backend does not exist** in the current project. The product service in [`lib/products.ts`](lib/products.ts:3) expects:

```
GET http://localhost:3001/api/products
GET http://localhost:3001/api/products/{id}
GET http://localhost:3001/api/products/categories/all
```

However, there are no corresponding API routes in the Next.js app - only admin routes exist for:
- `/api/admin/featured-products/*`
- `/api/admin/category-showcase/*`
- `/api/admin/departments/*`
- `/api/admin/hero-slides/*`
- `/api/admin/users/*`

### 1.2 Current Data Architecture Issues

| Component | Current Implementation | Issue |
|-----------|----------------------|-------|
| **Products** | Expected external backend | Does not exist |
| **Admin Data** | In-memory arrays | Lost on server restart |
| **Auth** | In-memory mock sessions | Not persistent |
| **Features** | PostgreSQL with complex subscription system | Over-engineered for catalog |
| **Settings** | PostgreSQL | Over-engineered for simple site |

### 1.3 PostgreSQL Connection Details Found

From [`lib/feature-manager.ts`](lib/feature-manager.ts:1) and [`app/api/settings/shopping/route.ts`](app/api/settings/shopping/route.ts:4):

```typescript
const pool = new Pool({
  user: 'hugotzc',
  host: 'localhost',
  database: 'OASA',
  password: 'dbaaccess',
  port: 5432,
})
```

The database has 20+ tables (users, products, orders, cart_items, subscriptions, features, etc.) that are unnecessary for a simple product catalog.

---

## 2. New SQLite Schema Design

### 2.1 Simplified Schema

For the product catalog, we only need the following tables:

```sql
-- Core product catalog tables

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT DEFAULT 'bg-blue-800',
    parent_id INTEGER REFERENCES categories(id),
    display_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sku TEXT UNIQUE,
    description TEXT,
    short_description TEXT,
    category_id INTEGER REFERENCES categories(id),
    brand_id INTEGER REFERENCES brands(id),
    price REAL DEFAULT 0,
    original_price REAL,
    cost_price REAL,
    stock_quantity INTEGER DEFAULT 0,
    min_stock_level INTEGER DEFAULT 0,
    weight REAL,
    dimensions_length REAL,
    dimensions_width REAL,
    dimensions_height REAL,
    is_featured INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    is_digital INTEGER DEFAULT 0,
    requires_shipping INTEGER DEFAULT 1,
    rating_average REAL DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    website_url TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER DEFAULT 0,
    is_primary INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Site settings (simplified)
CREATE TABLE site_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type TEXT DEFAULT 'text',
    description TEXT,
    is_public INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Category showcase (for homepage)
CREATE TABLE category_showcases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER REFERENCES categories(id),
    title TEXT,
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Hero slides (for homepage)
CREATE TABLE hero_slides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    cta_text TEXT,
    cta_url TEXT,
    image_url TEXT,
    background_color TEXT,
    text_color TEXT,
    display_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    start_date TEXT,
    end_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Featured products (for homepage sections)
CREATE TABLE featured_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER REFERENCES products(id),
    section_name TEXT DEFAULT 'featured',
    display_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 Seed Data

```sql
-- Seed categories
INSERT INTO categories (name, slug, description, icon, color, display_order, is_active) VALUES
('Gases Industriales', 'gases-industriales', 'Oxígeno, argón, acetileno y más gases para uso industrial', 'Settings', 'bg-blue-800', 1, 1),
('Equipos de Soldadura', 'equipos-soldadura', 'Soldadoras, electrodos y accesorios profesionales', 'Zap', 'bg-blue-800', 2, 1),
('Herramientas', 'herramientas', 'Herramientas manuales y eléctricas de calidad', 'Wrench', 'bg-blue-800', 3, 1),
('Equipos Neumáticos', 'equipos-neumaticos', 'Compresores y herramientas neumáticas', 'Fuel', 'bg-blue-800', 4, 1),
('Seguridad Industrial', 'seguridad-industrial', 'Equipo de protección personal y seguridad', 'Shield', 'bg-blue-800', 5, 1);

-- Seed sample products
INSERT INTO products (name, slug, sku, description, category_id, price, original_price, stock_quantity, is_featured, is_active, rating_average, rating_count) VALUES
('Tanque de Oxígeno Industrial 50L', 'tanque-oxigeno-industrial-50l', 'OXI-50L-001', 'Tanque de oxígeno de alta calidad para uso industrial y médico.', 1, 1250.00, 1400.00, 15, 1, 1, 4.5, 23),
('Soldadora MIG 200A', 'soldadora-mig-200a', 'SOL-MIG-200', 'Soldadora MIG profesional de 200 amperios.', 2, 8500.00, 9200.00, 8, 1, 1, 4.8, 15),
('Kit de Herramientas 150pcs', 'kit-herramientas-150pcs', 'HERR-KIT-150', 'Kit completo de herramientas manuales.', 3, 2100.00, 2400.00, 25, 1, 1, 4.3, 42),
('Filtro de Aire Industrial', 'filtro-aire-industrial', 'FIL-AIR-001', 'Filtro de aire de alta capacidad para maquinaria industrial.', 1, 180.00, 200.00, 50, 0, 1, 4.1, 8),
('Guantes de Seguridad', 'guantes-seguridad', 'SEG-GUANTE-001', 'Guantes de protección industrial resistentes.', 5, 85.00, 100.00, 100, 0, 1, 4.6, 67);

-- Seed product images
INSERT INTO product_images (product_id, url, alt_text, display_order, is_primary) VALUES
(1, '/images/products/tanque-oxigeno.jpg', 'Tanque de Oxígeno Industrial', 1, 1),
(2, '/images/products/soldadora-mig.jpg', 'Soldadora MIG 200A', 1, 1),
(3, '/images/products/herramientas.jpg', 'Kit de Herramientas', 1, 1);

-- Seed site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'OASA', 'text', 'Company name'),
('site_description', 'Tu fuente confiable para gases industriales y equipos de soldadura', 'text', 'Site description'),
('enable_shopping', 'true', 'boolean', 'Enable shopping cart functionality'),
('enable_pricing', 'true', 'boolean', 'Show product prices'),
('shopping_mode', 'catalog', 'text', 'Shopping mode: full, catalog, or disabled');
```

---

## 3. New API Endpoints Structure

### 3.1 Catalog Endpoints (Public - No Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products with filtering & pagination |
| GET | `/api/products/[slug]` | Get single product by slug |
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/[slug]` | Get category by slug with products |
| GET | `/api/featured` | Get featured products for homepage |
| GET | `/api/search` | Search products |

### 3.2 Settings Endpoints (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings` | Get all public site settings |
| GET | `/api/settings/shopping` | Get shopping-related settings |

### 3.3 Admin Endpoints (Future - Preserved for Scalability)

These endpoints are preserved but will use SQLite instead of PostgreSQL. They require authentication (to be implemented later).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/admin/products` | Manage products |
| GET/PUT/DELETE | `/api/admin/products/[id]` | Single product CRUD |
| GET/POST | `/api/admin/categories` | Manage categories |
| GET/POST | `/api/admin/hero-slides` | Manage hero slides |
| GET/POST | `/api/admin/featured-products` | Manage featured products |

### 3.4 Response Formats

#### GET /api/products
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Tanque de Oxígeno Industrial 50L",
      "slug": "tanque-oxigeno-industrial-50l",
      "description": "Tanque de oxígeno de alta calidad...",
      "category": "Gases Industriales",
      "price": 1250.00,
      "originalPrice": 1400.00,
      "image": "/images/products/tanque-oxigeno.jpg",
      "images": [...],
      "inStock": true,
      "rating": 4.5,
      "reviews": 23,
      "isFeatured": true,
      "isNew": false,
      "isSale": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 5,
    "totalPages": 1
  }
}
```

#### GET /api/categories
```json
{
  "success": true,
  "categories": [
    {
      "id": 1,
      "name": "Gases Industriales",
      "slug": "gases-industriales",
      "description": "Oxígeno, argón...",
      "icon": "Settings",
      "color": "bg-blue-800",
      "productCount": 2
    }
  ]
}
```

---

## 4. New Backend Architecture

### 4.1 Technology Stack

- **Runtime**: Next.js 15 (App Router)
- **Database**: SQLite with `better-sqlite3` (synchronous, faster for simple use cases)
- **ORM**: Drizzle ORM (lightweight, type-safe, works great with SQLite)
- **No external backend needed**: All API routes in Next.js

### 4.2 Project Structure

```
lib/
├── db/
│   ├── index.ts          # Database connection
│   ├── schema.ts         # Drizzle schema definitions
│   └── seed.ts           # Seed data
├── services/
│   ├── products.ts       # Product CRUD operations
│   ├── categories.ts    # Category operations
│   └── settings.ts      # Settings operations
app/
├── api/
│   ├── products/
│   │   ├── route.ts           # GET /api/products
│   │   └── [slug]/
│   │       └── route.ts       # GET /api/products/[slug]
│   ├── categories/
│   │   ├── route.ts           # GET /api/categories
│   │   └── [slug]/
│   │       └── route.ts       # GET /api/categories/[slug]
│   ├── featured/
│   │   └── route.ts           # GET /api/featured
│   ├── search/
│   │   └── route.ts           # GET /api/search
│   └── settings/
│       └── shopping/
│           └── route.ts       # GET /api/settings/shopping
```

### 4.3 Database Client (lib/db/index.ts)

```typescript
import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'oasa.db')
export const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Initialize tables
import { initializeDatabase } from './schema'
initializeDatabase(db)
```

---

## 5. Migration Plan

### Phase 1: Create SQLite Database & API (Priority: High)

1. **Create database initialization script**
   - Set up SQLite database with schema
   - Add seed data from PostgreSQL backup

2. **Create product API endpoints**
   - `/api/products` - List with filtering/pagination
   - `/api/products/[slug]` - Single product
   - `/api/categories` - Category list
   - `/api/featured` - Featured products

3. **Update frontend hooks**
   - Modify `lib/products.ts` to use local API
   - Remove external backend URL dependency

### Phase 2: Migrate Existing Data (Priority: High)

1. **Export from PostgreSQL backup**
   - Extract products, categories, brands from `backup_oasa.sql`
   - Convert to SQLite-compatible format

2. **Import to SQLite**
   - Run migration script with seed data

### Phase 3: Update Settings & Features (Priority: Medium)

1. **Simplify settings API**
   - Migrate from PostgreSQL to SQLite
   - Keep simple key-value store

2. **Simplify features system**
   - Remove subscription/plan complexity
   - Use simple boolean flags in settings

### Phase 4: Preserve Admin APIs for Future (Priority: Low)

1. **Create admin API routes with SQLite**
   - Keep same structure as current admin routes
   - Use in-memory data for now (can connect later)

2. **Add authentication later**
   - Current no-auth approach works for catalog
   - Add JWT auth when admin panel is needed

---

## 6. Implementation Checklist

- [ ] Install `better-sqlite3` and `drizzle-orm`
- [ ] Create database schema (`lib/db/schema.ts`)
- [ ] Create seed data script
- [ ] Implement GET `/api/products`
- [ ] Implement GET `/api/products/[slug]`
- [ ] Implement GET `/api/categories`
- [ ] Implement GET `/api/categories/[slug]`
- [ ] Implement GET `/api/featured`
- [ ] Implement GET `/api/search`
- [ ] Implement GET `/api/settings/shopping`
- [ ] Update `lib/products.ts` to use local API
- [ ] Update frontend hooks
- [ ] Test all endpoints
- [ ] Document new API structure

---

## 7. Benefits of This Approach

| Benefit | Description |
|---------|-------------|
| **Simplicity** | No external backend needed - all in Next.js |
| **Performance** | SQLite is faster for read-heavy catalog |
| **Easy Development** | No PostgreSQL setup required |
| **Portable** | Single file database, easy to backup |
| **Future-Ready** | Can add auth/admin later |
| **Cost** | Free - no database server costs |

---

## 8. Current vs Proposed Comparison

| Aspect | Current (PostgreSQL) | Proposed (SQLite) |
|--------|---------------------|-------------------|
| **Products API** | Expected external backend (broken) | Built-in Next.js API |
| **Database** | PostgreSQL server required | Single file, no server |
| **Auth** | Mock in-memory | None (catalog is public) |
| **Admin** | In-memory mock | Preserved for future |
| **Setup** | Complex PostgreSQL setup | Simple npm install |
| **Deployment** | Requires database server | Zero config |

---

*Document created for OASA backend refactoring proposal*
*Last updated: 2026-03-20*
