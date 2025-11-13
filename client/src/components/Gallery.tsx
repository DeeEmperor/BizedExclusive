import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import whiteGown from "@assets/generated_images/White_evening_gown_gold_57609cde.png";
import blackDress from "@assets/generated_images/Black_cocktail_dress_elegant_d2eeafd6.png";
import goldFormal from "@assets/generated_images/Gold_traditional_formal_wear_e13f60b1.png";
import emeraldGown from "@assets/generated_images/Emerald_gown_gold_details_bfc3e987.png";
import burgundyDress from "@assets/generated_images/Burgundy_formal_dress_luxury_0b4c53a5.png";
import creamEnsemble from "@assets/generated_images/Cream_gold_ensemble_elegant_0dc4cf37.png";
import navyGown from "@assets/generated_images/Navy_gown_gold_embroidery_66ff0111.png";
import blushGown from "@assets/generated_images/Blush_pink_gown_elegant_6d7fe32c.png";

interface OutfitCardProps {
  image: string;
  name: string;
  description: string;
  index: number;
}

function OutfitCard({ image, name, description, index }: OutfitCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleOrder = () => {
    const message = encodeURIComponent(`Hi! I'm interested in the ${name}.`);
    const whatsappNumber = "2348000000000";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        className="group overflow-hidden hover-elevate transition-all duration-300"
        data-testid={`card-outfit-${index}`}
      >
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6 space-y-4">
          <h3
            className="font-serif text-xl md:text-2xl font-semibold text-foreground"
            data-testid={`text-outfit-name-${index}`}
          >
            {name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          <Button
            onClick={handleOrder}
            data-testid={`button-order-${index}`}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium uppercase tracking-wide"
          >
            Order Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Gallery() {
  const outfits = [
    {
      image: whiteGown,
      name: "Ivory Elegance",
      description:
        "A breathtaking white evening gown with delicate gold accents, perfect for grand occasions.",
    },
    {
      image: blackDress,
      name: "Midnight Grace",
      description:
        "Sophisticated black cocktail dress featuring subtle gold threading for timeless appeal.",
    },
    {
      image: goldFormal,
      name: "Golden Heritage",
      description:
        "Traditional Nigerian-inspired formal attire reimagined with modern luxury and intricate detailing.",
    },
    {
      image: emeraldGown,
      name: "Emerald Majesty",
      description:
        "Stunning emerald green evening gown adorned with gold embellishments for regal presence.",
    },
    {
      image: burgundyDress,
      name: "Burgundy Royale",
      description:
        "Luxurious burgundy formal dress with gold accents, embodying sophistication and elegance.",
    },
    {
      image: creamEnsemble,
      name: "Cream Couture",
      description:
        "Elegant two-piece ensemble in cream and gold, showcasing premium tailoring and design.",
    },
    {
      image: navyGown,
      name: "Navy Opulence",
      description:
        "Timeless navy blue evening gown featuring exquisite gold embroidery and refined silhouette.",
    },
    {
      image: blushGown,
      name: "Blush Romance",
      description:
        "Delicate blush pink gown with gold accents, perfect for making a graceful statement.",
    },
  ];

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
            Discover our exclusive range of handcrafted luxury pieces, each
            designed to make you feel extraordinary
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {outfits.map((outfit, index) => (
            <OutfitCard key={index} {...outfit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
