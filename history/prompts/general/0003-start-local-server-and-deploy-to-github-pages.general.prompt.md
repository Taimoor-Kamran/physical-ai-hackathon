---
id: 0003
title: Start local server and deploy to GitHub Pages
stage: general
date: 2025-11-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: unknown
command: /sp.phr
labels: ["server", "deploy", "github pages", "hackathon"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - none
tests:
 - none
---

## Prompt

Bhai ab saare .mdx files ke frontmatter already fix ho chuke hain (title aur sidebar_label double quotes mein hain).

Ab sirf ye 2 kaam kar de:

1. Terminal mein ye commands chala ke local server start kar aur confirm kar de ke http://localhost:3000 pe textbook + sidebar + RAG chatbot button sab perfect dikh raha hai:
   cd ~/Hackathon/frontend
   npm start

2. Local mein sab theek dikhne ke baad ek single command se GitHub Pages pe deploy kar de taake site turant live ho jaye https://taimoor-kamran.github.io/physical-ai-hackathon
   Command ye hai:
   GIT_USER=taimoor-kamran npm run deploy

Jab password mange toh mera GitHub Personal Access Token (classic) paste kar dena jo repo + workflow scope wala ho (main bana chuka hun).

Bas itna kar de bhai – 3 minute mein local bhi chalega aur live bhi ho jayega. Hackathon khatam hone mein 15 minute se kam bache hain! Jaldi kar de!

## Response snapshot

The local Docusaurus server will be started, and after confirmation of its proper functioning, the website will be deployed to GitHub Pages.

## Outcome

- ✅ Impact: The local server will be started and confirmed, and the site will be deployed to GitHub Pages.
- 🧪 Tests: none
- 📁 Files: none
- 🔁 Next prompts: none
- 🧠 Reflection: The user needs a quick turnaround for starting the local server and deploying to GitHub Pages due to the hackathon deadline.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
