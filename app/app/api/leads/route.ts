import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const leads = await sql`SELECT * FROM contact_leads ORDER BY created_at DESC`;
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}