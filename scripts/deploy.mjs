import { execSync } from "node:child_process";
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
const ref = process.env.GITHUB_DEPLOY_REF || getGitOutput("branch --show-current") || "main";
const workflow = process.env.GITHUB_DEPLOY_WORKFLOW || "deploy-pages-render.yml";
const token =
  process.env.DEPLOY_GITHUB_TOKEN ||
  process.env.GITHUB_TOKEN ||
  process.env.GH_TOKEN;

if (!token) {
  console.error(
    "Missing a GitHub token. Set DEPLOY_GITHUB_TOKEN, GITHUB_TOKEN, or GH_TOKEN before running npm run deploy."
  );
  process.exit(1);
}

if (!owner || !repo) {
  console.error(
    "Unable to resolve the GitHub repository. Set GITHUB_DEPLOY_OWNER and GITHUB_DEPLOY_REPO to continue."
  );
  process.exit(1);
}

const actionsUrl = `https://github.com/${owner}/${repo}/actions`;
const dispatchUrl = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${encodeURIComponent(workflow)}/dispatches`;

const response = await fetch(dispatchUrl, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": `${repo}-deploy-script`
  },
  body: JSON.stringify({
    ref,
    inputs: {
      triggered_by: "npm run deploy"
    }
  })
});

if (!response.ok) {
  const details = await safeReadText(response);
  console.error(`Failed to trigger ${workflow} on ${owner}/${repo}@${ref}.`);
  if (details) {
    console.error(details);
  }
  process.exit(1);
}

console.log(`Triggered ${workflow} for ${owner}/${repo}@${ref}.`);
console.log(`Watch it here: ${actionsUrl}`);

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
  try {
    return execSync(`git ${args}`, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return "";
  }
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

async function safeReadText(response) {
  try {
    return await response.text();
  } catch {
    return "";
  }
}
