import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  index: number;
}

function TestimonialCard({ quote, author, index }: TestimonialCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }
      }
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card
        className="h-full"
        data-testid={`card-testimonial-${index}`}
      >
        <CardContent className="p-8 space-y-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-primary text-primary"
                data-testid={`icon-star-${index}-${i}`}
              />
            ))}
          </div>

          <p className="text-foreground/80 text-lg leading-relaxed italic">
            "{quote}"
          </p>

          <p
            className="text-primary font-serif text-lg font-semibold"
            data-testid={`text-author-${index}`}
          >
            — {author}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "BizedExclusive transformed my vision into reality. The attention to detail and craftsmanship is unmatched. I felt like royalty at my wedding!",
      author: "Chukwudi O.",
    },
    {
      quote:
        "The perfect blend of Nigerian heritage and modern luxury tailoring. Every piece tells a story and the quality speaks for itself. Absolutely exceptional.",
      author: "Adebayo N.",
    },
    {
      quote:
        "I've never received so many compliments on a suit. The fit, the craftsmanship, the attention to detail—BizedExclusive is truly in a class of its own.",
      author: "Emeka A.",
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4"
            data-testid="text-testimonials-title"
          >
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Stories of elegance, confidence, and unforgettable moments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
