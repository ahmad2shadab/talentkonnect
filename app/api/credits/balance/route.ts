import { NextResponse } from 'next/server';

// Mock data for demonstration - no authentication required
const mockBalances: { [key: string]: number } = {
  'user-123': 5,
  default: 3,
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default';

    // Return mock balance - no authentication required
    const balance = mockBalances[userId] || 1;

    return NextResponse.json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
