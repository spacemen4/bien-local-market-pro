import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Smartphone } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-hero text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Prêt à révolutionner vos états des lieux ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de professionnels qui ont déjà fait le choix de l'efficacité. 
            Commencez votre essai gratuit dès aujourd'hui.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Essai gratuit 14 jours</h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input 
                placeholder="Votre email professionnel"
                className="bg-white text-foreground border-0 flex-1"
              />
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
                Commencer l'essai
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-white/80">
              <span>✓ Aucune carte requise</span>
              <span>✓ Configuration en 2 minutes</span>
              <span>✓ Support inclus</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-left">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <Smartphone className="mr-3 h-6 w-6" />
                Téléchargez l'app
              </h4>
              <p className="text-white/80 mb-4">
                Disponible sur iOS et Android. Synchronisation automatique avec votre compte web.
              </p>
              <div className="flex space-x-4">
                <Button variant="secondary" className="text-white">
                  App Store
                </Button>
                <Button variant="secondary" className="text-white">
                  Google Play
                </Button>
              </div>
            </div>
            
            <div className="text-left">
              <h4 className="text-xl font-semibold mb-4">
                Besoin d'aide ?
              </h4>
              <p className="text-white/80 mb-4">
                Notre équipe française est là pour vous accompagner dans votre prise en main.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Démo personnalisée
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contacter l'équipe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;