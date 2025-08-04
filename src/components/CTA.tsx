import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Passez à la vitesse supérieure dès aujourd'hui
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10">
            Rejoignez les milliers de professionnels qui nous font confiance.
            Votre essai de 14 jours vous attend.
          </p>

          <div className="bg-gradient-glass-dark border border-white/20 backdrop-blur-glass rounded-2xl p-8 max-w-xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">
              Commencez votre essai gratuit
            </h3>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-strong hover:shadow-strong transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <a href="https://app.etatdelux.com/">
                Essayer ÉtatLux Gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-primary-foreground/80 mt-6">
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1.5" />
                Aucune carte requise
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1.5" />
                Annulation facile
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;