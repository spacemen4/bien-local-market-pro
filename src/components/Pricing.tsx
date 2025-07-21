import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Particulier",
      price: "9",
      period: "/mois",
      description: "Parfait pour les propriétaires particuliers",
      features: [
        "Jusqu'à 5 biens",
        "États des lieux illimités",
        "Photos HD illimitées",
        "Rapports PDF",
        "Support email"
      ],
      popular: false
    },
    {
      name: "Professionnel",
      price: "29",
      period: "/mois",
      description: "Idéal pour les agents immobiliers",
      features: [
        "Biens illimités",
        "Gestion multi-clients",
        "Calendrier avancé",
        "Modèles personnalisés",
        "Support prioritaire",
        "API et intégrations",
        "Tableau de bord analytique"
      ],
      popular: true
    },
    {
      name: "Agence",
      price: "Sur mesure",
      period: "",
      description: "Solution entreprise avec fonctionnalités avancées",
      features: [
        "Tout du plan Professionnel",
        "Utilisateurs illimités",
        "Marque blanche",
        "Formations dédiées",
        "Account manager",
        "SLA garantie 99.9%",
        "Intégration ERP"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Tarifs Transparents
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez la formule qui correspond à vos besoins. Pas de frais cachés, résiliation simple.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 transition-all duration-300 hover:shadow-glow ${
                plan.popular 
                  ? 'border-primary shadow-glow animate-glow' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Le plus populaire
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}€
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full mt-8 ${
                    plan.popular 
                      ? 'bg-gradient-hero hover:opacity-90 shadow-glow' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  size="lg"
                >
                  {plan.name === "Agence" ? "Nous Contacter" : "Commencer"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            🎯 <strong>Offre de lancement :</strong> 14 jours d'essai gratuit, sans engagement
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <span>✓ Annulation en 1 clic</span>
            <span>✓ Support français</span>
            <span>✓ Données exportables</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;