import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabase.from("profiles").select("id,full_name,headline,location,bio,skills,created_at,updated_at").eq("id", user.id).maybeSingle();
  if (error) return NextResponse.json({ error: "Unable to load profile." }, { status: 500 });
  return NextResponse.json({ profile: data });
}

export async function PUT(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 }); }
  const fullName = typeof body.full_name === "string" ? body.full_name.trim() : "";
  const headline = typeof body.headline === "string" ? body.headline.trim() : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const bio = typeof body.bio === "string" ? body.bio.trim() : "";
  const skills = Array.isArray(body.skills) && body.skills.every((skill) => typeof skill === "string") ? body.skills : [];
  if (!fullName || fullName.length > 100) return NextResponse.json({ error: "A name up to 100 characters is required." }, { status: 400 });
  const { data, error } = await supabase.from("profiles").upsert({ id: user.id, full_name: fullName, headline, location, bio, skills }, { onConflict: "id" }).select("id,full_name,headline,location,bio,skills,updated_at").single();
  if (error) return NextResponse.json({ error: "Unable to save profile." }, { status: 500 });
  return NextResponse.json({ profile: data });
}
