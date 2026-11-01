import { NextResponse } from "next/server";
import { opportunities } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: opportunities.length,
    opportunities,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    message: "Opportunity created",
    opportunity: body,
  });
}
