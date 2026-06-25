import { spawnSync } from "node:child_process";

const project = `storybook:${process.cwd().replace(/\\/g, "/")}/.storybook`;
const result = spawnSync(
  "bunx",
  ["vitest", "--project", project, ...process.argv.slice(2)],
  {
    shell: process.platform === "win32",
    stdio: "inherit",
  },
);

process.exit(result.status ?? 1);
