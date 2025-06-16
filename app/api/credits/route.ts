import { NextResponse } from "next/server"

// In a real app, this would connect to a database
const credits: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { userId, source, amount } = body

    if (!userId || !source || amount === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new credit entry
    const newCredit = {
      id: `credit-${Date.now()}`,
      userId,
      source,
      amount,
      date: new Date().toISOString(),
    }

    // In a real app, save to database
    credits.push(newCredit)

    return NextResponse.json(newCredit, { status: 201 })
  } catch (error) {
    console.error("Error creating credit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
