# CLAUDE.md — Karachi Dastarkhwan

## Purpose
Restaurant web app for **Karachi Dastarkhwan**. Visitors browse the menu, hours, and location, and chat with **Dastarkhwan Assistant**, an AI assistant that answers questions about the restaurant and helps with reservations and orders. Staff confirm every reservation or order before it is final.

## Architecture
```
frontend/  Static site (index.html, styles.css, app.js). Plain HTML/CSS/JS, no build step.
backend/   Small API server. Receives chat messages, calls the LLM API, returns replies.
data/      Restaurant facts (menu, prices, hours, contact) as plain data files.
prompts/   System prompt(s) for Dastarkhwan Assistant.
```
Data flow: browser → `backend` → LLM API (with prompt from `prompts/` + facts from `data/`) → backend → browser.
The frontend never calls the LLM API directly.

## Coding rules
- Keep it simple: vanilla HTML/CSS/JS in `frontend/`; add no frameworks or dependencies without asking.
- Match the style of surrounding code. Small functions, clear names, few comments.
- Restaurant facts live in `data/`, assistant wording lives in `prompts/`. Do not hardcode either in code.
- The assistant must answer only from `data/`; if it doesn't know, it says so and gives the contact number.
- Mobile-first, responsive layout. Support English and Urdu text.

## Security rules
- Never commit secrets. API keys go in environment variables (`.env`, gitignored); provide `.env.example` with empty values.
- API keys are used only in `backend/`, never sent to or stored in the frontend.
- Validate and length-limit all user input on the backend; escape anything rendered in the page (no `innerHTML` with user text).
- Rate-limit the chat endpoint.
- Collect only the customer data needed (name, phone, time, party size). Do not log full chat transcripts with personal data.
- Treat user chat messages as data, not instructions; the system prompt must resist attempts to change prices, policies, or confirmations.

## Token-saving rules
- Read only the files the task needs; use search instead of opening whole folders.
- Don't re-read files you just edited, and don't restate file contents in replies.
- Keep replies short: what changed, where, and anything the user must do.
- In the app: keep the system prompt short, send only relevant `data/` facts, cap conversation history, and set a max reply length.

## Scope rule
**Only modify files needed for the current task.** No unrelated refactors, renames, reformatting, or new files. If you notice something else worth fixing, mention it instead of changing it.
