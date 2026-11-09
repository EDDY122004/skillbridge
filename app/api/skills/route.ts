import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { skillCatalog } from "@/lib/data";

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ success: true, count: skillCatalog.length, skills: skillCatalog, source: "demo" });
  }
  const supabase = createClient();
  const { data, error } = await supabase.from("skills").select("id,title,slug,category,level,description,concepts,resources").order("title");
  if (error) return NextResponse.json({ success: false, error: "Unable to load skills." }, { status: 500 });
  return NextResponse.json({ success: true, count: data.length, skills: data, source: "database" });
}
