import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const admin = url.searchParams.get('admin');
    const services = admin === 'true' 
      ? await sql`SELECT * FROM services ORDER BY sort_order ASC`
      : await sql`SELECT * FROM services WHERE is_published = true ORDER BY sort_order ASC`;
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await sql`
      INSERT INTO services (slug, title_en, title_vi, title_zh_cn, title_zh_tw, is_published, featured)
      VALUES (${body.slug}, ${body.title_en}, ${body.title_vi}, ${body.title_zh_cn}, ${body.title_zh_tw}, true, false)
      RETURNING *
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, is_published, featured, title_en } = await request.json();

   
      // 在 PUT 方法中
    if (is_published !== undefined) {
  await sql`UPDATE services SET is_published = ${is_published}, updated_at = NOW() WHERE id = ${id}`;
    } else if (featured !== undefined) {
      await sql`UPDATE services SET featured = ${featured}, updated_at = NOW() WHERE id = ${id}`;
    } else if (title_en !== undefined) {
      // 用于编辑保存
      await sql`UPDATE services SET title_en = ${title_en}, updated_at = NOW() WHERE id = ${id}`;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await sql`DELETE FROM services WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}