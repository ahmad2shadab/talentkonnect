import { NextResponse } from 'next/server';

// Simple in-memory storage for demo - no authentication required
const credits: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received credit request:', body);

    // Validate required fields
    const { userId, source, amount } = body;

    if (!userId) {
      console.error('Missing userId');
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!source) {
      console.error('Missing source');
      return NextResponse.json(
        { error: 'Source is required' },
        { status: 400 }
      );
    }

    if (amount === undefined || amount === null) {
      console.error('Missing amount');
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      );
    }

    // Create a new credit entry
    const newCredit = {
      id: `credit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: userId.toString(),
      source: source.toString(),
      amount: Number(amount),
      date: new Date().toISOString(),
    };

    console.log('Creating new credit:', newCredit);

    // Store credit (in real app, this would be a database)
    credits.push(newCredit);

    console.log('Credit created successfully:', newCredit);
    return NextResponse.json(newCredit, { status: 201 });
  } catch (error) {
    console.error('Error creating credit:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Add GET method to retrieve all credits (for debugging)
export async function GET() {
  try {
    return NextResponse.json({ credits, total: credits.length });
  } catch (error) {
    console.error('Error fetching credits:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
