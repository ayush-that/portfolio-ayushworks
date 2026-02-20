import { z } from "zod";
import { NextResponse } from "next/server";

const SA_API_BASE = "https://simpleanalytics.com/ayushworks.com.json";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug: rawSlug } = await params;
    const slug = z.string().parse(rawSlug);
    const pagePath = `/blog/${slug}`;

    const url = new URL(SA_API_BASE);
    url.searchParams.set("version", "6");
    url.searchParams.set("fields", "pageviews");
    url.searchParams.set("pages", pagePath);
    url.searchParams.set("start", "2020-01-01"); // All-time views

    const response = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      console.error("Simple Analytics API error:", response.status);
      return NextResponse.json({ views: { slug, count: 0 } });
    }

    const data = await response.json();
    const count = data.pageviews ?? 0;

    return NextResponse.json({ views: { slug, count } });
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json({ views: { slug: "unknown", count: 0 } });
  }
}
