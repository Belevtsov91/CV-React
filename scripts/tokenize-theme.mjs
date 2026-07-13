// One-shot sweep: replace hardcoded brand colors with theme tokens
import { readFileSync, writeFileSync } from "fs";

const files = [
  "src/App.css",
  "src/css/Hero.css",
  "src/css/aside.css",
  "src/css/About.css",
  "src/css/Experience.css",
  "src/css/Latest_projects.css",
  "src/css/Education.css",
  "src/css/Skills.css",
  "src/css/Contact-form.css",
  "src/css/Certificates.css",
  "src/css/modalWindow.css",
  "src/css/ServerLoader.css",
];

const replacements = [
  [/rgba\(\s*146,\s*81,\s*247\s*,/g, "rgba(var(--accent-rgb),"],
  [/rgba\(\s*198,\s*150,\s*252\s*,/g, "rgba(var(--accent-soft-rgb),"],
  [/rgba\(\s*81,\s*108,\s*247\s*,/g, "rgba(var(--accent-alt-rgb),"],
  [/#9251f7/gi, "var(--accent)"],
  [/#6d5df6/gi, "var(--accent-strong)"],
  [/#c696fc/gi, "var(--accent-soft)"],
  [/#516cf7/gi, "var(--accent-alt)"],
];

for (const file of files) {
  let src = readFileSync(file, "utf8");
  let count = 0;
  for (const [re, to] of replacements) {
    src = src.replace(re, () => {
      count++;
      return to;
    });
  }
  writeFileSync(file, src);
  console.log(file.padEnd(32), count, "replacements");
}
