import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 text-foreground">
      <div className="max-w-2xl p-8 text-center">
        {/* 404 Number Display */}
        <div className="mb-8 relative">
          <div className="text-[12rem] font-black text-muted-foreground/20 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center">
              <Search className="w-12 h-12 text-primary/60" />
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          Oops, page non trouvée!
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          La page que vous recherchez semble avoir disparu dans l'espace numérique. 
          Peut-être a-t-elle été déplacée ou n'existe-t-elle plus.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Home className="w-4 h-4" />
            Retourner à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg shadow hover:bg-secondary/90 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            Page précédente
          </button>
        </div>
        
        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Code d'erreur: <span className="font-mono font-semibold">404</span> - 
            Ressource introuvable
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
