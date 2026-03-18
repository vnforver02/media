import sql from "@/app/api/utils/sql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let sqlDump = "-- Database Export\n";
    sqlDump += `-- Generated on ${new Date().toISOString()}\n\n`;

    // Get all table names
    const tables = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;

    for (const { table_name } of tables) {
      // Get CREATE TABLE statement
      const columnInfo = await sql`
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = ${table_name}
        ORDER BY ordinal_position
      `;

      // Get constraints
      const constraints = await sql`
        SELECT constraint_name, constraint_type
        FROM information_schema.table_constraints
        WHERE table_schema = 'public' AND table_name = ${table_name}
      `;

      // Build CREATE TABLE
      let createTable = `\n-- Table: ${table_name}\n`;
      createTable += `CREATE TABLE IF NOT EXISTS ${table_name} (\n`;

      const columns = columnInfo.map((col: any) => {
        let columnDef = `  ${col.column_name} ${col.data_type}`;
        if (col.is_nullable === "NO") columnDef += " NOT NULL";
        if (col.column_default) columnDef += ` DEFAULT ${col.column_default}`;
        return columnDef;
      });

      // Add primary key constraint
      const pkConstraint = constraints.find((c: any) => c.constraint_type === "PRIMARY KEY");
      if (pkConstraint) {
        const pkColumns = await sql`
          SELECT a.attname
          FROM pg_index i
          JOIN pg_attribute a ON a.attrelid = i.indrelid
          AND a.attnum = ANY(i.indkey)
          WHERE i.indrelname = ${pkConstraint.constraint_name}
        `;
        const pkCols = pkColumns.map((c: any) => c.attname).join(", ");
        columns.push(`  PRIMARY KEY (${pkCols})`);
      }

      createTable += columns.join(",\n");
      createTable += "\n);\n";
      sqlDump += createTable;

      // Get all data from table
      const data = await sql`SELECT * FROM ${sql.literal(table_name)}`;

      if (data.length > 0) {
        sqlDump += `\n-- Data for ${table_name}\n`;
        for (const row of data) {
          const columns = Object.keys(row);
          const values = columns.map((col) => {
            const value = row[col];
            if (value === null) return "NULL";
            if (typeof value === "string") {
              return `'${value.replace(/'/g, "''")}'`;
            }
            if (typeof value === "boolean") {
              return value ? "true" : "false";
            }
            if (value instanceof Date) {
              return `'${value.toISOString()}'`;
            }
            return String(value);
          });

          sqlDump += `INSERT INTO ${table_name} (${columns.join(", ")}) VALUES (${values.join(
            ", "
          )});\n`;
        }
      }

      sqlDump += "\n";
    }

    return new NextResponse(sqlDump, {
      headers: {
        "Content-Type": "application/sql; charset=utf-8",
        "Content-Disposition": `attachment; filename="database-export-${new Date().toISOString().split("T")[0]}.sql"`,
      },
    });
  } catch (error) {
    console.error("Database export error:", error);
    return NextResponse.json({ error: "Failed to export database" }, { status: 500 });
  }
}
