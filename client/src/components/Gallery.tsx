import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OUTFITS, type StaticOutfit } from "@/data/outfits";

interface OutfitCardProps {
  outfit: StaticOutfit;
  index: number;
}

function OutfitCard({ outfit, index }: OutfitCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(`Hi! I'm interested in the ${outfit.name}.`);
    const whatsappNumber = "2348060043087";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/product/${outfit.slug}`}>
        <a className="block group">
          <Card
            className="overflow-hidden hover-elevate transition-all duration-300 h-full"
            data-testid={`card-outfit-${index}`}
          >
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={outfit.image}
                alt={`Model wearing ${outfit.name} — BizedExclusive luxury menswear`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6 space-y-4">
              <h3
                className="font-serif text-xl md:text-2xl font-semibold text-foreground"
                data-testid={`text-outfit-name-${index}`}
              >
                {outfit.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                {outfit.description}
              </p>
              <Button
                onClick={handleOrder}
                data-testid={`button-order-${index}`}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium uppercase tracking-wide relative z-10"
              >
                Order Now
              </Button>
            </CardContent>
          </Card>
        </a>
      </Link>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4"
            data-testid="text-gallery-title"
          >
            Our Collection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our exclusive range of handcrafted luxury menswear, each
            piece tailored to make you look and feel extraordinary
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {OUTFITS.map((outfit, index) => (
            <OutfitCard key={outfit.id} outfit={outfit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

