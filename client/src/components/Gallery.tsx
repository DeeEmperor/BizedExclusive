import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import whiteSuit from "@assets/generated_images/White_suit_gold_menswear_40151043.png";
import blackTuxedo from "@assets/generated_images/Black_tuxedo_elegant_menswear_6c2a3cf7.png";
import goldAgbada from "@assets/generated_images/Gold_traditional_menswear_formal_aa3c7731.png";
import emeraldBlazer from "@assets/generated_images/Emerald_blazer_gold_menswear_00c4e7ff.png";
import burgundySuit from "@assets/generated_images/Burgundy_suit_luxury_menswear_4b96f2f9.png";
import creamSafari from "@assets/generated_images/Cream_gold_safari_menswear_3f73dd7b.png";
import navySuit from "@assets/generated_images/Navy_suit_gold_embroidery_e3ca2c01.png";
import charcoalSuit from "@assets/generated_images/Charcoal_suit_elegant_menswear_1527ec1a.png";

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
      image: whiteSuit,
      name: "Ivory Prestige",
      description:
        "Impeccably tailored white suit with subtle gold accents, perfect for grand occasions and celebrations.",
    },
    {
      image: blackTuxedo,
      name: "Midnight Sophistication",
      description:
        "Classic black tuxedo with gold bow tie and pocket square, embodying timeless masculine elegance.",
    },
    {
      image: goldAgbada,
      name: "Golden Heritage",
      description:
        "Traditional Nigerian agbada reimagined with modern luxury tailoring and intricate gold detailing.",
    },
    {
      image: emeraldBlazer,
      name: "Emerald Distinction",
      description:
        "Luxurious emerald green velvet blazer with gold buttons for refined presence and style.",
    },
    {
      image: burgundySuit,
      name: "Burgundy Royale",
      description:
        "Three-piece burgundy suit with gold accessories, perfect for the distinguished gentleman.",
    },
    {
      image: creamSafari,
      name: "Safari Excellence",
      description:
        "Modern safari suit in cream and gold, blending classic design with contemporary sophistication.",
    },
    {
      image: navySuit,
      name: "Navy Authority",
      description:
        "Timeless navy blue suit featuring exquisite gold embroidery on lapels and refined tailoring.",
    },
    {
      image: charcoalSuit,
      name: "Charcoal Distinction",
      description:
        "Sophisticated charcoal grey suit with gold pinstripes, the epitome of modern elegance.",
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
            Discover our exclusive range of handcrafted luxury menswear, each
            piece tailored to make you look and feel extraordinary
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
