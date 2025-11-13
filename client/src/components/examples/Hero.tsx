import Hero from "../Hero";

export default function HeroExample() {
  const handleViewCollection = () => {
    console.log("View Collection clicked");
  };

  return <Hero onViewCollection={handleViewCollection} />;
}
