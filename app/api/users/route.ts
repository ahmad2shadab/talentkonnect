import { NextResponse } from 'next/server';

// Simple in-memory storage for demo - no authentication required
const users: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, phone, category, tip } = body;

    if (!name || !phone || !category || !tip) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a new user - no authentication required
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      phone,
      category,
      tip,
      createdAt: new Date().toISOString(),
    };

    // Store user (in real app, this would be a database)
    users.push(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
