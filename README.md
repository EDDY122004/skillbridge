import { NextResponse } from "next/server";
import { skillCatalog } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: skillCatalog.length,
    skills: skillCatalog,
  });
}
