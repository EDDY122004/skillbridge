import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { opportunities as demoOpportunities } from "@/lib/data";

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ success: true, count: demoOpportunities.length, opportunities: demoOpportunities, source: "demo" });
  }
  const supabase = createClient();
  const { data, error } = await supabase.from("opportunities").select("id,title,organization,type,location,description,required_skills,status,created_at").eq("status", "active").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ success: false, error: "Unable to load opportunities." }, { status: 500 });
  return NextResponse.json({ success: true, count: data.length, opportunities: data, source: "database" });
}

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const role = user?.app_metadata?.role;
  if (!user || (role !== "provider" && role !== "admin")) return NextResponse.json({ error: "Provider or admin access is required." }, { status: 403 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 }); }
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const organization = typeof body.organization === "string" ? body.organization.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const type = typeof body.type === "string" ? body.type.trim() : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const requiredSkills = Array.isArray(body.required_skills) && body.required_skills.every((skill) => typeof skill === "string") ? body.required_skills : [];
  if (!title || !organization || !description || !type) return NextResponse.json({ error: "Title, organization, type, and description are required." }, { status: 400 });
  const { data, error } = await supabase.from("opportunities").insert({ provider_id: user.id, title, organization, description, type, location, required_skills: requiredSkills, status: "pending" }).select().single();
  if (error) return NextResponse.json({ error: "Unable to create opportunity." }, { status: 500 });
  return NextResponse.json({ success: true, opportunity: data }, { status: 201 });
}
