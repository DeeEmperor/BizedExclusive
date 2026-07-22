import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import type { Outfit } from "@shared/schema";

export default function Product() {
  const [, params] = useRoute("/product/:slug");
  const slug = params?.slug;

  const { data: outfit, isLoading, error } = useQuery<Outfit>({
    queryKey: ["outfit", slug],
    queryFn: async () => {
      const response = await fetch(`/api/outfits/${slug}`);
      if (!response.ok) {
        throw new Error("Outfit not found");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center p-6">
          <Skeleton className="w-[400px] h-[500px]" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !outfit) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <h1 className="text-2xl text-destructive font-serif">Product not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const handleOrder = () => {
    const message = encodeURIComponent(`Hi! I'm interested in the ${outfit.name}.`);
    const whatsappNumber = "2348060043087";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  // Structured Data for the Product
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": outfit.name,
    "image": [
      outfit.image
    ],
    "description": outfit.description,
    "sku": outfit.slug,
    "offers": {
      "@type": "Offer",
      "url": typeof window !== "undefined" ? window.location.href : "",
      "priceCurrency": outfit.currency || "NGN",
      "price": outfit.price ? (outfit.price / 100).toFixed(2) : "0.00",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title={`${outfit.name} | BizedExclusive`}
        description={outfit.description}
        image={outfit.image}
      />
      
      {/* Inject Structured Data directly into the DOM per user instruction */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <Navigation />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden bg-muted shadow-lg aspect-[3/4]">
            <img 
              src={outfit.image} 
              alt={`Luxury ${outfit.name} tailored by BizedExclusive`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-8">
            <div>
              {/* Product name strictly wrapped in h1 */}
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                {outfit.name}
              </h1>
              {outfit.price && (
                <p className="text-2xl text-primary font-medium">
                  {outfit.currency === "NGN" ? "₦" : "$"}{(outfit.price / 100).toLocaleString()}
                </p>
              )}
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {outfit.description}
            </p>
            
            <Button 
              size="lg" 
              onClick={handleOrder}
              className="w-full sm:w-auto text-lg px-12 py-6 uppercase tracking-wider"
            >
              Order via WhatsApp
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
