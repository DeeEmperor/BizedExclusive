import { type User, type InsertUser, type Outfit, type InsertOutfit } from "../shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export type UpdateOutfit = Partial<InsertOutfit>;

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getOutfits(): Promise<Outfit[]>;
  getOutfitBySlug(slug: string): Promise<Outfit | undefined>;
  getOutfitById(id: string): Promise<Outfit | undefined>;
  createOutfit(outfit: InsertOutfit): Promise<Outfit>;
  updateOutfit(id: string, data: UpdateOutfit): Promise<Outfit | undefined>;
  deleteOutfit(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private outfits: Map<string, Outfit>;

  constructor() {
    this.users = new Map();
    this.outfits = new Map();
    this.seedOutfits();
  }

  private seedOutfits() {
    const initialOutfits = [
      { name: "Elegant vintage shirt", slug: "elegant-vintage-shirt", description: "A well tailored vintage shirt that exudes sophistication and style.", image: "/assets/IMG_0045.jpg", price: 1500000, currency: "NGN" },
      { name: "Classic Attire", slug: "classic-attire", description: "A classic style for the modern and classy gentleman.", image: "/assets/IMG_0050.jpg", price: 2000000, currency: "NGN" },
      { name: "Embroidered Two Piece", slug: "embroidered-two-piece", description: "Sharp business and embroidered attire designed for the gentle man who values both style and comfort at any location.", image: "/assets/IMG_1182.jpg", price: 2500000, currency: "NGN" },
      { name: "Distinguished Agbada", slug: "distinguished-agbada", description: "A distinguished ensemble that makes a powerful statement at any traditional gathering.", image: "/assets/IMG_1191.jpg", price: 4500000, currency: "NGN" },
      { name: "2 Colored Fìlà Gọ̀bì", slug: "2-colored-fila-gobi", description: "Your stylish and captivating trad cap for the outstanding gentleman", image: "/assets/IMG_2331.jpg", price: 350000, currency: "NGN" },
      { name: "Executive Collection", slug: "executive-collection", description: "Premium executive wear designed for leaders who command attention with their impeccable style.", image: "/assets/IMG_3257.jpg", price: 3000000, currency: "NGN" },
      { name: "Stylish Embroidery", slug: "stylish-embroidery", description: "A perfect blend of style and professionalism with embroidered attire.", image: "/assets/IMG_4119.jpg", price: 2800000, currency: "NGN" },
      { name: "Classic Business Attire", slug: "classic-business-attire", description: "Classy business wear that never goes out of style, perfect for making a lasting impression.", image: "/assets/IMG_4457.jpg", price: 2200000, currency: "NGN" },
      { name: "Multi-colored Fìlà", slug: "multi-colored-fila", description: "High-end cap that showcases exceptional craftsmanship and attention to detail.", image: "/assets/IMG_1023.JPEG", price: 400000, currency: "NGN" },
      { name: "Casual Attire", slug: "casual-attire", description: "Sharp and casual look that steals the show at any outdoor event", image: "/assets/IMG_1257.JPG", price: 1800000, currency: "NGN" },
      { name: "Executive Presence", slug: "executive-presence", description: "Command attention with this executive look that blends authority with modern style.", image: "/assets/IMG_1557.JPG", price: 3200000, currency: "NGN" },
      { name: "Modern Business Classic", slug: "modern-business-classic", description: "A contemporary take on classic business attire for the style-conscious professional.", image: "/assets/IMG_1559.JPG", price: 2600000, currency: "NGN" },
      { name: "Distinguished Professional", slug: "distinguished-professional", description: "A look that combines professionalism with distinctive personal style.", image: "/assets/IMG_1979.JPG", price: 2900000, currency: "NGN" },
      { name: "Refined Executive", slug: "refined-executive", description: "Exemplary executive style that speaks volumes about your attention to detail.", image: "/assets/IMG_1982.JPG", price: 3100000, currency: "NGN" },
      { name: "Classic Sophistication", slug: "classic-sophistication", description: "Timeless elegance that never goes out of style, perfect for any formal occasion.", image: "/assets/IMG_4655.JPG", price: 3400000, currency: "NGN" },
      { name: "Professional Elegance", slug: "professional-elegance", description: "A perfect balance of professional polish and sophisticated style.", image: "/assets/IMG_4656.JPG", price: 2700000, currency: "NGN" }
    ];

    initialOutfits.forEach(outfit => {
      const id = randomUUID();
      this.outfits.set(id, { ...outfit, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getOutfits(): Promise<Outfit[]> {
    return Array.from(this.outfits.values());
  }

  async getOutfitBySlug(slug: string): Promise<Outfit | undefined> {
    return Array.from(this.outfits.values()).find(
      (outfit) => outfit.slug === slug
    );
  }

  async getOutfitById(id: string): Promise<Outfit | undefined> {
    return this.outfits.get(id);
  }

  async createOutfit(insertOutfit: InsertOutfit): Promise<Outfit> {
    const id = randomUUID();
    const outfit: Outfit = {
      id,
      name: insertOutfit.name,
      slug: insertOutfit.slug,
      description: insertOutfit.description,
      image: insertOutfit.image,
      price: insertOutfit.price ?? null,
      currency: insertOutfit.currency ?? null,
    };
    this.outfits.set(id, outfit);
    return outfit;
  }

  async updateOutfit(id: string, data: UpdateOutfit): Promise<Outfit | undefined> {
    const existing = this.outfits.get(id);
    if (!existing) return undefined;
    const updated: Outfit = { ...existing, ...data };
    this.outfits.set(id, updated);
    return updated;
  }

  async deleteOutfit(id: string): Promise<boolean> {
    return this.outfits.delete(id);
  }
}

export const storage = new MemStorage();
