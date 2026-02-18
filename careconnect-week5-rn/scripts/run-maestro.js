#!/usr/bin/env node
/* eslint-disable no-console */
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function resolveMaestro() {
  if (process.env.MAESTRO_BIN && fs.existsSync(process.env.MAESTRO_BIN)) {
    return process.env.MAESTRO_BIN;
  }

  const locatorCommands =
    process.platform === "win32"
      ? [["where.exe", ["maestro"]], ["where", ["maestro"]]]
      : [["which", ["maestro"]]];

  for (const [command, commandArgs] of locatorCommands) {
    const locateResult = spawnSync(command, commandArgs, { shell: false, encoding: "utf8" });
    if (locateResult.status === 0) {
      const foundPaths = locateResult.stdout
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
      if (foundPaths.length > 0) {
        if (process.platform === "win32") {
          const extPriority = { ".bat": 0, ".cmd": 1, ".exe": 2 };
          const sortedPaths = [...foundPaths].sort((a, b) => {
            const aExt = path.extname(a).toLowerCase();
            const bExt = path.extname(b).toLowerCase();
            const aRank = extPriority[aExt] ?? 100;
            const bRank = extPriority[bExt] ?? 100;
            return aRank - bRank;
          });
          return sortedPaths[0];
        }
        return foundPaths[0];
      }
    }
  }

  const userProfile = process.env.USERPROFILE || process.env.HOME || "";
  const windowsDefault = path.join(userProfile, ".maestro", "bin", "maestro.exe");
  if (windowsDefault && fs.existsSync(windowsDefault)) {
    return windowsDefault;
  }

  const unixCandidates = [
    path.join(userProfile, "maestro", "maestro", "bin", "maestro.bat"),
    path.join(userProfile, "maestro", "maestro", "bin", "maestro"),
    path.join(userProfile, ".maestro", "bin", "maestro"),
    "/usr/local/bin/maestro",
    "/opt/homebrew/bin/maestro",
  ];
  for (const candidate of unixCandidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

const maestroBin = resolveMaestro();
if (!maestroBin) {
  console.error("Maestro CLI not found.");
  console.error("Install it from https://maestro.mobile.dev/getting-started/installing-maestro");
  console.error(
    "If already installed, add it to PATH or set MAESTRO_BIN to the full executable path."
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const useShell = process.platform === "win32" && /\.(bat|cmd)$/i.test(maestroBin);
const childEnv = { ...process.env };
if (process.platform === "win32") {
  const projectHome = path.resolve(process.cwd(), ".maestro-home");
  const localAppData = path.join(projectHome, "AppData", "Local");
  fs.mkdirSync(path.join(projectHome, ".maestro"), { recursive: true });
  fs.mkdirSync(localAppData, { recursive: true });
  childEnv.HOME = projectHome;
  childEnv.USERPROFILE = projectHome;
  childEnv.LOCALAPPDATA = localAppData;
}
const result = spawnSync(maestroBin, args, {
  stdio: "inherit",
  shell: useShell,
  env: childEnv,
});
if (result.error) {
  console.error(`Failed to launch Maestro CLI from "${maestroBin}".`);
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
