import { NextResponse } from "next/server"

// In a real app, this would connect to a database
// Using the credits array from the parent route
const credits: any[] = []

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Calculate balance from credit history
    // In a real app, this would be a database query
    const userCredits = credits.filter((credit) => credit.userId === userId)
    const balance = userCredits.reduce((total, credit) => total + credit.amount, 0)

    // For demo purposes, return a default balance if no credits found
    return NextResponse.json({ balance: userCredits.length ? balance : 1 })
  } catch (error) {
    console.error("Error fetching balance:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
