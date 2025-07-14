import type { User, Session } from "@/types/auth"

// Mock users data
export const users: User[] = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@oasa.com",
    role: "admin",
    status: "active",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Usuario Demo",
    email: "user@example.com",
    role: "customer",
    status: "active",
    createdAt: new Date("2024-01-02"),
  },
]

// Mock sessions storage - using global variable for persistence in dev
declare global {
  var __sessions: Session[] | undefined
}

const sessions: Session[] = globalThis.__sessions ?? []
if (!globalThis.__sessions) {
  globalThis.__sessions = sessions
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email && user.status === "active")
}

export function findUserById(id: string): User | undefined {
  return users.find((user) => user.id === id && user.status === "active")
}

export function createSession(user: User): Session {
  const token = generateToken()

  // Remove any existing sessions for this user
  const existingIndex = sessions.findIndex((s) => s.userId === user.id)
  if (existingIndex !== -1) {
    sessions.splice(existingIndex, 1)
  }

  const session: Session = {
    token,
    userId: user.id,
    role: user.role,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  }

  sessions.push(session)
  console.log("Session created:", { token, userId: user.id, role: user.role })
  return session
}

export function getSessionByToken(token: string): Session | null {
  const session = sessions.find((s) => s.token === token && s.expiresAt > new Date())
  console.log("Session lookup:", { token: token?.substring(0, 8) + "...", found: !!session })
  return session || null
}

export function deleteSession(token: string): void {
  const index = sessions.findIndex((s) => s.token === token)
  if (index !== -1) {
    sessions.splice(index, 1)
    console.log("Session deleted:", token?.substring(0, 8) + "...")
  }
}

export function createUser(userData: Omit<User, "id" | "createdAt">): User {
  const newUser: User = {
    ...userData,
    id: (users.length + 1).toString(),
    createdAt: new Date(),
  }
  users.push(newUser)
  return newUser
}

export function getAllUsers(): User[] {
  return users.filter(user => user.status === "active")
}

export function createAdminUser(userData: { name: string; email: string; password: string }): User {
  const newUser: User = {
    id: (users.length + 1).toString(),
    name: userData.name,
    email: userData.email,
    role: "admin",
    status: "active",
    createdAt: new Date(),
  }
  users.push(newUser)
  return newUser
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const userIndex = users.findIndex(user => user.id === id)
  if (userIndex === -1) {
    return null
  }
  
  users[userIndex] = { ...users[userIndex], ...updates }
  return users[userIndex]
}

export function deleteUser(id: string): boolean {
  const userIndex = users.findIndex(user => user.id === id)
  if (userIndex === -1) {
    return false
  }
  
  users.splice(userIndex, 1)
  return true
}

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
