/**
 * Davao Digital — Worker entry point.
 *
 * Cloudflare's static-assets router serves anything that matches a file in
 * `dist/` WITHOUT running this script. This script only ever runs for paths
 * that have no matching asset, which is exactly where the enquiry API lives.
 * Everything else is handed straight back to the asset binding.
 *
 * See: https://developers.cloudflare.com/workers/static-assets/
 */

import { handleEnquiry } from "../functions/api/enquiry.js";

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/enquiry" || pathname === "/api/enquiry/") {
      return handleEnquiry(request, env, ctx);
    }

    // Anything else that reached the Worker (a typo'd path, for instance).
    // `not_found_handling: "404-page"` in wrangler.jsonc already handles
    // browser navigations; this keeps API-shaped paths honest.
    if (pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ error: "not_found" }), {
        status: 404,
        headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
