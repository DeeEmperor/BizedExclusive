import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Upload, LogOut, Lock, Image as ImageIcon, Loader2 } from "lucide-react";
import type { Outfit } from "@shared/schema";

// ── Types ────────────────────────────────────────────────────────────────────

interface OutfitFormData {
  name: string;
  description: string;
  image: string;
  price: string;
  currency: string;
}

const emptyForm: OutfitFormData = {
  name: "",
  description: "",
  image: "",
  price: "",
  currency: "NGN",
};

// ── API helpers ───────────────────────────────────────────────────────────────

async function apiPost(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

async function apiPut(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

async function apiDelete(url: string) {
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

// ── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiPost("/api/admin/login", { password });
      toast({ title: "Welcome back!", description: "Logged in successfully." });
      onLogin();
    } catch {
      setError("Incorrect password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border border-zinc-800 bg-zinc-950/80 backdrop-blur-lg shadow-2xl">
          <CardHeader className="text-center pb-2 pt-10">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="font-serif text-3xl text-white">Admin Portal</CardTitle>
            <p className="text-zinc-400 text-sm mt-1">BizedExclusive Dashboard</p>
          </CardHeader>
          <CardContent className="px-8 pb-10 pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm text-zinc-300 font-medium">Admin Password</label>
                <Input
                  type="password"
                  placeholder="Enter your admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-primary"
                  required
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm bg-red-950/30 border border-red-800/40 rounded px-3 py-2">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold uppercase tracking-wider"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ── Image Upload Field ────────────────────────────────────────────────────────

function ImageUploadField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const { toast } = useToast();

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      onChange(url);
      toast({ title: "Image uploaded!", description: url });
    } catch {
      toast({ title: "Upload failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm text-zinc-300 font-medium">Outfit Image</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
          dragging ? "border-primary bg-primary/5" : "border-zinc-700 hover:border-zinc-500"
        }`}
      >
        {value ? (
          <div className="relative group">
            <img
              src={value}
              alt="Preview"
              className="w-full h-48 object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <p className="text-white text-sm font-medium flex items-center gap-2">
                <Upload className="w-4 h-4" /> Change Image
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-zinc-500">
            {uploading ? (
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            ) : (
              <>
                <ImageIcon className="w-8 h-8" />
                <p className="text-sm text-center">
                  <span className="text-primary font-medium">Click to upload</span> or drag & drop
                  <br />
                  <span className="text-xs">JPG, PNG, WEBP up to 20MB</span>
                </p>
              </>
            )}
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }}
        />
      </div>
      {/* Manual URL fallback */}
      <Input
        placeholder="Or paste an image URL…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
      />
    </div>
  );
}

// ── Outfit Form Modal ─────────────────────────────────────────────────────────

function OutfitModal({
  open,
  onClose,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  editing: Outfit | null;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState<OutfitFormData>(emptyForm);

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        description: editing.description,
        image: editing.image,
        price: editing.price ? String(editing.price / 100) : "",
        currency: editing.currency || "NGN",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editing, open]);

  const set = (field: keyof OutfitFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const createMutation = useMutation({
    mutationFn: (data: unknown) => apiPost("/api/admin/outfits", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outfits"] });
      toast({ title: "Outfit added!", description: `${form.name} is now in the collection.` });
      onClose();
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: unknown) => apiPut(`/api/admin/outfits/${editing!.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outfits"] });
      toast({ title: "Outfit updated!" });
      onClose();
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      image: form.image,
      price: form.price ? Math.round(parseFloat(form.price) * 100) : null,
      currency: form.currency,
    };
    editing ? updateMutation.mutate(payload) : createMutation.mutate(payload);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {editing ? "Edit Outfit" : "Add New Outfit"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="space-y-2">
            <label className="text-sm text-zinc-300 font-medium">Name *</label>
            <Input
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. Distinguished Agbada"
              required
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-300 font-medium">Description *</label>
            <Textarea
              value={form.description}
              onChange={set("description")}
              placeholder="Describe the outfit..."
              required
              rows={3}
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
            />
          </div>

          <ImageUploadField value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-zinc-300 font-medium">Price</label>
              <Input
                type="number"
                value={form.price}
                onChange={set("price")}
                placeholder="e.g. 15000"
                min={0}
                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-300 font-medium">Currency</label>
              <select
                value={form.currency}
                onChange={set("currency")}
                className="w-full h-10 rounded-md border border-zinc-700 bg-zinc-900 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 text-black font-semibold"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {editing ? "Save Changes" : "Add Outfit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Admin Dashboard ──────────────────────────────────────────────────────

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Outfit | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Outfit | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Check existing session on mount
  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.isAdmin))
      .catch(() => setIsAdmin(false));
  }, []);

  const { data: outfits = [], isLoading } = useQuery<Outfit[]>({
    queryKey: ["outfits"],
    queryFn: async () => {
      const r = await fetch("/api/outfits");
      return r.json();
    },
    enabled: isAdmin === true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiDelete(`/api/admin/outfits/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outfits"] });
      toast({ title: "Outfit deleted." });
      setDeleteTarget(null);
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAdmin(false);
  };

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (o: Outfit) => { setEditing(o); setModalOpen(true); };

  // Still checking session
  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <LoginScreen onLogin={() => setIsAdmin(true)} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SEO title="Admin Dashboard | BizedExclusive" description="Admin panel" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">BizedExclusive</h1>
            <p className="text-zinc-400 text-xs">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={openAdd} className="bg-primary text-black hover:bg-primary/90 font-semibold gap-2">
              <Plus className="w-4 h-4" /> Add Outfit
            </Button>
            <Button variant="outline" onClick={handleLogout} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Outfits", value: outfits.length },
            { label: "With Prices", value: outfits.filter((o) => o.price).length },
            { label: "Currencies", value: Array.from(new Set(outfits.map((o) => o.currency))).filter(Boolean).join(", ") || "—" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-5">
                <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-white text-2xl font-bold font-serif">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Outfit grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {outfits.map((outfit) => (
                <motion.div
                  key={outfit.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-zinc-600 transition-colors">
                    <div className="relative aspect-[3/4] overflow-hidden bg-zinc-800">
                      {outfit.image ? (
                        <img
                          src={outfit.image}
                          alt={`Admin view of ${outfit.name}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-zinc-600">
                          <ImageIcon className="w-12 h-12" />
                        </div>
                      )}
                      {/* Action overlay */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Button
                          size="sm"
                          onClick={() => openEdit(outfit)}
                          className="bg-white text-black hover:bg-zinc-200 gap-1"
                        >
                          <Pencil className="w-3 h-3" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteTarget(outfit)}
                          className="gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif font-semibold text-white truncate">{outfit.name}</h3>
                      <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{outfit.description}</p>
                      {outfit.price && (
                        <p className="text-primary text-sm font-medium mt-2">
                          {outfit.currency === "NGN" ? "₦" : outfit.currency === "GBP" ? "£" : "$"}
                          {(outfit.price / 100).toLocaleString()}
                        </p>
                      )}
                      <p className="text-zinc-600 text-xs mt-1 font-mono truncate">/product/{outfit.slug}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty state */}
            {outfits.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-zinc-600 gap-4">
                <ImageIcon className="w-16 h-16" />
                <p className="text-lg">No outfits yet.</p>
                <Button onClick={openAdd} className="bg-primary text-black gap-2">
                  <Plus className="w-4 h-4" /> Add your first outfit
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <OutfitModal open={modalOpen} onClose={() => setModalOpen(false)} editing={editing} />

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="bg-zinc-950 border-zinc-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{deleteTarget?.name}"?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This will permanently remove the outfit from your collection. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
