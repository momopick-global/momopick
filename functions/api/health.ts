/**
 * Cloudflare Pages Functions — 정적 Next export와 함께 `/api/health` 제공
 * https://developers.cloudflare.com/pages/functions/
 */
export async function onRequestGet() {
  return Response.json({
    ok: true,
    service: "momopick",
    runtime: "cloudflare-pages-functions",
    time: new Date().toISOString(),
  });
}
