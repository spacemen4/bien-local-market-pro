import { Button } from "@/components/ui/button";
import { Menu, Building2 } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-gradient-glass-light dark:bg-gradient-glass-dark backdrop-blur-glass border-b border-white/20 dark:border-white/10 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3 group">
          <Building2 className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-12deg]" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ÉtatLux
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {[
            { href: "/#features", label: "Fonctionnalités" },
            { href: "/#demo", label: "Démo" },
            { href: "/#pricing", label: "Tarifs" },
            { href: "/#testimonials", label: "Témoignages" },
            { href: "/#contact", label: "Contact" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-foreground/80 hover:text-primary font-medium transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <a href="https://app.etatdelux.com/">Connexion</a>
          </Button>
          <Button
            asChild
            className="bg-gradient-premium text-primary-foreground hover:shadow-strong transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
          >
            <a href="https://app.etatdelux.com/">Essai Gratuit</a>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;