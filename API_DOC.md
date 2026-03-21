# OASA API Documentation

This document provides comprehensive documentation for all API endpoints in the OASA Next.js application.

## Table of Contents

- [Authentication APIs](#authentication-apis)
  - [POST /api/auth/login](#post-apiauthlogin)
  - [POST /api/auth/logout](#post-apiauthlogout)
  - [GET /api/auth/me](#get-apiauthme)
  - [POST /api/auth/register](#post-apiauthregister)
- [Admin APIs](#admin-apis)
  - [Category Showcase](#category-showcase)
  - [Departments](#departments)
  - [Featured Products](#featured-products)
  - [Hero Slides](#hero-slides)
  - [Users](#users)
- [Settings APIs](#settings-apis)
  - [Shopping Settings](#shopping-settings)
- [Features APIs](#features-apis)
  - [Features](#features)

---

## Authentication APIs

### POST /api/auth/login

Authenticates a user and creates a session.

**Endpoint URL:** `/api/auth/login`

**HTTP Method:** POST

**Description:** Authenticates a user with email and password, creates a session, and sets an HTTP-only auth cookie.

**Used By:**
- [`contexts/auth-context.tsx`](contexts/auth-context.tsx:56) - AuthContext login function

**Authentication Required:** No

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "admin" | "customer"
  }
}
```

**Error Response (401):**

```json
{
  "error": "Credenciales inválidas"
}
```

**Error Response (500):**

```json
{
  "error": "Error interno del servidor"
}
```

**Notes:**
- Sets an HTTP-only cookie named `auth-token` with a 7-day expiration
- For demo purposes, accepts any password (in production, password hash verification would be implemented)

---

### POST /api/auth/logout

Terminates the current user session.

**Endpoint URL:** `/api/auth/logout`

**HTTP Method:** POST

**Description:** Deletes the current session and clears the auth cookie.

**Used By:**
- [`contexts/auth-context.tsx`](contexts/auth-context.tsx:83) - AuthContext logout function

**Authentication Required:** No (but requires existing session cookie)

**Request Body:** None

**Success Response (200):**

```json
{
  "success": true
}
```

**Error Response (500):**

```json
{
  "error": "Error interno del servidor"
}
```

**Notes:**
- Clears the `auth-token` cookie by setting maxAge to 0

---

### GET /api/auth/me

Retrieves the current authenticated user.

**Endpoint URL:** `/api/auth/me`

**HTTP Method:** GET

**Description:** Validates the session token and returns the current user's information.

**Used By:**
- [`contexts/auth-context.tsx`](contexts/auth-context.tsx:34) - AuthContext initialization

**Authentication Required:** Yes (session cookie)

**Request Parameters:** None

**Success Response (200):**

```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "admin" | "customer"
  }
}
```

**Error Response (401):**

```json
{
  "error": "No token provided"
}
```

or

```json
{
  "error": "Invalid session"
}
```

or

```json
{
  "error": "User not found"
}
```

**Error Response (500):**

```json
{
  "error": "Internal server error"
}
```

---

### POST /api/auth/register

Registers a new user account.

**Endpoint URL:** `/api/auth/register`

**HTTP Method:** POST

**Description:** Creates a new customer account with the provided information.

**Used By:**
- [`app/auth/register/page.tsx`](app/auth/register/page.tsx:45) - Registration page

**Authentication Required:** No

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Usuario creado exitosamente"
}
```

**Error Response (400):**

```json
{
  "error": "El usuario ya existe"
}
```

**Error Response (500):**

```json
{
  "error": "Error interno del servidor"
}
```

**Notes:**
- New users are assigned the `customer` role by default
- Does not automatically log the user in after registration

---

## Admin APIs

### Category Showcase

#### GET /api/admin/category-showcase

Retrieves all active category showcase items.

**Endpoint URL:** `/api/admin/category-showcase`

**HTTP Method:** GET

**Description:** Returns all active category showcase items sorted by order.

**Used By:**
- [`app/admin/category-showcase/page.tsx`](app/admin/category-showcase/page.tsx:18) - Category showcase admin list
- [`app/admin/page.tsx`](app/admin/page.tsx:28) - Admin dashboard
- [`components/category-showcase.tsx`](components/category-showcase.tsx:19) - Category showcase component

**Authentication Required:** No (based on code analysis)

**Request Parameters:** None

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "productCount": "string",
      "image": "string",
      "href": "string",
      "order": "number",
      "isActive": "boolean",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to fetch category showcase"
}
```

---

#### POST /api/admin/category-showcase

Creates a new category showcase item.

**Endpoint URL:** `/api/admin/category-showcase`

**HTTP Method:** POST

**Description:** Creates a new category showcase item with the provided data.

**Used By:**
- [`app/admin/category-showcase/new/page.tsx`](app/admin/category-showcase/new/page.tsx:28) - New category showcase form

**Authentication Required:** No (based on code analysis)

**Request Body:**

```json
{
  "name": "string",
  "description": "string",
  "productCount": "string",
  "image": "string",
  "href": "string",
  "order": "number (optional, defaults to list length + 1)",
  "isActive": "boolean (optional, defaults to true)"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "productCount": "string",
    "image": "string",
    "href": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  },
  "message": "Category showcase created successfully"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to create category showcase"
}
```

---

#### GET /api/admin/category-showcase/[id]

Retrieves a single category showcase item.

**Endpoint URL:** `/api/admin/category-showcase/{id}`

**HTTP Method:** GET

**Description:** Returns a specific category showcase item by ID.

**Used By:**
- [`app/admin/category-showcase/[id]/edit/page.tsx`](app/admin/category-showcase/[id]/edit/page.tsx:30) - Edit category showcase form

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the category showcase item |

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "productCount": "string",
    "image": "string",
    "href": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Category showcase not found"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to fetch category showcase"
}
```

---

#### PUT /api/admin/category-showcase/[id]

Updates a category showcase item.

**Endpoint URL:** `/api/admin/category-showcase/{id}`

**HTTP Method:** PUT

**Description:** Updates an existing category showcase item with the provided data.

**Used By:**
- [`app/admin/category-showcase/[id]/edit/page.tsx`](app/admin/category-showcase/[id]/edit/page.tsx:56) - Edit category showcase form
- [`app/admin/category-showcase/page.tsx`](app/admin/category-showcase/page.tsx:32) - Toggle active status

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the category showcase item |

**Request Body:**

```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "productCount": "string (optional)",
  "image": "string (optional)",
  "href": "string (optional)",
  "order": "number (optional)",
  "isActive": "boolean (optional)"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "productCount": "string",
    "image": "string",
    "href": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  },
  "message": "Category showcase updated successfully"
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Category showcase not found"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to update category showcase"
}
```

---

#### DELETE /api/admin/category-showcase/[id]

Deletes a category showcase item.

**Endpoint URL:** `/api/admin/category-showcase/{id}`

**HTTP Method:** DELETE

**Description:** Removes a category showcase item from the system.

**Used By:**
- [`app/admin/category-showcase/page.tsx`](app/admin/category-showcase/page.tsx:50) - Delete category showcase

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the category showcase item |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Category showcase deleted successfully"
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Category showcase not found"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to delete category showcase"
}
```

---

### Departments

#### GET /api/admin/departments

Retrieves all active departments.

**Endpoint URL:** `/api/admin/departments`

**HTTP Method:** GET

**Description:** Returns all active departments sorted by order.

**Used By:**
- [`app/admin/departments/page.tsx`](app/admin/departments/page.tsx:27) - Departments admin list
- [`app/admin/page.tsx`](app/admin/page.tsx:26) - Admin dashboard
- [`components/departments-section.tsx`](components/departments-section.tsx:28) - Departments section component

**Authentication Required:** No (based on code analysis)

**Request Parameters:** None

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "icon": "string",
      "color": "string",
      "href": "string",
      "order": "number",
      "isActive": "boolean",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to fetch departments"
}
```

---

#### POST /api/admin/departments

Creates a new department.

**Endpoint URL:** `/api/admin/departments`

**HTTP Method:** POST

**Description:** Creates a new department with the provided data.

**Used By:**
- [`app/admin/departments/new/page.tsx`](app/admin/departments/new/page.tsx:45) - New department form

**Authentication Required:** No (based on code analysis)

**Request Body:**

```json
{
  "name": "string",
  "icon": "string",
  "color": "string",
  "href": "string",
  "order": "number (optional, defaults to list length + 1)",
  "isActive": "boolean (optional, defaults to true)"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "icon": "string",
    "color": "string",
    "href": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  },
  "message": "Department created successfully"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to create department"
}
```

---

#### GET /api/admin/departments/[id]

Retrieves a single department.

**Endpoint URL:** `/api/admin/departments/{id}`

**HTTP Method:** GET

**Description:** Returns a specific department by ID.

**Used By:**
- [`app/admin/departments/[id]/edit/page.tsx`](app/admin/departments/[id]/edit/page.tsx:47) - Edit department form

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the department |

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "icon": "string",
    "color": "string",
    "href": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Department not found"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to fetch department"
}
```

---

#### PUT /api/admin/departments/[id]

Updates a department.

**Endpoint URL:** `/api/admin/departments/{id}`

**HTTP Method:** PUT

**Description:** Updates an existing department with the provided data.

**Used By:**
- [`app/admin/departments/[id]/edit/page.tsx`](app/admin/departments/[id]/edit/page.tsx:72) - Edit department form
- [`app/admin/departments/page.tsx`](app/admin/departments/page.tsx:41) - Toggle active status

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the department |

**Request Body:**

```json
{
  "name": "string (optional)",
  "icon": "string (optional)",
  "color": "string (optional)",
  "href": "string (optional)",
  "order": "number (optional)",
  "isActive": "boolean (optional)"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "icon": "string",
    "color": "string",
    "href": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  },
  "message": "Department updated successfully"
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Department not found"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to update department"
}
```

---

#### DELETE /api/admin/departments/[id]

Deletes a department.

**Endpoint URL:** `/api/admin/departments/{id}`

**HTTP Method:** DELETE

**Description:** Removes a department from the system.

**Used By:**
- [`app/admin/departments/page.tsx`](app/admin/departments/page.tsx:59) - Delete department

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the department |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Department deleted successfully"
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Department not found"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to delete department"
}
```

---

### Featured Products

#### GET /api/admin/featured-products

Retrieves all active featured products.

**Endpoint URL:** `/api/admin/featured-products`

**HTTP Method:** GET

**Description:** Returns all active featured products sorted by order.

**Used By:**
- [`app/admin/featured-products/page.tsx`](app/admin/featured-products/page.tsx:18) - Featured products admin list
- [`app/admin/page.tsx`](app/admin/page.tsx:27) - Admin dashboard
- [`components/products-showcase.tsx`](components/products-showcase.tsx:22) - Products showcase component

**Authentication Required:** No (based on code analysis)

**Request Parameters:** None

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "price": "number",
      "originalPrice": "number (optional)",
      "image": "string",
      "href": "string",
      "order": "number",
      "isActive": "boolean",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to fetch featured products"
}
```

---

#### POST /api/admin/featured-products

Creates a new featured product.

**Endpoint URL:** `/api/admin/featured-products`

**HTTP Method:** POST

**Description:** Creates a new featured product with the provided data.

**Used By:**
- [`app/admin/featured-products/new/page.tsx`](app/admin/featured-products/new/page.tsx:38) - New featured product form

**Authentication Required:** No (based on code analysis)

**Request Body:**

```json
{
  "name": "string",
  "category": "string",
  "price": "string | number",
  "originalPrice": "string | number (optional)",
  "image": "string",
  "href": "string",
  "order": "number (optional, defaults to list length + 1)",
  "isActive": "boolean (optional, defaults to true)"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "category": "string",
    "price": "number",
    "originalPrice": "number (optional)",
    "image": "string",
    "href": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  },
  "message": "Featured product created successfully"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to create featured product"
}
```

---

#### GET /api/admin/featured-products/[id]

Retrieves a single featured product.

**Endpoint URL:** `/api/admin/featured-products/{id}`

**HTTP Method:** GET

**Description:** Returns a specific featured product by ID.

**Used By:**
- [`app/admin/featured-products/[id]/edit/page.tsx`](app/admin/featured-products/[id]/edit/page.tsx:40) - Edit featured product form

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the featured product |

**Success Response (200):**

```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "price": "number",
  "originalPrice": "number (optional)",
  "image": "string",
  "href": "string",
  "order": "number",
  "isActive": "boolean",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

**Error Response (404):**

```json
{
  "error": "Product not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch product"
}
```

**Notes:**
- Response format differs from other endpoints (no `success` wrapper)

---

#### PUT /api/admin/featured-products/[id]

Updates a featured product.

**Endpoint URL:** `/api/admin/featured-products/{id}`

**HTTP Method:** PUT

**Description:** Updates an existing featured product with the provided data.

**Used By:**
- [`app/admin/featured-products/[id]/edit/page.tsx`](app/admin/featured-products/[id]/edit/page.tsx:67) - Edit featured product form
- [`app/admin/featured-products/page.tsx`](app/admin/featured-products/page.tsx:32) - Toggle active status

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the featured product |

**Request Body:**

```json
{
  "name": "string (optional)",
  "category": "string (optional)",
  "price": "string | number (optional)",
  "originalPrice": "string | number (optional)",
  "image": "string (optional)",
  "href": "string (optional)",
  "order": "number (optional)",
  "isActive": "boolean (optional)"
}
```

**Success Response (200):**

```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "price": "number",
  "originalPrice": "number (optional)",
  "image": "string",
  "href": "string",
  "order": "number",
  "isActive": "boolean",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

**Error Response (404):**

```json
{
  "error": "Product not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to update product"
}
```

**Notes:**
- Response format differs from other endpoints (no `success` wrapper)

---

#### DELETE /api/admin/featured-products/[id]

Deletes a featured product.

**Endpoint URL:** `/api/admin/featured-products/{id}`

**HTTP Method:** DELETE

**Description:** Removes a featured product from the system.

**Used By:**
- [`app/admin/featured-products/page.tsx`](app/admin/featured-products/page.tsx:50) - Delete featured product

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the featured product |

**Success Response (200):**

```json
{
  "message": "Product deleted successfully"
}
```

**Error Response (404):**

```json
{
  "error": "Product not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to delete product"
}
```

---

### Hero Slides

#### GET /api/admin/hero-slides

Retrieves all active hero slides.

**Endpoint URL:** `/api/admin/hero-slides`

**HTTP Method:** GET

**Description:** Returns all active hero slides sorted by order.

**Used By:**
- [`app/admin/hero-slides/page.tsx`](app/admin/hero-slides/page.tsx:18) - Hero slides admin list
- [`app/admin/page.tsx`](app/admin/page.tsx:25) - Admin dashboard
- [`components/hero-carousel.tsx`](components/hero-carousel.tsx:36) - Hero carousel component

**Authentication Required:** No (based on code analysis)

**Request Parameters:** None

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "subtitle": "string",
      "cta": "string",
      "image": "string",
      "background": "string",
      "order": "number",
      "isActive": "boolean",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to fetch hero slides"
}
```

---

#### POST /api/admin/hero-slides

Creates a new hero slide.

**Endpoint URL:** `/api/admin/hero-slides`

**HTTP Method:** POST

**Description:** Creates a new hero slide with the provided data.

**Used By:**
- [`app/admin/hero-slides/new/page.tsx`](app/admin/hero-slides/new/page.tsx:36) - New hero slide form

**Authentication Required:** No (based on code analysis)

**Request Body:**

```json
{
  "title": "string",
  "subtitle": "string",
  "cta": "string",
  "image": "string",
  "background": "string",
  "order": "number (optional, defaults to list length + 1)",
  "isActive": "boolean (optional, defaults to true)"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "subtitle": "string",
    "cta": "string",
    "image": "string",
    "background": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  },
  "message": "Hero slide created successfully"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to create hero slide"
}
```

---

#### GET /api/admin/hero-slides/[id]

Retrieves a single hero slide.

**Endpoint URL:** `/api/admin/hero-slides/{id}`

**HTTP Method:** GET

**Description:** Returns a specific hero slide by ID.

**Used By:** Not found in current codebase

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the hero slide |

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "subtitle": "string",
    "cta": "string",
    "image": "string",
    "background": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Hero slide not found"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to fetch hero slide"
}
```

---

#### PUT /api/admin/hero-slides/[id]

Updates a hero slide.

**Endpoint URL:** `/api/admin/hero-slides/{id}`

**HTTP Method:** PUT

**Description:** Updates an existing hero slide with the provided data.

**Used By:**
- [`app/admin/hero-slides/page.tsx`](app/admin/hero-slides/page.tsx:32) - Toggle active status

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the hero slide |

**Request Body:**

```json
{
  "title": "string (optional)",
  "subtitle": "string (optional)",
  "cta": "string (optional)",
  "image": "string (optional)",
  "background": "string (optional)",
  "order": "number (optional)",
  "isActive": "boolean (optional)"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "subtitle": "string",
    "cta": "string",
    "image": "string",
    "background": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  },
  "message": "Hero slide updated successfully"
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Hero slide not found"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to update hero slide"
}
```

---

#### DELETE /api/admin/hero-slides/[id]

Deletes a hero slide.

**Endpoint URL:** `/api/admin/hero-slides/{id}`

**HTTP Method:** DELETE

**Description:** Removes a hero slide from the system.

**Used By:**
- [`app/admin/hero-slides/page.tsx`](app/admin/hero-slides/page.tsx:50) - Delete hero slide

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the hero slide |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Hero slide deleted successfully"
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Hero slide not found"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "Failed to delete hero slide"
}
```

---

### Users

#### GET /api/admin/users

Retrieves all users.

**Endpoint URL:** `/api/admin/users`

**HTTP Method:** GET

**Description:** Returns all users in the system.

**Used By:**
- [`app/admin/users/page.tsx`](app/admin/users/page.tsx:25) - Users admin list

**Authentication Required:** No (based on code analysis)

**Request Parameters:** None

**Success Response (200):**

```json
[
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "admin" | "editor" | "customer",
    "status": "active" | "inactive",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
]
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch users"
}
```

**Notes:**
- Response format differs from other endpoints (returns array directly, no `success` wrapper)

---

#### POST /api/admin/users

Creates a new admin user.

**Endpoint URL:** `/api/admin/users`

**HTTP Method:** POST

**Description:** Creates a new admin user with the provided data.

**Used By:**
- [`app/admin/users/page.tsx`](app/admin/users/page.tsx:80) - Create admin user form

**Authentication Required:** No (based on code analysis)

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "role": "admin" | "editor"
}
```

**Success Response (200):**

```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "admin" | "editor",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to create admin user"
}
```

---

#### GET /api/admin/users/[id]

Retrieves a single user.

**Endpoint URL:** `/api/admin/users/{id}`

**HTTP Method:** GET

**Description:** Returns a specific user by ID.

**Used By:** Not found in current codebase

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the user |

**Notes:**
- This endpoint is defined in the route file but no GET handler was found in the code

---

#### PUT /api/admin/users/[id]

Updates a user.

**Endpoint URL:** `/api/admin/users/{id}`

**HTTP Method:** PUT

**Description:** Updates an existing user with the provided data.

**Used By:**
- [`app/admin/users/page.tsx`](app/admin/users/page.tsx:46) - Toggle user status

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the user |

**Request Body:**

```json
{
  "name": "string (optional)",
  "email": "string (optional)",
  "role": "admin" | "editor" | "customer (optional)",
  "status": "active" | "inactive (optional)"
}
```

**Success Response (200):**

```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "admin" | "editor" | "customer",
  "status": "active" | "inactive",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

**Error Response (404):**

```json
{
  "error": "User not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to update user"
}
```

---

#### DELETE /api/admin/users/[id]

Deletes a user.

**Endpoint URL:** `/api/admin/users/{id}`

**HTTP Method:** DELETE

**Description:** Removes a user from the system.

**Used By:**
- [`app/admin/users/page.tsx`](app/admin/users/page.tsx:64) - Delete user

**Authentication Required:** No (based on code analysis)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The unique identifier of the user |

**Success Response (200):**

```json
{
  "message": "User deleted successfully"
}
```

**Error Response (404):**

```json
{
  "error": "User not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to delete user"
}
```

---

## Settings APIs

### Shopping Settings

#### GET /api/settings/shopping

Retrieves shopping-related feature settings.

**Endpoint URL:** `/api/settings/shopping`

**HTTP Method:** GET

**Description:** Returns shopping feature settings from the database, with fallback defaults if database fails.

**Used By:**
- [`app/admin/shopping-settings/page.tsx`](app/admin/shopping-settings/page.tsx:38) - Shopping settings admin page
- [`app/admin/subscription-management/page.tsx`](app/admin/subscription-management/page.tsx:71) - Subscription management page
- [`contexts/shopping-context.tsx`](contexts/shopping-context.tsx:35) - Shopping context

**Authentication Required:** No (based on code analysis)

**Request Parameters:** None

**Success Response (200):**

```json
{
  "enable_shopping": "true" | "false",
  "enable_pricing": "true" | "false",
  "enable_add_to_cart": "true" | "false",
  "enable_checkout": "true" | "false",
  "shopping_mode": "full" | "catalog" | "inquiry"
}
```

**Error Response (with fallback):**

On database error, returns fallback defaults:

```json
{
  "enable_shopping": "true",
  "enable_pricing": "true",
  "enable_add_to_cart": "true",
  "enable_checkout": "true",
  "shopping_mode": "full"
}
```

**Notes:**
- Settings are stored as strings in the database
- Connects directly to PostgreSQL database

---

#### PUT /api/settings/shopping

Updates shopping settings.

**Endpoint URL:** `/api/settings/shopping`

**HTTP Method:** PUT

**Description:** Updates shopping feature settings in the database.

**Used By:**
- [`app/admin/shopping-settings/page.tsx`](app/admin/shopping-settings/page.tsx:59) - Shopping settings admin page
- [`app/admin/subscription-management/page.tsx`](app/admin/subscription-management/page.tsx:100) - Subscription management page

**Authentication Required:** No (based on code analysis)

**Request Body:**

```json
{
  "enable_shopping": "boolean (optional)",
  "enable_pricing": "boolean (optional)",
  "enable_add_to_cart": "boolean (optional)",
  "enable_checkout": "boolean (optional)",
  "shopping_mode": "string (optional)"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Shopping settings updated successfully"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to update shopping settings"
}
```

**Notes:**
- Only updates settings that are provided in the request body
- Boolean values are converted to strings when stored

---

## Features APIs

### Features

#### GET /api/features

Retrieves feature access settings.

**Endpoint URL:** `/api/features`

**HTTP Method:** GET

**Description:** Returns all feature access settings for the client using the FeatureManager.

**Used By:** Not found in current codebase

**Authentication Required:** No (based on code analysis)

**Request Parameters:** None

**Success Response (200):**

```json
{
  "success": true,
  "features": {
    "featureKey": {
      "enabled": "boolean",
      "limit": "number (optional)"
    }
  }
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch feature access"
}
```

---

#### PUT /api/features

Updates feature access settings.

**Endpoint URL:** `/api/features`

**HTTP Method:** PUT

**Description:** Updates a specific feature's access settings.

**Used By:** Not found in current codebase

**Authentication Required:** No (based on code analysis, but comment indicates "admin only")

**Request Body:**

```json
{
  "featureKey": "string",
  "enabled": "boolean",
  "limit": "number (optional)"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Feature access updated successfully"
}
```

**Error Response (400):**

```json
{
  "error": "Invalid request data"
}
```

**Error Response (404):**

```json
{
  "error": "Feature not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to update feature access"
}
```

---

## Data Types

### HeroSlide

```typescript
interface HeroSlide {
  id: string
  title: string
  subtitle: string
  cta: string
  image: string
  background: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### Department

```typescript
interface Department {
  id: string
  name: string
  icon: string
  color: string
  href: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### FeaturedProduct

```typescript
interface FeaturedProduct {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  href: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### CategoryShowcase

```typescript
interface CategoryShowcase {
  id: string
  name: string
  description: string
  productCount: string
  image: string
  href: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### AdminUser

```typescript
interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "editor"
  createdAt: string
  updatedAt: string
}
```

### ApiResponse

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
```

---

## Notes

### Response Format Consistency

The API endpoints have inconsistent response formats:

1. **Standard format** (most endpoints):
   ```json
   {
     "success": true,
     "data": {...},
     "message": "..."
   }
   ```

2. **Direct data format** (featured-products/[id], users):
   ```json
   {...}
   ```

3. **Array format** (users list):
   ```json
   [{...}, {...}]
   ```

### Authentication

- Auth APIs use HTTP-only cookies for session management
- The `auth-token` cookie has a 7-day expiration
- Most admin APIs do not have explicit authentication checks in the route handlers
- Admin page access is protected at the layout level using the AuthContext

### Database Connections

- Shopping settings API connects directly to PostgreSQL
- Other admin APIs use in-memory data stores from `@/lib/admin-data`

---

*Documentation generated from code analysis on 2026-02-22*
