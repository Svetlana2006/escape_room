# escape_room

Dark, techy, competition-style interactive quiz with an admin dashboard.

## What you get

- Player flow: email → mission brief → 4 locked segments (5 questions each) → timer + hint penalties → early submit option
- Admin flow: operator email → password → dashboard showing who logged in, time (incl. penalties), solved count
- UI: dark “hacker/tech” vibe, floating rules tab, fixed stopwatch top-right, submit button bottom-right

## Requirements

- Node.js 18+ (recommended 20+)
- npm (if PowerShell blocks `npm`, use `npm.cmd`)

## Running (local dev)

1. Install dependencies:
   - `npm.cmd install`
2. Start client + server:
   - `npm.cmd run dev`
   - Open the Vite URL printed in the terminal (usually `http://localhost:5173`).

## Running (productionish)

- Build:
  - `npm.cmd run build`
- Start API server:
  - `npm.cmd run start`

## Deploying

- `npm.cmd run deploy`
- What it does:
  - dispatches the GitHub Actions workflow in [`.github/workflows/deploy-pages-render.yml`](.github/workflows/deploy-pages-render.yml)
  - republishes the client to the `gh-pages` branch, so you can see a fresh run in the GitHub Actions tab
  - triggers Render's deploy hook so the service redeploys the latest commit on its configured branch

### One-time setup

1. Create a local `.env.deploy` file from [`.env.deploy.example`](.env.deploy.example).
2. Put a GitHub token in `DEPLOY_GITHUB_TOKEN`.
   - Classic token: `repo` + `workflow`
   - Fine-grained token: repository access with Actions write permission
3. In your GitHub repo settings, add an Actions secret named `RENDER_DEPLOY_HOOK_URL` with your Render deploy hook URL.

After that, every `npm.cmd run deploy` call will create a new workflow run in GitHub Actions and then ask Render to redeploy the latest pushed commit.
