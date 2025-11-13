import Navigation from "../Navigation";

export default function NavigationExample() {
  const handleNavigate = (section: string) => {
    console.log(`Navigate to: ${section}`);
  };

  return <Navigation onNavigate={handleNavigate} />;
}
