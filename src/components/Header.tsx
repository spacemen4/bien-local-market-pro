import { Button } from "@/components/ui/button";
import { Menu, Building2, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, signOut, openAuthModal } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-gradient-glass backdrop-blur-glass border-b border-white/10 z-50 shadow-float">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 group">
          <Building2 className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ÉtatLux</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/#features" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group">
            Fonctionnalités
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/#demo" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group">
            Démo
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/#pricing" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group">
            Tarifs
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/#testimonials" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group">
            Témoignages
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/#contact" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span className="text-foreground text-sm">{user.email}</span>
              </div>
              <Button onClick={signOut} variant="outline" size="sm" className="hover:bg-primary/5 transition-all duration-300">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button onClick={openAuthModal} variant="default" className="hidden md:inline-flex hover:bg-primary/5 transition-all duration-300 hover:scale-105">
                Connexion
              </Button>
              <Button onClick={openAuthModal} className="bg-gradient-premium text-black hover:shadow-premium transition-all duration-300 hover:scale-105 animate-pulse-glow">
                Essai Gratuit
              </Button>
            </>
          )}
          <Button variant="outline" size="icon" className="md:hidden hover:bg-primary/5 transition-all duration-300">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;