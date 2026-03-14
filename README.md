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

## Running (production-ish)

- Build:
  - `npm.cmd run build`
- Start API server:
  - `npm.cmd run start`
