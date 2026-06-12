# Ivy Jiyou Lee — Portfolio V1

React + Vite + Tailwind CSS 4 + Framer Motion. One-page glassmorphic portfolio.

## Deploy in 10 minutes

```bash
# 1. unzip and check locally
cd ivy-portfolio
npm install
npm run dev        # opens http://localhost:5173

# 2. push to GitHub (create a PUBLIC repo named ivy-portfolio first on github.com)
git init
git add -A
git commit -m "portfolio v1"
git remote add origin https://github.com/YOUR_USERNAME/ivy-portfolio.git
git branch -M main
git push -u origin main
```

3. Go to **vercel.com → Add New → Project → Import** `ivy-portfolio`.
   Framework preset auto-detects **Vite**. Click **Deploy**. Done.

4. URL: Vercel gives `ivy-portfolio-xxx.vercel.app`.
   For a clean URL: Project **Settings → General → Project Name** → rename to
   `ivyjiyoulee` → URL becomes `ivyjiyoulee.vercel.app`.

## Assets to drop into /public (site works without them, but add ASAP)

| File | What |
|---|---|
| `bubble.png` | Holographic bubble (export from Figma hero, PNG, transparent) |
| `polaroid1.jpg` | Main photo (front polaroid) |
| `polaroid2.jpg` | LikeLion / grad photo |
| `polaroid3.jpg` | Lifestyle photo |
| `covers/icoi.png` | Work covers, 592x360-ish, white-bg mockups |
| `covers/lattelearn.png` | " |
| `covers/roomietask.png` | " |
| `covers/designathon.png` | " |
| `covers/99divine.png` | " |
| `covers/prime.png` | " |
| `resume.pdf` | Already included (designer version) — replace when URL is added |

Missing images hide gracefully (cards show a label, bubble just doesn't render).
After dropping files: `git add -A && git commit -m "assets" && git push` → Vercel auto-redeploys.

## Where things live

- All content/data: top of `src/App.jsx` (PROJECTS, BIO, LINKS arrays)
- Design tokens: `src/index.css` (@theme block)
- Case study pages: V1.1 — cards currently show "CASE STUDY SOON"
