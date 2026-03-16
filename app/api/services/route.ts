import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const admin = url.searchParams.get('admin');

    // If admin=true, return all services (including unpublished)
    if (admin === 'true') {
      const services = await sql`
        SELECT * FROM services 
        ORDER BY sort_order ASC
      `;
      return NextResponse.json(services);
    }

    // Otherwise, return only published services
    const services = await sql`
      SELECT * FROM services 
      WHERE is_published = true 
      ORDER BY sort_order ASC
    `;
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, is_published, featured } = await request.json();

    if (is_published !== undefined) {
      await sql`UPDATE services SET is_published = ${is_published}, updated_at = NOW() WHERE id = ${id}`;
    }
    if (featured !== undefined) {
      await sql`UPDATE services SET featured = ${featured}, updated_at = NOW() WHERE id = ${id}`;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
