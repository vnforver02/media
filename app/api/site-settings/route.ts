import sql from '@/app/api/utils/sql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const settings = await sql`SELECT * FROM site_settings LIMIT 1`;
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      site_name,
      logo,
      default_language,
      company_email,
      company_phone,
      company_phone_whatsapp,
      address_en,
      address_vi,
      address_zh_cn,
      address_zh_tw,
      founded_year,
      company_intro_en,
      company_intro_vi,
      company_intro_zh_cn,
      company_intro_zh_tw,
      seo_title_en,
      seo_description_en,
      social_facebook,
      social_linkedin,
      social_instagram,
    } = body;

    const result = await sql`
      UPDATE site_settings 
      SET 
        site_name = ${site_name},
        logo = ${logo},
        default_language = ${default_language},
        company_email = ${company_email},
        company_phone = ${company_phone},
        company_phone_whatsapp = ${company_phone_whatsapp},
        address_en = ${address_en},
        address_vi = ${address_vi},
        address_zh_cn = ${address_zh_cn},
        address_zh_tw = ${address_zh_tw},
        founded_year = ${founded_year},
        company_intro_en = ${company_intro_en},
        company_intro_vi = ${company_intro_vi},
        company_intro_zh_cn = ${company_intro_zh_cn},
        company_intro_zh_tw = ${company_intro_zh_tw},
        seo_title_en = ${seo_title_en},
        seo_description_en = ${seo_description_en},
        social_facebook = ${social_facebook},
        social_linkedin = ${social_linkedin},
        social_instagram = ${social_instagram},
        updated_at = NOW()
      WHERE id = 1
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}
