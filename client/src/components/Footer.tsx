export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-primary text-sm md:text-base" data-testid="text-copyright">
          © {currentYear} BizedExclusive. All rights reserved.
        </p>
        <p className="text-primary/80 text-xs md:text-sm mt-2">
          Luxury Nigerian Fashion Design
        </p>
      </div>
    </footer>
  );
}
