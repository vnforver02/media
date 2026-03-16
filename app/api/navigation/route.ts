import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const navigation = await sql`SELECT * FROM navigation ORDER BY sort_order ASC`;
    return NextResponse.json(navigation);
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
  }
}