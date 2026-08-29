# BEAN THEORY

Prototype website for **BEAN THEORY**, a specialty cafe at 109, CCA 1, Sector C, DHA Phase 6, Lahore.

Order from the menu, book event tickets, hold a table, and open the exact Google Maps pin. A logo loading screen plays on first load and on every page change.

Live Instagram: [instagram.com/beantheorylhr](https://www.instagram.com/beantheorylhr/)  
Phone / WhatsApp: +92 323 4664878

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:43187](http://localhost:43187) (or the port printed in the terminal).

```bash
npm run build
npm start
```

## What is in this prototype

- Home, menu, web ordering, events/tickets, visit (map + table hold)
- Logo loading screen on reload and route changes
- WhatsApp handoff for orders, tickets, and tables (opens the cafe number)
- Management board at `/manage` — pin is the last four digits of the cafe line: `4878`
- Confirmed / waitlisted / declined ticket statuses for the floor

Orders, tickets, and table holds are stored in the browser for the prototype. Management confirmation is local to that browser until a backend is wired up.

## Menu note

The house menu in the site is a prototype list in PKR so the order flow is usable. Swap it for the official `BT Menu.pdf` items and prices when you have the file in the repo.

## Deploy on Vercel

```bash
npx vercel --prod
```

Or import the GitHub repo in the Vercel dashboard and deploy. No environment variables are required.
