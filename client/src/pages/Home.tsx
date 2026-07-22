import Hero from "@/components/Hero";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BizedExclusive",
    "image": "/bizedLogo.jpg",
    "description": "Luxury Nigerian menswear designer creating elegant, bespoke suits and formal attire for men.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressCountry": "NG"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="BizedExclusive - Luxury Nigerian Menswear Designer"
        description="Elegance in every stitch. Discover exquisite handcrafted menswear from Nigeria's premier luxury designer."
        schema={businessSchema}
      />
      <Navigation onNavigate={scrollToSection} />
      <Hero onViewCollection={() => scrollToSection("gallery")} />
      <About />
      <Founder />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

