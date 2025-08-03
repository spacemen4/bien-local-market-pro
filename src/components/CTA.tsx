import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
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
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <a href="https://app.etatdelux.com/">
                  Commencer l'essai
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-white/80 mt-6">
              <span>✓ Aucune carte requise</span>
              <span>✓ Configuration en 2 minutes</span>
              <span>✓ Support inclus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;