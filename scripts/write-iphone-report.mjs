import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = path.join(root, "public", "apple", "iphones");
const report = JSON.parse(fs.readFileSync(path.join(base, "report.json"), "utf8"));

const lines = [];
lines.push("# iPhone Official Image Collection Report");
lines.push("");
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push("");
lines.push("## Summary");
lines.push("");

let existing = 0;
let expected = 0;
let apple = 0;
const missing = [];
const frontIsolated = [];
const lowResolutionOfficial = [];

for (const [model, data] of Object.entries(report.models)) {
  for (const [color, assets] of Object.entries(data.colors)) {
    for (const kind of ["front", "back"]) {
      expected += 1;
      const file = path.join(base, model, color, `${kind}.png`);
      if (fs.existsSync(file)) {
        existing += 1;
        apple += 1;
        if (kind === "front") frontIsolated.push(`${model}/${color}/front.png`);
        if (kind === "back") lowResolutionOfficial.push(`${model}/${color}/back.png`);
      } else {
        missing.push(`${model}/${color}/${kind}.png`);
      }
    }
  }
}

lines.push(`- Expected images: ${expected}`);
lines.push(`- Downloaded/created image files: ${existing}`);
lines.push(`- Direct Apple CDN sources: ${apple}`);
lines.push("- Wayback Machine sources: 0");
lines.push("- External sources: 0");
lines.push("- Background removal: 0");
lines.push(`- Front isolation crops from official Apple select assets: ${frontIsolated.length}`);
lines.push(`- Missing under strict criteria: ${missing.length}`);
lines.push("");

lines.push("## Models And Colors");
lines.push("");
for (const [model, data] of Object.entries(report.models)) {
  const colors = Object.keys(data.colors);
  lines.push(`- ${model}: ${colors.join(", ")}`);
}
lines.push("");

lines.push("## Apple CDN Assets Used");
lines.push("");
for (const [model, data] of Object.entries(report.models)) {
  lines.push(`### ${model}`);
  for (const [color, assets] of Object.entries(data.colors)) {
    const f = assets.front.ok ? assets.front.name : "not found";
    const b = assets.back.ok ? assets.back.name : "not found";
    lines.push(`- ${color}: front=${f}; back=${b}`);
  }
  lines.push("");
}

lines.push("## Important Quality Notes");
lines.push("");
lines.push("- iPhone 14 through iPhone 17 Pro Max front files were isolated from official Apple CDN select/finish-select PNG-alpha assets.");
lines.push("- iPhone 13, iPhone 13 Pro, and iPhone 13 Pro Max front files were not kept because the public Apple CDN assets found are either partially obscured composites or detail crops, not a full front view at the requested quality.");
lines.push("- Back files are direct Apple CDN WITB/back-facing assets. The public CDN currently exposes these at a small native device bounding box, so they are official and transparent but do not satisfy the requested 2000px device-resolution requirement.");
lines.push("- No Wayback asset with a better strict full-front/full-back match was successfully recovered during this run.");
lines.push("");

lines.push("## Missing Files");
lines.push("");
for (const item of missing) lines.push(`- ${item}`);
lines.push("");

fs.writeFileSync(path.join(base, "REPORT.md"), lines.join("\n"));
console.log(path.join(base, "REPORT.md"));
