import { NextResponse } from 'next/server';
import sql from '@/app/api/utils/sql';

export async function GET() {
  try {
    const users = await sql`
      SELECT id, username, email, is_active, created_at, updated_at 
      FROM admin_users 
      ORDER BY created_at DESC
    `;

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO admin_users (username, password_hash, email, is_active, created_at, updated_at)
      VALUES (${username}, ${password}, ${email}, true, NOW(), NOW())
      RETURNING id, username, email, is_active, created_at, updated_at
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
