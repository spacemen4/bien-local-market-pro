import { Button } from "@/components/ui/button";
import { CheckCircle, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-hero text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Révolutionnez vos 
              <span className="text-primary-glow"> États des Lieux</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              L'application professionnelle qui simplifie et digitalise vos états des lieux. 
              Gagnez du temps, réduisez les erreurs et impressionnez vos clients.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Essai Gratuit 14 Jours
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Play className="mr-2 h-5 w-5" />
                Voir la Démo
              </Button>
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

          <div className="relative animate-float">
            <img 
              src={heroImage} 
              alt="Professionnel utilisant l'application d'état des lieux"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-white text-primary p-4 rounded-xl shadow-card">
              <div className="text-sm font-medium">Gain de temps</div>
              <div className="text-2xl font-bold">75%</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-secondary text-white p-4 rounded-xl shadow-card">
              <div className="text-sm font-medium">Satisfaction client</div>
              <div className="text-2xl font-bold">98%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;