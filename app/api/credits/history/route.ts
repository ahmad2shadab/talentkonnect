import { NextResponse } from 'next/server';

// Mock data for demonstration - no authentication required
const mockHistory: { [key: string]: any[] } = {
  'user-123': [
    {
      id: 'credit-1',
      userId: 'user-123',
      source: 'Welcome Bonus',
      amount: 1,
      date: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: 'credit-2',
      userId: 'user-123',
      source: 'Tip Shared',
      amount: 2,
      date: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 'credit-3',
      userId: 'user-123',
      source: 'Community Post',
      amount: 1,
      date: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
    {
      id: 'credit-4',
      userId: 'user-123',
      source: 'Tip Shared',
      amount: 1,
      date: new Date().toISOString(),
    },
  ],
  default: [
    {
      id: 'credit-default-1',
      userId: 'default',
      source: 'Welcome Bonus',
      amount: 1,
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'credit-default-2',
      userId: 'default',
      source: 'Tip Shared',
      amount: 2,
      date: new Date().toISOString(),
    },
  ],
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default';
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '5');

    // Get mock history - no authentication required
    const userCredits = mockHistory[userId] || mockHistory['default'];

    // Sort by date (newest first)
    const sortedCredits = [...userCredits].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Paginate results
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedCredits = sortedCredits.slice(startIndex, endIndex);

    return NextResponse.json({
      entries: paginatedCredits,
      hasMore: endIndex < sortedCredits.length,
      total: sortedCredits.length,
    });
  } catch (error) {
    console.error('Error fetching credit history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
