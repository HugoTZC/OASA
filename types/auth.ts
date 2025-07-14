export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "customer"
  status: "active" | "inactive"
  createdAt: Date
}

export interface Session {
  token: string
  userId: string
  role: "admin" | "customer"
  expiresAt: Date
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}
