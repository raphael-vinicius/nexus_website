import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outRoot = path.join(root, "public", "apple", "iphones");
const rawRoot = path.join(root, "tmp", "apple-assets-raw");
const reportPath = path.join(root, "public", "apple", "iphones", "report.json");

const cdn = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is";

const models = [
  { slug: "iphone-13", family: "iphone-13", year: "2021", colors: ["blue", "midnight", "starlight", "pink", "green", "red"] },
  { slug: "iphone-13-pro", family: "iphone-13-pro", year: "2021", colors: ["graphite", "gold", "silver", "sierra-blue", "alpine-green"] },
  { slug: "iphone-13-pro-max", family: "iphone-13-pro-max", year: "2021", colors: ["graphite", "gold", "silver", "sierra-blue", "alpine-green"] },

  { slug: "iphone-14", family: "iphone-14", year: "2022", colors: ["blue", "purple", "midnight", "starlight", "red", "yellow"] },
  { slug: "iphone-14-pro", family: "iphone-14-pro", year: "2022", colors: ["space-black", "silver", "gold", "deep-purple"] },
  { slug: "iphone-14-pro-max", family: "iphone-14-pro-max", year: "2022", colors: ["space-black", "silver", "gold", "deep-purple"] },

  { slug: "iphone-15", family: "iphone-15", year: "2023", colors: ["black", "blue", "green", "yellow", "pink"] },
  { slug: "iphone-15-pro", family: "iphone-15-pro", year: "2023", colors: ["black-titanium", "white-titanium", "blue-titanium", "natural-titanium"] },
  { slug: "iphone-15-pro-max", family: "iphone-15-pro-max", year: "2023", colors: ["black-titanium", "white-titanium", "blue-titanium", "natural-titanium"] },

  { slug: "iphone-16", family: "iphone-16", year: "202409", colors: ["ultramarine", "teal", "pink", "white", "black"] },
  { slug: "iphone-16-pro", family: "iphone-16-pro", year: "202409", colors: ["black-titanium", "white-titanium", "natural-titanium", "desert-titanium"] },
  { slug: "iphone-16-pro-max", family: "iphone-16-pro-max", year: "202409", colors: ["black-titanium", "white-titanium", "natural-titanium", "desert-titanium"] },

  { slug: "iphone-17", family: "iphone-17", year: "202509", colors: ["black", "lavender", "mist-blue", "sage", "white"] },
  { slug: "iphone-17-pro", family: "iphone-17-pro", year: "202509", colors: ["cosmic-orange", "deep-blue", "silver"] },
  { slug: "iphone-17-pro-max", family: "iphone-17-pro-max", year: "202509", colors: ["cosmic-orange", "deep-blue", "silver"] },
];

const colorNameVariants = (color) => {
  const compact = color.replaceAll("-", "");
  const productRed = color === "red" ? ["product-red", "red"] : [];
  const aliases = {
    "sierra-blue": ["blue"],
    "alpine-green": ["green"],
  }[color] ?? [];
  return [...new Set([color, compact, ...aliases, ...productRed])];
};

const yearVariants = (model, color) => {
  const ys = [model.year];
  if (model.slug.startsWith("iphone-13") && color === "green") ys.unshift("2022");
  if (model.slug.startsWith("iphone-13") && color === "green") ys.unshift("202203");
  if (model.slug.startsWith("iphone-13-pro") && color === "alpine-green") ys.unshift("2022");
  if (model.slug.startsWith("iphone-13-pro") && color === "alpine-green") ys.unshift("202203");
  if (model.slug.startsWith("iphone-13-pro") && color === "sierra-blue") ys.unshift("202109");
  if (model.slug === "iphone-14" && color === "yellow") ys.unshift("2023");
  if (model.slug === "iphone-14" && color === "yellow") ys.unshift("202303");
  if (model.year.length === 4) ys.push(`${model.year}09`, `${model.year}03`);
  return [...new Set(ys)];
};

const selectCandidates = (model, color) => {
  const names = [];
  for (const c of colorNameVariants(color)) {
    for (const y of yearVariants(model, color)) {
      names.push(`${model.family}-finish-select-${c}-${y}`);
      names.push(`${model.family}-${c}-select-${y}`);
      names.push(`${model.family}-${c}-select`);
      names.push(`${model.family}-finish-${c}-${y}`);
    }
  }
  return [...new Set(names)];
};

const backCandidates = (model, color) => {
  const names = [];
  for (const c of colorNameVariants(color)) {
    for (const y of yearVariants(model, color)) {
      names.push(`${model.family}-${c}-witb-${y}`);
      names.push(`${model.family}-witb-${c}-${y}`);
      names.push(`${model.family}-${c}-back-${y}`);
      names.push(`${model.family}-back-${c}-${y}`);
    }
  }
  return [...new Set(names)];
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function downloadFirst(names, dest, kind) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  for (const name of names) {
    const params = kind.startsWith("front")
      ? "wid=5000&fmt=png-alpha&qlt=100"
      : "wid=2200&hei=5000&fmt=png-alpha&qlt=100";
    const url = `${cdn}/${name}?${params}`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const bytes = Buffer.from(await res.arrayBuffer());
      if (bytes.length < 10_000) continue;
      await fs.writeFile(dest, bytes);
      return { ok: true, name, url, bytes: bytes.length, kind };
    } catch {
      await sleep(100);
    }
  }
  return { ok: false, tried: names, kind };
}

async function main() {
  await fs.mkdir(outRoot, { recursive: true });
  await fs.mkdir(rawRoot, { recursive: true });
  const report = {
    generatedAt: new Date().toISOString(),
    sourcePriorityUsed: ["Apple CDN"],
    models: {},
  };

  for (const model of models) {
    report.models[model.slug] = { colors: {} };
    for (const color of model.colors) {
      const dir = path.join(outRoot, model.slug, color);
      await fs.mkdir(dir, { recursive: true });

      const front = await downloadFirst(
        selectCandidates(model, color),
        path.join(dir, "front.png"),
        "front-from-official-select-composite"
      );
      const back = await downloadFirst(
        backCandidates(model, color),
        path.join(dir, "back.png"),
        "back-from-official-witb"
      );

      report.models[model.slug].colors[color] = { front, back };
      const mark = front.ok && back.ok ? "OK" : "PARTIAL";
      console.log(`${mark} ${model.slug}/${color} front=${front.ok ? front.name : "MISS"} back=${back.ok ? back.name : "MISS"}`);
    }
  }

  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`Report: ${reportPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
