import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const settings = await sql`SELECT * FROM site_settings LIMIT 1`;
    const response = NextResponse.json(settings);
    response.headers.set('Cache-Control', 'no-store, must-revalidate, max-age=0');
    return response;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const result = await sql`
      UPDATE site_settings 
      SET 
        site_name = ${body.site_name},
        logo = ${body.logo},
        default_language = ${body.default_language},
        company_email = ${body.company_email},
        company_phone = ${body.company_phone},
        company_phone_whatsapp = ${body.company_phone_whatsapp},
        address_en = ${body.address_en},
        address_vi = ${body.address_vi},
        address_zh_cn = ${body.address_zh_cn},
        address_zh_tw = ${body.address_zh_tw},
        founded_year = ${body.founded_year},
        company_intro_en = ${body.company_intro_en},
        company_intro_vi = ${body.company_intro_vi},
        company_intro_zh_cn = ${body.company_intro_zh_cn},
        company_intro_zh_tw = ${body.company_intro_zh_tw},
        seo_title_en = ${body.seo_title_en},
        seo_description_en = ${body.seo_description_en},
        social_facebook = ${body.social_facebook},
        social_linkedin = ${body.social_linkedin},
        social_instagram = ${body.social_instagram},
        updated_at = NOW()
      WHERE id = 1
      RETURNING *
    `;

    return NextResponse.json(result[0] || { success: true });
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}
