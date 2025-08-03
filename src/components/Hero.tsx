import { Button } from "@/components/ui/button";
import { CheckCircle, Play } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const { openAuthModal } = useAuth();

  return (
    <section className="relative pt-20 pb-16 bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-bounce-subtle"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              ✨ Nouvelle version disponible
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Révolutionnez vos 
              <span className="bg-gradient-to-r from-primary-glow to-secondary bg-clip-text text-transparent animate-pulse-glow"> États des Lieux</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              L'application professionnelle qui simplifie et digitalise vos états des lieux. 
              Gagnez du temps, réduisez les erreurs et impressionnez vos clients.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={openAuthModal}
                size="lg" 
                className="bg-white text-primary hover:bg-white/95 font-semibold shadow-premium hover:shadow-float transform hover:scale-105 transition-all duration-300"
              >
                Essai Gratuit 14 Jours 
              </Button>
              <a href="#demo">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-white/5 hover:border-white/50 transition-all duration-300">
                  <Play className="mr-2 h-5 w-5" />
                  Voir la Démo
                </Button>
              </a>
            </div>

            <div className="flex items-center space-x-6 text-sm text-white/80">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-secondary" />
                Sans engagement
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-secondary" />
                Support français
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-secondary" />
                Conformité légale
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-premium rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-glow"></div>
              <img 
                src={heroImage} 
                alt="Professionnel utilisant l'application d'état des lieux"
                className="relative rounded-2xl w-full h-auto transform transition duration-500 hover:scale-105"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-gradient-glass backdrop-blur-glass text-primary p-4 rounded-xl shadow-float border border-white/20 animate-bounce-subtle">
              <div className="text-sm font-medium">Gain de temps</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">75%</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-gradient-premium text-white p-4 rounded-xl shadow-premium animate-pulse-glow">
              <div className="text-sm font-medium">Satisfaction client</div>
              <div className="text-2xl font-bold">98%</div>
            </div>
            
            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
              <div className="flex flex-col space-y-2">
                <div className="w-3 h-3 bg-white/20 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-secondary/40 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-primary/30 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;