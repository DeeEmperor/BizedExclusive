import { Router, type Request, type Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import type { InsertOutfit } from "@shared/schema";

const adminRouter = Router();

// ── Session-level admin auth ──────────────────────────────────────────────────
// A simple password check against the env variable ADMIN_PASSWORD.
// The session is managed by express-session (already a project dependency).

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

function requireAdmin(req: Request, res: Response, next: () => void) {
  if (req.session?.isAdmin) return next();
  res.status(401).json({ message: "Unauthorized" });
}

// ── POST /api/admin/login ─────────────────────────────────────────────────────
adminRouter.post("/login", (req: Request, res: Response) => {
  const { password } = req.body as { password: string };
  const adminPassword = process.env.ADMIN_PASSWORD || "bized2024admin";

  if (password !== adminPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  req.session.isAdmin = true;
  res.json({ message: "Logged in successfully" });
});

// ── POST /api/admin/logout ────────────────────────────────────────────────────
adminRouter.post("/logout", (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

// ── GET /api/admin/me ─────────────────────────────────────────────────────────
adminRouter.get("/me", (req: Request, res: Response) => {
  res.json({ isAdmin: !!req.session?.isAdmin });
});

// ── File upload configuration (multer) ───────────────────────────────────────
const uploadDir = path.resolve(process.cwd(), "client", "public", "assets");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
               allowed.test(file.mimetype);
    cb(null, ok);
  },
});

// ── POST /api/admin/upload ────────────────────────────────────────────────────
adminRouter.post(
  "/upload",
  requireAdmin,
  upload.single("image"),
  (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const url = `/assets/${req.file.filename}`;
    res.json({ url });
  }
);

// ── POST /api/admin/outfits ───────────────────────────────────────────────────
adminRouter.post("/outfits", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, description, image, price, currency } = req.body as InsertOutfit;

    if (!name || !description || !image) {
      return res.status(400).json({ message: "name, description, and image are required" });
    }

    // Auto-generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    // Check for slug collisions
    const existing = await storage.getOutfitBySlug(slug);
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const outfit = await storage.createOutfit({
      name,
      slug: finalSlug,
      description,
      image,
      price: price ?? null,
      currency: currency ?? "NGN",
    });

    res.status(201).json(outfit);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ── PUT /api/admin/outfits/:id ────────────────────────────────────────────────
adminRouter.put("/outfits/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, image, price, currency } = req.body as Partial<InsertOutfit>;

    const updated = await storage.updateOutfit(id, {
      ...(name && { name }),
      ...(description && { description }),
      ...(image && { image }),
      ...(price !== undefined && { price }),
      ...(currency && { currency }),
    });

    if (!updated) return res.status(404).json({ message: "Outfit not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ── DELETE /api/admin/outfits/:id ─────────────────────────────────────────────
adminRouter.delete("/outfits/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const deleted = await storage.deleteOutfit(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Outfit not found" });
    res.json({ message: "Outfit deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default adminRouter;
