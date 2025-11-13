import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6 bg-background">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2
          className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-8"
          data-testid="text-about-title"
        >
          Our Story
        </h2>

        <div className="space-y-6 text-foreground/80 leading-relaxed">
          <p className="text-lg md:text-xl">
            At BizedExclusive, we believe that menswear is more than clothing—it
            is an art form, a statement of identity, and a celebration of
            heritage. Each piece in our collection is meticulously crafted to
            embody the perfect fusion of traditional Nigerian elegance and
            contemporary luxury tailoring.
          </p>

          <p className="text-lg md:text-xl">
            Our designer brings over a decade of experience in haute couture menswear,
            drawing inspiration from the rich cultural tapestry of Nigeria while
            embracing modern tailoring principles. Every stitch tells a story,
            every fabric choice reflects excellence, and every creation is a
            testament to our commitment to unparalleled quality for the discerning gentleman.
          </p>

          <p className="text-lg md:text-xl font-serif text-primary italic">
            "Where tradition meets innovation, and elegance becomes timeless."
          </p>
        </div>
      </motion.div>
    </section>
  );
}
