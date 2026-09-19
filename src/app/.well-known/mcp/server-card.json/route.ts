import { goneResponse } from "~/lib/gone";

export async function GET() {
  return goneResponse();
}

export async function OPTIONS() {
  return goneResponse();
}
