import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
const img1 = "/assets/IMG_0045.jpg";
const img2 = "/assets/IMG_0050.jpg";
const img3 = "/assets/IMG_1182.jpg";
const img4 = "/assets/IMG_1191.jpg";
const img5 = "/assets/IMG_2331.jpg";
const img6 = "/assets/IMG_2332.jpg";
const img7 = "/assets/IMG_3257.jpg";
const img8 = "/assets/IMG_4117.jpg";
const img9 = "/assets/IMG_4119.jpg";
const img10 = "/assets/IMG_4457.jpg";
const img11 = "/assets/IMG_1023.JPEG";
const img12 = "/assets/IMG_1257.JPG";
const img13 = "/assets/IMG_1557.JPG";
const img14 = "/assets/IMG_1559.JPG";
const img15 = "/assets/IMG_1979.JPG";
const img16 = "/assets/IMG_1982.JPG";
const img17 = "/assets/IMG_4655.JPG";
const img18 = "/assets/IMG_4656.JPG";

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
      image: img1,
      name: "Elegant vintage shirt",
      description: "A well tailored vintage shirt that exudes sophistication and style.",
    },
    {
      image: img2,
      name: "Classic  Attire",
      description: "A classic style for the modern and classy gentleman.",
    },
    {
      image: img3,
      name: "Embroidered Two Piece",
      description: "Sharp business and embroidered attire designed for the gentle man who values both style and comfort at any location.",
    },
    {
      image: img4,
      name: "Distinguished Agbada",
      description: "A distinguished ensemble that makes a powerful statement at any traditional gathering.",
    },
    {
      image: img5,
      name: "2 Colored Fìlà Gọ̀bì ",
      description: "Your stylish and captivating trad cap for the outstanding gentleman",
    },
    
    {
      image: img7,
      name: "Executive Collection",
      description: "Premium executive wear designed for leaders who command attention with their impeccable style.",
    },
    
    {
      image: img9,
      name: "Stylish Embroidery",
      description: "A perfect blend of style and professionalism with embroidered attire.",
    },
    {
      image: img10,
      name: "Classic Business Attire",
      description: "Classy business wear that never goes out of style, perfect for making a lasting impression.",
    },
    {
      image: img11,
      name: "Multi-colored Fìlà ",
      description: "High-end cap that showcases exceptional craftsmanship and attention to detail.",
    },
    {
      image: img12,
      name: "Casual Attire",
      description: "Sharp and casual look that steals the show at any outdoor event",
    },
    {
      image: img13,
      name: "Executive Presence",
      description: "Command attention with this executive look that blends authority with modern style.",
    },
    {
      image: img14,
      name: "Modern Business Classic",
      description: "A contemporary take on classic business attire for the style-conscious professional.",
    },
    {
      image: img15,
      name: "Distinguished Professional",
      description: "A look that combines professionalism with distinctive personal style.",
    },
    {
      image: img16,
      name: "Refined Executive",
      description: "Exemplary executive style that speaks volumes about your attention to detail.",
    },
    {
      image: img17,
      name: "Classic Sophistication",
      description: "Timeless elegance that never goes out of style, perfect for any formal occasion.",
    },
    {
      image: img18,
      name: "Professional Elegance",
      description: "A perfect balance of professional polish and sophisticated style.",
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
