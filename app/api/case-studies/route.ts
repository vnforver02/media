import sql from "@/app/api/utils/sql";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const admin = url.searchParams.get('admin');
    const id = url.searchParams.get('id');

    // If id is provided, return single case study
    if (id) {
      const caseStudy = await sql`
        SELECT * FROM case_studies WHERE id = ${parseInt(id)}
      `;
      const response = NextResponse.json(caseStudy[0] || null);
      response.headers.set('Cache-Control', 'no-store, must-revalidate, max-age=0');
      return response;
    }

    // If admin=true, return all case studies (including unpublished)
    if (admin === 'true') {
      const caseStudies = await sql`SELECT * FROM case_studies ORDER BY sort_order ASC`;
      const response = NextResponse.json(caseStudies);
      response.headers.set('Cache-Control', 'no-store, must-revalidate, max-age=0');
      return response;
    }

    // Otherwise, return only published case studies
    const caseStudies = await sql`SELECT * FROM case_studies WHERE is_published = true ORDER BY sort_order ASC`;
    const response = NextResponse.json(caseStudies);
    response.headers.set('Cache-Control', 'no-store, must-revalidate, max-age=0');
    return response;
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      slug,
      title_en,
      title_vi,
      title_zh_cn,
      title_zh_tw,
      cover_image,
      client_type_en,
      client_type_vi,
      client_type_zh_cn,
      client_type_zh_tw,
      industry_en,
      industry_vi,
      industry_zh_cn,
      industry_zh_tw,
      summary_en,
      summary_vi,
      summary_zh_cn,
      summary_zh_tw,
      challenge_en,
      challenge_vi,
      challenge_zh_cn,
      challenge_zh_tw,
      strategy_en,
      strategy_vi,
      strategy_zh_cn,
      strategy_zh_tw,
      execution_en,
      execution_vi,
      execution_zh_cn,
      execution_zh_tw,
      results_en,
      results_vi,
      results_zh_cn,
      results_zh_tw,
      seo_title_en,
      seo_description_en,
      sort_order = 0,
      is_published = false,
      featured = false,
    } = body;

    const result = await sql`
      INSERT INTO case_studies (
        slug, title_en, title_vi, title_zh_cn, title_zh_tw,
        cover_image, client_type_en, client_type_vi, client_type_zh_cn, client_type_zh_tw,
        industry_en, industry_vi, industry_zh_cn, industry_zh_tw,
        summary_en, summary_vi, summary_zh_cn, summary_zh_tw,
        challenge_en, challenge_vi, challenge_zh_cn, challenge_zh_tw,
        strategy_en, strategy_vi, strategy_zh_cn, strategy_zh_tw,
        execution_en, execution_vi, execution_zh_cn, execution_zh_tw,
        results_en, results_vi, results_zh_cn, results_zh_tw,
        seo_title_en, seo_description_en,
        sort_order, is_published, featured, created_at, updated_at
      )
      VALUES (
        ${slug}, ${title_en}, ${title_vi}, ${title_zh_cn}, ${title_zh_tw},
        ${cover_image}, ${client_type_en}, ${client_type_vi}, ${client_type_zh_cn}, ${client_type_zh_tw},
        ${industry_en}, ${industry_vi}, ${industry_zh_cn}, ${industry_zh_tw},
        ${summary_en}, ${summary_vi}, ${summary_zh_cn}, ${summary_zh_tw},
        ${challenge_en}, ${challenge_vi}, ${challenge_zh_cn}, ${challenge_zh_tw},
        ${strategy_en}, ${strategy_vi}, ${strategy_zh_cn}, ${strategy_zh_tw},
        ${execution_en}, ${execution_vi}, ${execution_zh_cn}, ${execution_zh_tw},
        ${results_en}, ${results_vi}, ${results_zh_cn}, ${results_zh_tw},
        ${seo_title_en}, ${seo_description_en},
        ${sort_order}, ${is_published}, ${featured}, NOW(), NOW()
      )
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating case study:", error);
    return NextResponse.json({ error: "Failed to create case study" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const result = await sql`
      UPDATE case_studies 
      SET 
        slug = COALESCE(${updates.slug}, slug),
        title_en = COALESCE(${updates.title_en}, title_en),
        title_vi = COALESCE(${updates.title_vi}, title_vi),
        title_zh_cn = COALESCE(${updates.title_zh_cn}, title_zh_cn),
        title_zh_tw = COALESCE(${updates.title_zh_tw}, title_zh_tw),
        cover_image = COALESCE(${updates.cover_image}, cover_image),
        client_type_en = COALESCE(${updates.client_type_en}, client_type_en),
        client_type_vi = COALESCE(${updates.client_type_vi}, client_type_vi),
        client_type_zh_cn = COALESCE(${updates.client_type_zh_cn}, client_type_zh_cn),
        client_type_zh_tw = COALESCE(${updates.client_type_zh_tw}, client_type_zh_tw),
        industry_en = COALESCE(${updates.industry_en}, industry_en),
        industry_vi = COALESCE(${updates.industry_vi}, industry_vi),
        industry_zh_cn = COALESCE(${updates.industry_zh_cn}, industry_zh_cn),
        industry_zh_tw = COALESCE(${updates.industry_zh_tw}, industry_zh_tw),
        summary_en = COALESCE(${updates.summary_en}, summary_en),
        summary_vi = COALESCE(${updates.summary_vi}, summary_vi),
        summary_zh_cn = COALESCE(${updates.summary_zh_cn}, summary_zh_cn),
        summary_zh_tw = COALESCE(${updates.summary_zh_tw}, summary_zh_tw),
        challenge_en = COALESCE(${updates.challenge_en}, challenge_en),
        challenge_vi = COALESCE(${updates.challenge_vi}, challenge_vi),
        challenge_zh_cn = COALESCE(${updates.challenge_zh_cn}, challenge_zh_cn),
        challenge_zh_tw = COALESCE(${updates.challenge_zh_tw}, challenge_zh_tw),
        strategy_en = COALESCE(${updates.strategy_en}, strategy_en),
        strategy_vi = COALESCE(${updates.strategy_vi}, strategy_vi),
        strategy_zh_cn = COALESCE(${updates.strategy_zh_cn}, strategy_zh_cn),
        strategy_zh_tw = COALESCE(${updates.strategy_zh_tw}, strategy_zh_tw),
        execution_en = COALESCE(${updates.execution_en}, execution_en),
        execution_vi = COALESCE(${updates.execution_vi}, execution_vi),
        execution_zh_cn = COALESCE(${updates.execution_zh_cn}, execution_zh_cn),
        execution_zh_tw = COALESCE(${updates.execution_zh_tw}, execution_zh_tw),
        results_en = COALESCE(${updates.results_en}, results_en),
        results_vi = COALESCE(${updates.results_vi}, results_vi),
        results_zh_cn = COALESCE(${updates.results_zh_cn}, results_zh_cn),
        results_zh_tw = COALESCE(${updates.results_zh_tw}, results_zh_tw),
        seo_title_en = COALESCE(${updates.seo_title_en}, seo_title_en),
        seo_description_en = COALESCE(${updates.seo_description_en}, seo_description_en),
        sort_order = COALESCE(${updates.sort_order}, sort_order),
        is_published = COALESCE(${updates.is_published}, is_published),
        featured = COALESCE(${updates.featured}, featured),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0] || { success: true });
  } catch (error) {
    console.error("Error updating case study:", error);
    return NextResponse.json({ error: "Failed to update case study" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await sql`DELETE FROM case_studies WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting case study:", error);
    return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 });
  }
}
