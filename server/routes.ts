import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import adminRouter from "./admin";

export async function registerRoutes(app: Express): Promise<Server> {

  // ── Session middleware ─────────────────────────────────────────────────────
  app.use(session({
    secret: process.env.SESSION_SECRET || "bized-exclusive-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  }));

  // ── Sitemap.xml ───────────────────────────────────────────────────────────
  // Must be before the Vite catch-all handler. Returns valid XML to Google.
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

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch {
      res.status(500).send("Error generating sitemap");
    }
  });

  // ── Public outfit routes ───────────────────────────────────────────────────
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
      if (!outfit) {
        return res.status(404).json({ message: "Outfit not found" });
      }
      res.json(outfit);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ── Admin routes ───────────────────────────────────────────────────────────
  app.use("/api/admin", adminRouter);

  const httpServer = createServer(app);
  return httpServer;
}
