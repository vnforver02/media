import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const admin = url.searchParams.get('admin');
    const id = url.searchParams.get('id');

    // If id is provided, return single job
    if (id) {
      const job = await sql`
        SELECT * FROM jobs WHERE id = ${parseInt(id)}
      `;
      const response = NextResponse.json(job[0] || null);
      response.headers.set('Cache-Control', 'no-store, must-revalidate, max-age=0');
      return response;
    }

    // If admin=true, return all jobs (including unpublished)
    if (admin === 'true') {
      const jobs = await sql`
        SELECT * FROM jobs 
        ORDER BY sort_order ASC
      `;
      const response = NextResponse.json(jobs);
      response.headers.set('Cache-Control', 'no-store, must-revalidate, max-age=0');
      return response;
    }

    // Otherwise, return only published jobs
    const jobs = await sql`
      SELECT * FROM jobs 
      WHERE is_published = true 
      ORDER BY sort_order ASC
    `;
    const response = NextResponse.json(jobs);
    response.headers.set('Cache-Control', 'no-store, must-revalidate, max-age=0');
    return response;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
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
      department_en,
      department_vi,
      department_zh_cn,
      department_zh_tw,
      location_en,
      location_vi,
      location_zh_cn,
      location_zh_tw,
      employment_type_en,
      employment_type_vi,
      employment_type_zh_cn,
      employment_type_zh_tw,
      overview_en,
      overview_vi,
      overview_zh_cn,
      overview_zh_tw,
      responsibilities_en,
      responsibilities_vi,
      responsibilities_zh_cn,
      responsibilities_zh_tw,
      requirements_en,
      requirements_vi,
      requirements_zh_cn,
      requirements_zh_tw,
      preferred_skills_en,
      preferred_skills_vi,
      preferred_skills_zh_cn,
      preferred_skills_zh_tw,
      benefits_en,
      benefits_vi,
      benefits_zh_cn,
      benefits_zh_tw,
      sort_order = 0,
      is_published = false,
      featured = false,
    } = body;

    const result = await sql`
      INSERT INTO jobs (
        slug, title_en, title_vi, title_zh_cn, title_zh_tw,
        department_en, department_vi, department_zh_cn, department_zh_tw,
        location_en, location_vi, location_zh_cn, location_zh_tw,
        employment_type_en, employment_type_vi, employment_type_zh_cn, employment_type_zh_tw,
        overview_en, overview_vi, overview_zh_cn, overview_zh_tw,
        responsibilities_en, responsibilities_vi, responsibilities_zh_cn, responsibilities_zh_tw,
        requirements_en, requirements_vi, requirements_zh_cn, requirements_zh_tw,
        preferred_skills_en, preferred_skills_vi, preferred_skills_zh_cn, preferred_skills_zh_tw,
        benefits_en, benefits_vi, benefits_zh_cn, benefits_zh_tw,
        sort_order, is_published, featured, created_at, updated_at
      )
      VALUES (
        ${slug}, ${title_en}, ${title_vi}, ${title_zh_cn}, ${title_zh_tw},
        ${department_en}, ${department_vi}, ${department_zh_cn}, ${department_zh_tw},
        ${location_en}, ${location_vi}, ${location_zh_cn}, ${location_zh_tw},
        ${employment_type_en}, ${employment_type_vi}, ${employment_type_zh_cn}, ${employment_type_zh_tw},
        ${overview_en}, ${overview_vi}, ${overview_zh_cn}, ${overview_zh_tw},
        ${responsibilities_en}, ${responsibilities_vi}, ${responsibilities_zh_cn}, ${responsibilities_zh_tw},
        ${requirements_en}, ${requirements_vi}, ${requirements_zh_cn}, ${requirements_zh_tw},
        ${preferred_skills_en}, ${preferred_skills_vi}, ${preferred_skills_zh_cn}, ${preferred_skills_zh_tw},
        ${benefits_en}, ${benefits_vi}, ${benefits_zh_cn}, ${benefits_zh_tw},
        ${sort_order}, ${is_published}, ${featured}, NOW(), NOW()
      )
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const result = await sql`
      UPDATE jobs 
      SET 
        slug = COALESCE(${updates.slug}, slug),
        title_en = COALESCE(${updates.title_en}, title_en),
        title_vi = COALESCE(${updates.title_vi}, title_vi),
        title_zh_cn = COALESCE(${updates.title_zh_cn}, title_zh_cn),
        title_zh_tw = COALESCE(${updates.title_zh_tw}, title_zh_tw),
        department_en = COALESCE(${updates.department_en}, department_en),
        department_vi = COALESCE(${updates.department_vi}, department_vi),
        department_zh_cn = COALESCE(${updates.department_zh_cn}, department_zh_cn),
        department_zh_tw = COALESCE(${updates.department_zh_tw}, department_zh_tw),
        location_en = COALESCE(${updates.location_en}, location_en),
        location_vi = COALESCE(${updates.location_vi}, location_vi),
        location_zh_cn = COALESCE(${updates.location_zh_cn}, location_zh_cn),
        location_zh_tw = COALESCE(${updates.location_zh_tw}, location_zh_tw),
        employment_type_en = COALESCE(${updates.employment_type_en}, employment_type_en),
        employment_type_vi = COALESCE(${updates.employment_type_vi}, employment_type_vi),
        employment_type_zh_cn = COALESCE(${updates.employment_type_zh_cn}, employment_type_zh_cn),
        employment_type_zh_tw = COALESCE(${updates.employment_type_zh_tw}, employment_type_zh_tw),
        overview_en = COALESCE(${updates.overview_en}, overview_en),
        overview_vi = COALESCE(${updates.overview_vi}, overview_vi),
        overview_zh_cn = COALESCE(${updates.overview_zh_cn}, overview_zh_cn),
        overview_zh_tw = COALESCE(${updates.overview_zh_tw}, overview_zh_tw),
        responsibilities_en = COALESCE(${updates.responsibilities_en}, responsibilities_en),
        responsibilities_vi = COALESCE(${updates.responsibilities_vi}, responsibilities_vi),
        responsibilities_zh_cn = COALESCE(${updates.responsibilities_zh_cn}, responsibilities_zh_cn),
        responsibilities_zh_tw = COALESCE(${updates.responsibilities_zh_tw}, responsibilities_zh_tw),
        requirements_en = COALESCE(${updates.requirements_en}, requirements_en),
        requirements_vi = COALESCE(${updates.requirements_vi}, requirements_vi),
        requirements_zh_cn = COALESCE(${updates.requirements_zh_cn}, requirements_zh_cn),
        requirements_zh_tw = COALESCE(${updates.requirements_zh_tw}, requirements_zh_tw),
        preferred_skills_en = COALESCE(${updates.preferred_skills_en}, preferred_skills_en),
        preferred_skills_vi = COALESCE(${updates.preferred_skills_vi}, preferred_skills_vi),
        preferred_skills_zh_cn = COALESCE(${updates.preferred_skills_zh_cn}, preferred_skills_zh_cn),
        preferred_skills_zh_tw = COALESCE(${updates.preferred_skills_zh_tw}, preferred_skills_zh_tw),
        benefits_en = COALESCE(${updates.benefits_en}, benefits_en),
        benefits_vi = COALESCE(${updates.benefits_vi}, benefits_vi),
        benefits_zh_cn = COALESCE(${updates.benefits_zh_cn}, benefits_zh_cn),
        benefits_zh_tw = COALESCE(${updates.benefits_zh_tw}, benefits_zh_tw),
        sort_order = COALESCE(${updates.sort_order}, sort_order),
        is_published = COALESCE(${updates.is_published}, is_published),
        featured = COALESCE(${updates.featured}, featured),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0] || { success: true });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await sql`DELETE FROM jobs WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
