import { spawn, spawnSync } from "node:child_process";
import { rmSync } from "node:fs";

const ports = ["3000", "3001"];

function run(command, args) {
  spawnSync(command, args, { stdio: "ignore", shell: process.platform === "win32" });
}

function killDevPorts() {
  if (process.env.SKIP_DEV_PORT_KILL === "true") {
    return;
  }

  if (process.platform === "win32") {
    const portList = ports.join(",");
    run("powershell.exe", [
      "-NoProfile",
      "-Command",
      `Get-NetTCPConnection -LocalPort ${portList} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }`,
    ]);
    return;
  }

  for (const port of ports) {
    run("sh", ["-lc", `command -v fuser >/dev/null 2>&1 && fuser -k ${port}/tcp || true`]);
    run("sh", ["-lc", `command -v lsof >/dev/null 2>&1 && lsof -ti:${port} | xargs -r kill -9 || true`]);
  }
}

function cleanNextCache() {
  if (process.env.SKIP_NEXT_CLEAN === "true") {
    return;
  }

  for (const path of [".next", ".turbo"]) {
    rmSync(path, { force: true, recursive: true });
  }
}

killDevPorts();
cleanNextCache();

const child = spawn("node", ["node_modules/next/dist/bin/next", "dev", "-p", "3000"], {
  env: {
    ...process.env,
    WATCHPACK_POLLING: process.env.WATCHPACK_POLLING ?? "true",
    CHOKIDAR_USEPOLLING: process.env.CHOKIDAR_USEPOLLING ?? "true",
    NEXT_TELEMETRY_DISABLED: process.env.NEXT_TELEMETRY_DISABLED ?? "1",
  },
  stdio: "inherit",
  shell: process.platform === "win32",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
