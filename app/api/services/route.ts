import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const admin = url.searchParams.get('admin');
    const id = url.searchParams.get('id');

    // If id is provided, return single service
    if (id) {
      const service = await sql`
        SELECT * FROM services WHERE id = ${parseInt(id)}
      `;
      const response = NextResponse.json(service[0] || null);
      response.headers.set('Cache-Control', 'no-store, must-revalidate, max-age=0');
      return response;
    }

    // If admin=true, return all services (including unpublished)
    if (admin === 'true') {
      const services = await sql`
        SELECT * FROM services 
        ORDER BY sort_order ASC
      `;
      const response = NextResponse.json(services);
      response.headers.set('Cache-Control', 'no-store, must-revalidate, max-age=0');
      return response;
    }

    // Otherwise, return only published services
    const services = await sql`
      SELECT * FROM services 
      WHERE is_published = true 
      ORDER BY sort_order ASC
    `;
    const response = NextResponse.json(services);
    response.headers.set('Cache-Control', 'no-store, must-revalidate, max-age=0');
    return response;
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      slug,
      icon,
      title_en,
      title_vi,
      title_zh_cn,
      title_zh_tw,
      description_en,
      description_vi,
      description_zh_cn,
      description_zh_tw,
      full_description_en,
      full_description_vi,
      full_description_zh_cn,
      full_description_zh_tw,
      ideal_for_en,
      ideal_for_vi,
      ideal_for_zh_cn,
      ideal_for_zh_tw,
      what_we_deliver_en,
      what_we_deliver_vi,
      what_we_deliver_zh_cn,
      what_we_deliver_zh_tw,
      sort_order = 0,
      is_published = false,
      featured = false,
    } = body;

    const result = await sql`
      INSERT INTO services (
        slug, icon, title_en, title_vi, title_zh_cn, title_zh_tw,
        description_en, description_vi, description_zh_cn, description_zh_tw,
        full_description_en, full_description_vi, full_description_zh_cn, full_description_zh_tw,
        ideal_for_en, ideal_for_vi, ideal_for_zh_cn, ideal_for_zh_tw,
        what_we_deliver_en, what_we_deliver_vi, what_we_deliver_zh_cn, what_we_deliver_zh_tw,
        sort_order, is_published, featured, created_at, updated_at
      )
      VALUES (
        ${slug}, ${icon}, ${title_en}, ${title_vi}, ${title_zh_cn}, ${title_zh_tw},
        ${description_en}, ${description_vi}, ${description_zh_cn}, ${description_zh_tw},
        ${full_description_en}, ${full_description_vi}, ${full_description_zh_cn}, ${full_description_zh_tw},
        ${ideal_for_en}, ${ideal_for_vi}, ${ideal_for_zh_cn}, ${ideal_for_zh_tw},
        ${what_we_deliver_en}, ${what_we_deliver_vi}, ${what_we_deliver_zh_cn}, ${what_we_deliver_zh_tw},
        ${sort_order}, ${is_published}, ${featured}, NOW(), NOW()
      )
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const result = await sql`
      UPDATE services 
      SET 
        slug = COALESCE(${updates.slug}, slug),
        icon = COALESCE(${updates.icon}, icon),
        title_en = COALESCE(${updates.title_en}, title_en),
        title_vi = COALESCE(${updates.title_vi}, title_vi),
        title_zh_cn = COALESCE(${updates.title_zh_cn}, title_zh_cn),
        title_zh_tw = COALESCE(${updates.title_zh_tw}, title_zh_tw),
        description_en = COALESCE(${updates.description_en}, description_en),
        description_vi = COALESCE(${updates.description_vi}, description_vi),
        description_zh_cn = COALESCE(${updates.description_zh_cn}, description_zh_cn),
        description_zh_tw = COALESCE(${updates.description_zh_tw}, description_zh_tw),
        full_description_en = COALESCE(${updates.full_description_en}, full_description_en),
        full_description_vi = COALESCE(${updates.full_description_vi}, full_description_vi),
        full_description_zh_cn = COALESCE(${updates.full_description_zh_cn}, full_description_zh_cn),
        full_description_zh_tw = COALESCE(${updates.full_description_zh_tw}, full_description_zh_tw),
        ideal_for_en = COALESCE(${updates.ideal_for_en}, ideal_for_en),
        ideal_for_vi = COALESCE(${updates.ideal_for_vi}, ideal_for_vi),
        ideal_for_zh_cn = COALESCE(${updates.ideal_for_zh_cn}, ideal_for_zh_cn),
        ideal_for_zh_tw = COALESCE(${updates.ideal_for_zh_tw}, ideal_for_zh_tw),
        what_we_deliver_en = COALESCE(${updates.what_we_deliver_en}, what_we_deliver_en),
        what_we_deliver_vi = COALESCE(${updates.what_we_deliver_vi}, what_we_deliver_vi),
        what_we_deliver_zh_cn = COALESCE(${updates.what_we_deliver_zh_cn}, what_we_deliver_zh_cn),
        what_we_deliver_zh_tw = COALESCE(${updates.what_we_deliver_zh_tw}, what_we_deliver_zh_tw),
        sort_order = COALESCE(${updates.sort_order}, sort_order),
        is_published = COALESCE(${updates.is_published}, is_published),
        featured = COALESCE(${updates.featured}, featured),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0] || { success: true });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await sql`DELETE FROM services WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
