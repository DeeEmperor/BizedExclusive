import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  app.get("/api/outfits", async (_req, res) => {
    try {
      const outfits = await storage.getOutfits();
      res.json(outfits);
    } catch (error) {
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
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
