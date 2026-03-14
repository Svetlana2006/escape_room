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
1) Install dependencies:
   - `npm.cmd install`

2) Create server env file (never commit secrets):
   - `Copy-Item server/.env.example server/.env`
   - Edit `server/.env`:
     - Set `JWT_SECRET` (16+ chars)
     - Set `ADMIN_EMAIL` (the email that should trigger the admin password prompt)
     - Set `ADMIN_PASSWORD_SALT` and `ADMIN_PASSWORD_HASH`:
       - `npm.cmd -w server run hash:admin -- --password "<your-admin-password>"`
       - Paste the printed values into `server/.env`

3) Start client + server:
   - `npm.cmd run dev`
   - Open the Vite URL printed in the terminal (usually `http://localhost:5173`).

## Running (production-ish)
- Build:
  - `npm.cmd run build`
- Start API server:
  - `npm.cmd run start`

## Deploy notes
- The frontend can be hosted on GitHub Pages (static).
  - Build with a base path: `BASE_PATH="/<your-repo-name>/" npm.cmd -w client run build`
  - Deploy `client/dist` to Pages.
- The backend must be hosted separately (Render/Fly.io/Railway/etc.).
  - Set `CORS_ORIGIN` to your GitHub Pages origin.
  - If you are not proxying `/api`, build the client with `VITE_API_BASE_URL` pointing at your backend.

## Security notes
- The admin password is never stored in this repo; only a salted hash is kept in `server/.env`.
- Keep `ADMIN_EMAIL` + your admin password private; only share the player URL for the competition.

## Content
- Decoy questions + SVG “decoy images” are defined in `server/src/quiz.ts`.

