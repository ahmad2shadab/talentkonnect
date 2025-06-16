import { NextResponse } from "next/server"

// In a real app, this would connect to a database
const users: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, phone, category, tip } = body

    if (!name || !phone || !category || !tip) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      phone,
      category,
      tip,
      createdAt: new Date().toISOString(),
    }

    // In a real app, save to database
    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
