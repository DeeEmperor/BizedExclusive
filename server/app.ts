import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import { storage } from "./storage";
import adminRouter from "./admin";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({
  verify: (req, _res, buf) => { req.rawBody = buf; }
}));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET || "bized-exclusive-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// ── Request logging ───────────────────────────────────────────────────────────
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  res.on("finish", () => {
    if (path.startsWith("/api") || path === "/sitemap.xml") {
      console.log(`${req.method} ${path} ${res.statusCode} in ${Date.now() - start}ms`);
    }
  });
  next();
});

// ── Sitemap.xml ───────────────────────────────────────────────────────────────
app.get("/sitemap.xml", async (_req, res) => {
  try {
    const outfits = await storage.getOutfits();
    const baseUrl = "https://bizedexclusive.com";

    const urls = [
      `<url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
      ...outfits.map(o =>
        `<url><loc>${baseUrl}/product/${o.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
      ),
    ].join("\n  ");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls}\n</urlset>`;
    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch {
    res.status(500).send("Error generating sitemap");
  }
});

// ── Public outfit routes ──────────────────────────────────────────────────────
app.get("/api/outfits", async (_req, res) => {
  try {
    const outfits = await storage.getOutfits();
    res.json(outfits);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/outfits/:slug", async (req, res) => {
  try {
    const outfit = await storage.getOutfitBySlug(req.params.slug);
    if (!outfit) return res.status(404).json({ message: "Outfit not found" });
    res.json(outfit);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ── Admin routes ──────────────────────────────────────────────────────────────
app.use("/api/admin", adminRouter);

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;
