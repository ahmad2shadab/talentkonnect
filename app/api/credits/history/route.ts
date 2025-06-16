import { NextResponse } from "next/server"

// In a real app, this would connect to a database
// Using the credits array from the parent route
let credits: any[] = []

// Sample data for demonstration
const sampleCredits = [
  {
    id: "credit-1",
    userId: "user-123",
    source: "Tip",
    amount: 1,
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
  {
    id: "credit-2",
    userId: "user-123",
    source: "Referral",
    amount: 2,
    date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
  },
  {
    id: "credit-3",
    userId: "user-123",
    source: "Post",
    amount: 1,
    date: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
  },
  {
    id: "credit-4",
    userId: "user-123",
    source: "Redemption",
    amount: -2,
    date: new Date().toISOString(), // Today
  },
  {
    id: "credit-5",
    userId: "user-123",
    source: "Tip",
    amount: 1,
    date: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
  },
  {
    id: "credit-6",
    userId: "user-123",
    source: "Post",
    amount: 1,
    date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
  },
]

// Add sample data to credits array if it's empty
if (credits.length === 0) {
  credits = [...sampleCredits]
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "5")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Filter credits by user ID
    const userCredits = credits.filter((credit) => credit.userId === userId)

    // Sort by date (newest first)
    userCredits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Paginate results
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedCredits = userCredits.slice(startIndex, endIndex)

    return NextResponse.json({
      entries: paginatedCredits,
      hasMore: endIndex < userCredits.length,
      total: userCredits.length,
    })
  } catch (error) {
    console.error("Error fetching credit history:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
