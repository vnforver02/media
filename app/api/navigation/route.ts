import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const admin = url.searchParams.get('admin');
    const id = url.searchParams.get('id');

    // If id is provided, return single navigation item
    if (id) {
      const item = await sql`
        SELECT * FROM navigation WHERE id = ${parseInt(id)}
      `;
      return NextResponse.json(item[0] || null);
    }

    // If admin=true, return all navigation items (including hidden)
    if (admin === 'true') {
      const navigation = await sql`
        SELECT * FROM navigation 
        ORDER BY sort_order ASC
      `;
      return NextResponse.json(navigation);
    }

    // Otherwise, return only visible navigation
    const navigation = await sql`
      SELECT * FROM navigation 
      WHERE is_visible = true 
      ORDER BY sort_order ASC
    `;
    return NextResponse.json(navigation);
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      label_en,
      label_vi,
      label_zh_cn,
      label_zh_tw,
      path,
      sort_order = 0,
      is_visible = true,
    } = body;

    const result = await sql`
      INSERT INTO navigation (
        label_en, label_vi, label_zh_cn, label_zh_tw, path, sort_order, is_visible, created_at, updated_at
      )
      VALUES (
        ${label_en}, ${label_vi}, ${label_zh_cn}, ${label_zh_tw}, ${path}, ${sort_order}, ${is_visible}, NOW(), NOW()
      )
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating navigation item:', error);
    return NextResponse.json({ error: 'Failed to create navigation item' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const result = await sql`
      UPDATE navigation 
      SET 
        label_en = COALESCE(${updates.label_en}, label_en),
        label_vi = COALESCE(${updates.label_vi}, label_vi),
        label_zh_cn = COALESCE(${updates.label_zh_cn}, label_zh_cn),
        label_zh_tw = COALESCE(${updates.label_zh_tw}, label_zh_tw),
        path = COALESCE(${updates.path}, path),
        sort_order = COALESCE(${updates.sort_order}, sort_order),
        is_visible = COALESCE(${updates.is_visible}, is_visible),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0] || { success: true });
  } catch (error) {
    console.error('Error updating navigation item:', error);
    return NextResponse.json({ error: 'Failed to update navigation item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await sql`DELETE FROM navigation WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting navigation item:', error);
    return NextResponse.json({ error: 'Failed to delete navigation item' }, { status: 500 });
  }
}
