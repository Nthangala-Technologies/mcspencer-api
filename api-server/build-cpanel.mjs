import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import { rm } from "node:fs/promises";

globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));

async function buildCpanel() {
  const distDir = path.resolve(artifactDir, "dist-cpanel");
  await rm(distDir, { recursive: true, force: true });

  await esbuild({
    entryPoints: [path.resolve(artifactDir, "src/index.ts")],
    platform: "node",
    bundle: true,
    format: "cjs",
    outdir: distDir,
    logLevel: "info",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    external: [
      "*.node",
      "pg-native",
      "bufferutil",
      "utf-8-validate",
      "fsevents",
    ],
  });
}

buildCpanel().catch((err) => {
  console.error(err);
  process.exit(1);
});
