import { NextResponse } from 'next/server';

// Simple in-memory storage for demo - no authentication required
const users: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received user creation request:', body);

    // Validate required fields
    const { name, phone, category, tip } = body;

    if (!name || !phone || !category || !tip) {
      console.error('Missing required fields:', {
        name: !!name,
        phone: !!phone,
        category: !!category,
        tip: !!tip,
      });
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.toString().trim(),
      phone: phone.toString().trim(),
      category: category.toString().trim(),
      tip: tip.toString().trim(),
      createdAt: new Date().toISOString(),
    };

    console.log('Creating new user:', newUser);

    // Store user (in real app, this would be a database)
    users.push(newUser);

    console.log('User created successfully:', newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Add GET method to retrieve all users (for debugging)
export async function GET() {
  try {
    return NextResponse.json({ users, total: users.length });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
