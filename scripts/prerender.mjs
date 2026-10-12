/**
 * Post-build prerender.
 *
 * Runs after `vite build`: loads src/entry-server.tsx through Vite's SSR
 * pipeline (so TSX, the `@/` alias and every dependency resolve exactly as
 * they do in the app), renders each public page, and injects the markup into
 * the matching file in dist/.
 *
 *   node scripts/prerender.mjs
 *
 * Exits non-zero if a page fails to render or if the built HTML is missing the
 * `#root` placeholder — a silent failure here would ship an empty page to
 * every crawler, so it must be loud.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createServer } from "vite";

const root = process.cwd();
const distDir = path.join(root, "dist");
const ROOT_PLACEHOLDER = '<div id="root"></div>';

const server = await createServer({
  root,
  configFile: path.join(root, "vite.config.ts"),
  appType: "custom",
  logLevel: "warn",
  server: { middlewareMode: true, hmr: false },
});

let failed = false;

try {
  const { routes } = await server.ssrLoadModule("/src/entry-server.tsx");

  for (const route of routes) {
    const filePath = path.join(distDir, route.file);
    let template;

    try {
      template = await readFile(filePath, "utf8");
    } catch {
      console.error(`✗ ${route.url} — ${route.file} was not emitted by vite build`);
      failed = true;
      continue;
    }

    if (!template.includes(ROOT_PLACEHOLDER)) {
      console.error(`✗ ${route.url} — ${route.file} has no ${ROOT_PLACEHOLDER} to fill in`);
      failed = true;
      continue;
    }

    let markup;
    try {
      markup = route.render();
    } catch (error) {
      console.error(`✗ ${route.url} — render failed:`);
      console.error(error);
      failed = true;
      continue;
    }

    const html = template.replace(ROOT_PLACEHOLDER, `<div id="root">${markup}</div>`);
    await writeFile(filePath, html, "utf8");

    const textLength = markup.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
    console.log(
      `✓ ${route.url.padEnd(15)} ${route.file.padEnd(14)} ${String(markup.length).padStart(7)} bytes markup · ${textLength} chars of text`,
    );
  }
} finally {
  await server.close();
}

if (failed) {
  console.error("\nPrerender failed — dist/ is incomplete. Fix the error above and rebuild.");
  process.exit(1);
}

console.log("\nPrerendered HTML is in dist/. Crawlers now see the real content.");
