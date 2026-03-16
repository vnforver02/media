import sql from "@/app/api/utils/sql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const caseStudies = await sql`SELECT * FROM case_studies ORDER BY sort_order ASC`;
    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, is_published, featured } = await request.json();

    if (is_published !== undefined) {
      await sql`UPDATE case_studies SET is_published = ${is_published}, updated_at = NOW() WHERE id = ${id}`;
    }
    if (featured !== undefined) {
      await sql`UPDATE case_studies SET featured = ${featured}, updated_at = NOW() WHERE id = ${id}`;
    }

    return NextResponse.json({ success: true });
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
