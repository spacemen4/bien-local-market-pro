import { Button } from "@/components/ui/button";
import { CheckCircle, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              ✨ Nouvelle version disponible
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Révolutionnez vos 
              <span className="bg-gradient-to-r from-primary-glow to-secondary bg-clip-text text-transparent"> États des Lieux</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              L'application professionnelle qui simplifie et digitalise vos états des lieux. 
              Gagnez du temps, réduisez les erreurs et impressionnez vos clients.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                asChild
                size="lg" 
                className="bg-white text-primary hover:bg-white/95 font-semibold transform hover:scale-105 transition-all duration-300"
              >
                <a href="https://app.etatdelux.com/">Essai Gratuit 14 Jours</a>
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
            <img
              src={heroImage}
              alt="Professionnel utilisant l'application d'état des lieux"
              className="relative rounded-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;