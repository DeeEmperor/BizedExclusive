import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
const heroImage ="/assets/IMG_6264.JPG"; 

interface HeroProps {
  onViewCollection: () => void;
}

export default function Hero({ onViewCollection }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            BizedExclusive
          </h1>
          <p className="font-serif text-2xl md:text-4xl text-primary mb-8 italic">
            Elegance in Every Stitch
          </p>
          <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Luxury Nigerian menswear crafted with precision, passion, and
            cultural excellence
          </p>

          <Button
            size="lg"
            onClick={onViewCollection}
            data-testid="button-view-collection"
            className="bg-primary/10 backdrop-blur-md border-2 border-primary text-white hover:bg-primary/20 text-base font-medium uppercase tracking-wider px-8 py-6"
          >
            View Collection
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
