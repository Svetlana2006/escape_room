import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

loadEnvFile(path.join(repoRoot, ".env.deploy"));

const remoteInfo = getRemoteInfo();
const owner = process.env.GITHUB_DEPLOY_OWNER || remoteInfo.owner;
const repo = process.env.GITHUB_DEPLOY_REPO || remoteInfo.repo;
const renderDeployHookUrl = process.env.RENDER_DEPLOY_HOOK_URL;

if (!owner || !repo) {
  console.error(
    "Unable to resolve the GitHub repository. Set GITHUB_DEPLOY_OWNER and GITHUB_DEPLOY_REPO to continue."
  );
  process.exit(1);
}

const actionsUrl = `https://github.com/${owner}/${repo}/actions`;
console.log("Publishing client to gh-pages...");
runNpm(["-w", "client", "run", "deploy"]);

console.log(`gh-pages publish finished. Watch GitHub Actions here: ${actionsUrl}`);

if (!renderDeployHookUrl) {
  console.warn(
    "RENDER_DEPLOY_HOOK_URL is not set, so Render was not asked to redeploy. Add it to .env.deploy to complete the flow."
  );
  process.exit(0);
}

console.log("Triggering Render redeploy hook...");

const response = await fetch(renderDeployHookUrl, {
  method: "POST",
  headers: {
    "User-Agent": `${repo}-deploy-script`
  }
});

if (!response.ok) {
  const details = await safeReadText(response);
  console.error("Render deploy hook failed.");
  if (details) {
    console.error(details);
  }
  process.exit(1);
}

console.log("Render redeploy requested.");

function getRemoteInfo() {
  const remote = process.env.GITHUB_REPOSITORY
    ? `https://github.com/${process.env.GITHUB_REPOSITORY}.git`
    : getGitOutput("remote get-url origin");

  if (!remote) {
    return { owner: "", repo: "" };
  }

  const normalized = remote
    .replace(/^git@github\.com:/, "https://github.com/")
    .replace(/\.git$/, "");

  const match = normalized.match(/github\.com\/([^/]+)\/([^/]+)$/i);
  if (!match) {
    return { owner: "", repo: "" };
  }

  return {
    owner: match[1],
    repo: match[2]
  };
}

function getGitOutput(args) {
  const segments = args.split(" ");
  const result = spawnSync("git", segments, {
    cwd: repoRoot,
    encoding: "utf8",
    shell: false
  });

  if (result.status !== 0 || result.error) {
    return "";
  }

  return (result.stdout || "").trim();
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const contents = readFileSync(filePath, "utf8");
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function runNpm(args) {
  const result =
    process.platform === "win32"
      ? spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", buildWindowsCommand("npm.cmd", args)], {
          cwd: repoRoot,
          stdio: "inherit",
          shell: false
        })
      : spawnSync("npm", args, {
          cwd: repoRoot,
          stdio: "inherit",
          shell: false
        });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function buildWindowsCommand(command, args) {
  return [command, ...args.map(quoteForCmd)].join(" ");
}

function quoteForCmd(value) {
  if (!value || /[\s"&^|<>]/.test(value)) {
    return `"${String(value).replace(/"/g, '""')}"`;
  }

  return value;
}

async function safeReadText(response) {
  try {
    return await response.text();
  } catch {
    return "";
  }
}
