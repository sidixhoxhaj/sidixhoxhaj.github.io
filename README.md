# Sidi Xhoxhaj Portfolio

Personal portfolio website built with Vue 3 + Vite, with a Payload CMS (SQLite) for content management.

## Project structure

```
/
├── src/              # Vue 3 frontend
├── cms/              # Payload CMS (Next.js)
├── scripts/          # Export & sprite generation scripts
├── public/           # Static assets & icon sprite
└── src/data/         # Generated JSON from CMS export
```

## Requirements

- Node.js 18+
- npm 9+

## Setup

### 1. Install dependencies

```bash
# Frontend
npm install

# CMS
cd cms && npm install
```

### 2. Create the `.env` file

Create a `.env` file inside the `cms/` folder:

```env
PAYLOAD_SECRET=your-random-secret-string
DATABASE_URL=file:./cms/database.db
```

> `PAYLOAD_SECRET` can be any random string. Generate one with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
> ```

### 3. Generate the icon sprite

```bash
npm run sprite
```

---

## Running the frontend

```bash
npm run dev
```

Runs on `http://localhost:5173`

---

## Running the CMS

```bash
cd cms && npm run dev
```

Runs on `http://localhost:3000/admin`

On first run, Payload will automatically create the SQLite database and prompt you to create an admin user.

---

## Exporting CMS content to the frontend

After updating content in the CMS, run:

```bash
cd cms && npm run export
```

This generates `src/data/about.json` and `src/data/portfolio.json` which the Vue app reads statically.

---

## Build

```bash
npm run build
```

---

## Author

Sidi Xhoxhaj
- [LinkedIn](https://www.linkedin.com/in/sidixhoxhaj)
- [GitHub](https://github.com/sidixhoxhaj)
