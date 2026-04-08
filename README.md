# escape_room

Dark, techy, competition-style interactive quiz with an admin dashboard.

## What you get

-  Player flow: email → mission brief → 4 locked segments (5 questions each) → timer + hint penalties → early submit option
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
  - republishes the client to the `gh-pages` branch
  - triggers the GitHub Actions workflow in [`.github/workflows/deploy-pages-render.yml`](.github/workflows/deploy-pages-render.yml) when that branch update lands, so you can see a fresh run in the Actions tab
  - posts to Render's deploy hook so the connected service redeploys the latest commit on its configured branch

### One-time setup

1. Create a local `.env.deploy` file from [`.env.deploy.example`](.env.deploy.example).
2. Put your Render deploy hook URL into `RENDER_DEPLOY_HOOK_URL`.
3. Commit and push [`.github/workflows/deploy-pages-render.yml`](.github/workflows/deploy-pages-render.yml) once so GitHub knows about the workflow.

After that, every `npm.cmd run deploy` call will republish `gh-pages`, create a visible workflow run in GitHub Actions from the `gh-pages` push, and ask Render to redeploy.
