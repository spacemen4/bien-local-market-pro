import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "particulier",
    name: "Essentiel",
    price: "9",
    period: "/mois",
    description: "Pour les propriétaires et les petites structures.",
    features: [
      "Jusqu'à 5 biens",
      "États des lieux illimités",
      "Photos HD illimitées",
      "Rapports PDF",
      "Support email",
    ],
    popular: false,
  },
  {
    id: "professionnel",
    name: "Pro",
    price: "29",
    period: "/mois",
    description: "Pour les agents et gestionnaires immobiliers.",
    features: [
      "Jusqu'à 100 biens",
      "Gestion équipe",
      "États des lieux illimités",
      "Photos HD illimitées",
      "Rapports PDF",
      "Support prioritaire",
    ],
    popular: true,
  },
  {
    id: "agence",
    name: "Agence",
    price: "Sur Devis",
    period: "",
    description: "Pour les agences et les grandes équipes.",
    features: [
      "Tout du plan Pro",
      "Utilisateurs illimités",
      "Marque blanche",
      "Account manager dédié",
      "API & Intégrations",
    ],
    popular: false,
  },
];

const Pricing = () => {
  const [loading, setLoading] = useState(false);

  const handlePlanSelect = async (plan) => {
    if (plan.id === "agence") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setLoading(true);
    window.location.href = "https://app.etatdelux.com/";
    setLoading(false);
  };

  return (
    <section id="pricing" className="py-24 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Des tarifs adaptés à votre croissance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Simple, transparent
            et sans engagement.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col p-8 rounded-2xl bg-gradient-glass-light dark:bg-gradient-glass-dark border shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-2",
                plan.popular
                  ? "border-primary shadow-strong"
                  : "border-white/20 dark:border-white/10"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-premium text-primary-foreground px-4 py-1 text-sm font-semibold">
                  Le plus populaire
                </Badge>
              )}
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mt-2 mb-6">
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-primary">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xl font-medium text-muted-foreground">
                      €{plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => handlePlanSelect(plan)}
                disabled={loading}
                size="lg"
                className={cn(
                  "w-full mt-10 text-lg",
                  plan.popular && "bg-gradient-premium text-primary-foreground"
                )}
              >
                {loading ? "Chargement..." : plan.id === "agence" ? "Nous contacter" : "Choisir ce plan"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            <strong>Tous les plans incluent :</strong> 14 jours d'essai gratuit,
            support réactif, et données sécurisées en Europe.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;