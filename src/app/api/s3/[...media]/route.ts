import { createMediaHandler } from "next-tinacms-s3/dist/handlers";
import type { NextRequest } from "next/server";
import config from "~/config";

// next-tinacms-s3 ships a pages-style (req, res) handler. We adapt it to an
// App Router route handler so the project stays app-router-only. Editing is
// local-only, so this never authorizes uploads from a deployed instance.
const handler = createMediaHandler(
  {
    config: {
      region: "auto",
      endpoint: process.env.R2_ENDPOINT,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
      },
    },
    bucket: process.env.R2_BUCKET || "ayushworks-media",
    authorized: async () => process.env.NODE_ENV !== "production",
  },
  { cdnUrl: config.cdnUrl },
);

async function run(req: NextRequest, media: string[]) {
  const query: Record<string, unknown> = Object.fromEntries(req.nextUrl.searchParams);
  query.media = media;

  let statusCode = 200;
  let payload: unknown;
  const res = {
    status(code: number) {
      statusCode = code;
      return res;
    },
    json(obj: unknown) {
      payload = obj;
      return res;
    },
    end(code?: number) {
      if (typeof code === "number") statusCode = code;
      return res;
    },
  };

  await (handler as (req: unknown, res: unknown) => Promise<void>)(
    { method: req.method, query },
    res,
  );

  return payload === undefined
    ? new Response(null, { status: statusCode })
    : Response.json(payload, { status: statusCode });
}

type Ctx = { params: Promise<{ media: string[] }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  return run(req, (await params).media);
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  return run(req, (await params).media);
}
