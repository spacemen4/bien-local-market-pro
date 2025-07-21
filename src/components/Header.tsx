import { Button } from "@/components/ui/button";
import { Menu, Building2 } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">ÉtatLux</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            Fonctionnalités
          </a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
            Tarifs
          </a>
          <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
            Témoignages
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex">
            Connexion
          </Button>
          <Button className="bg-gradient-hero hover:opacity-90 shadow-glow">
            Essai Gratuit
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;