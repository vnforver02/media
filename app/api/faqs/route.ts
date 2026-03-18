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

    const result = await sql`
      UPDATE faqs 
      SET 
        question_en = COALESCE(${updates.question_en}, question_en),
        question_vi = COALESCE(${updates.question_vi}, question_vi),
        question_zh_cn = COALESCE(${updates.question_zh_cn}, question_zh_cn),
        question_zh_tw = COALESCE(${updates.question_zh_tw}, question_zh_tw),
        answer_en = COALESCE(${updates.answer_en}, answer_en),
        answer_vi = COALESCE(${updates.answer_vi}, answer_vi),
        answer_zh_cn = COALESCE(${updates.answer_zh_cn}, answer_zh_cn),
        answer_zh_tw = COALESCE(${updates.answer_zh_tw}, answer_zh_tw),
        category_en = COALESCE(${updates.category_en}, category_en),
        category_vi = COALESCE(${updates.category_vi}, category_vi),
        category_zh_cn = COALESCE(${updates.category_zh_cn}, category_zh_cn),
        category_zh_tw = COALESCE(${updates.category_zh_tw}, category_zh_tw),
        sort_order = COALESCE(${updates.sort_order}, sort_order),
        is_published = COALESCE(${updates.is_published}, is_published),
        updated_at = NOW()
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
