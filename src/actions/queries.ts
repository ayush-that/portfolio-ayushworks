"use server";

interface SimpleAnalyticsResponse {
  pageviews?: number;
}

export async function getPostViews(slug: string): Promise<number> {
  try {
    const response = await fetch(
      `https://simpleanalytics.com/ayushworks.com/blog/${slug}.json?version=6&fields=pageviews`,
      { next: { revalidate: 60 } },
    );

    if (!response.ok) {
      return 0;
    }

    const data: SimpleAnalyticsResponse = await response.json();
    return data.pageviews ?? 0;
  } catch {
    return 0;
  }
}
