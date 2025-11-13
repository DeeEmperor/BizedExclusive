import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import founderImage from "@assets/generated_images/Founder_professional_portrait_elegant_948eace6.png";

export default function Founder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founder" className="py-24 px-6 bg-card">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2
          className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-16 text-center"
          data-testid="text-founder-title"
        >
          Meet the Founder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg">
                <span className="font-serif text-2xl text-primary font-semibold block mb-2">
                  Bisi Adeyemi
                </span>
                <span className="text-muted-foreground text-base italic">
                  Creative Director & Founder
                </span>
              </p>

              <p className="text-base md:text-lg">
                With over 15 years of experience in haute couture, Bisi Adeyemi
                has become one of Nigeria's most celebrated fashion designers.
                Her journey began in Lagos, where she discovered her passion for
                blending traditional African aesthetics with contemporary luxury
                design.
              </p>

              <p className="text-base md:text-lg">
                Trained at the prestigious Parsons School of Design in New York
                and having worked with renowned fashion houses in Paris and
                Milan, Bisi returned to Nigeria with a vision: to create a
                luxury brand that celebrates African heritage while setting new
                standards in global fashion.
              </p>

              <p className="text-base md:text-lg">
                Every piece from BizedExclusive bears her signature touch—meticulous
                attention to detail, innovative use of premium fabrics, and an
                unwavering commitment to making every client feel extraordinary.
              </p>

              <p className="text-base md:text-lg font-serif text-primary italic">
                "Fashion is not just about what you wear—it's about how you feel,
                the stories you tell, and the legacy you create."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 md:order-2"
          >
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-md">
                <img
                  src={founderImage}
                  alt="Bisi Adeyemi, Founder of BizedExclusive"
                  className="w-full h-full object-cover"
                  data-testid="img-founder"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary rounded-md -z-10" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
