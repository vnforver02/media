import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const faqs = await sql`SELECT * FROM faqs ORDER BY sort_order ASC`;
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      question_en,
      question_vi,
      question_zh_cn,
      question_zh_tw,
      answer_en,
      answer_vi,
      answer_zh_cn,
      answer_zh_tw,
      category_en,
      category_vi,
      category_zh_cn,
      category_zh_tw,
      sort_order = 0,
      is_published = false,
    } = body;

    const result = await sql`
      INSERT INTO faqs (
        question_en, question_vi, question_zh_cn, question_zh_tw,
        answer_en, answer_vi, answer_zh_cn, answer_zh_tw,
        category_en, category_vi, category_zh_cn, category_zh_tw,
        sort_order, is_published, created_at, updated_at
      )
      VALUES (
        ${question_en}, ${question_vi}, ${question_zh_cn}, ${question_zh_tw},
        ${answer_en}, ${answer_vi}, ${answer_zh_cn}, ${answer_zh_tw},
        ${category_en}, ${category_vi}, ${category_zh_cn}, ${category_zh_tw},
        ${sort_order}, ${is_published}, NOW(), NOW()
      )
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const setClause = Object.entries(updates)
      .map(([key, value]) => `${key} = ${value === null ? 'NULL' : `'${String(value).replace(/'/g, "''")}'`}`)
      .join(', ');

    const result = await sql`
      UPDATE faqs 
      SET ${setClause}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await sql`DELETE FROM faqs WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
