import { rmSync } from "node:fs";

for (const path of [".next", ".turbo"]) {
  rmSync(path, { force: true, recursive: true });
}
