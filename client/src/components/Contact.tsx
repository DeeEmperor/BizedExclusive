import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Instagram, Phone } from "lucide-react";

interface ContactIconProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  index: number;
}

function ContactIcon({ icon, label, href, index }: ContactIconProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
      }
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.1 }}
      className="flex flex-col items-center gap-4 group"
      data-testid={`link-contact-${label.toLowerCase()}`}
    >
      <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] group-hover:bg-primary/10">
        {icon}
      </div>
      <span className="text-foreground font-medium">{label}</span>
    </motion.a>
  );
}

export default function Contact() {
  const contacts = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      label: "WhatsApp",
      href: "https://wa.me/2348060043087",
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      label: "Instagram",
      href: "https://instagram.com/bizedexclusive",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      label: "Call Us",
      href: "tel:+2348060043087",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6"
            data-testid="text-contact-title"
          >
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Ready to create something beautiful? We'd love to hear from you
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-16 mb-12">
          {contacts.map((contact, index) => (
            <ContactIcon key={index} {...contact} index={index} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-xl text-primary italic"
          data-testid="text-contact-message"
        >
          Let's create something beautiful together
        </motion.p>
      </div>
    </section>
  );
}
