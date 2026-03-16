import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const admin = url.searchParams.get('admin');

    // If admin=true, return all jobs (including unpublished)
    if (admin === 'true') {
      const jobs = await sql`
        SELECT * FROM jobs 
        ORDER BY sort_order ASC
      `;
      return NextResponse.json(jobs);
    }

    // Otherwise, return only published jobs
    const jobs = await sql`
      SELECT * FROM jobs 
      WHERE is_published = true 
      ORDER BY sort_order ASC
    `;
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, is_published, featured } = await request.json();

    if (is_published !== undefined) {
      await sql`UPDATE jobs SET is_published = ${is_published}, updated_at = NOW() WHERE id = ${id}`;
    }
    if (featured !== undefined) {
      await sql`UPDATE jobs SET featured = ${featured}, updated_at = NOW() WHERE id = ${id}`;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}
