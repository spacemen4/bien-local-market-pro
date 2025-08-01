import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../../supabase';
import AuthModal from './AuthModal';
import { useAuth } from '@/hooks/useAuth';

const Pricing = () => {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const { openAuthModal } = useAuth();

  const plans = [
    {
      id: 'particulier',
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
      popular: false,
      priceId: "price_1RnjgCPd6cch1PYQnQ9sKi43" // Replace with your actual Price ID from Stripe
    },
    {
      id: 'professionnel',
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
      popular: true,
      priceId: "price_1RnjgCPd6cch1PYQnQ9sKi43" // Replace with your actual Price ID from Stripe
    },
    {
      id: 'agence',
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
      popular: false,
      priceId: null
    }
  ];

  const handlePlanSelect = async (plan) => {
    if (plan.id === 'agence') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setLoading(true);

    if (!user) {
      openAuthModal();
      setLoading(false);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        throw new Error("No token found");
      }

      // Replace with your actual Deno function URL
      const response = await fetch('https://osqpvyrctlhagtzkbspv.functions.supabase.co/create_abonnement_stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ priceId: plan.priceId })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la création de l\'abonnement');
      }

      window.location.href = result.url;

    } catch (error) {
      console.error('Erreur API:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

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
              className={`relative border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                plan.popular
                  ? 'border-blue-500 shadow-lg shadow-blue-100 ring-2 ring-blue-100'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  Le plus populaire
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">
                    {plan.price}
                  </span>
                  {plan.price !== "Sur mesure" && (
                    <>
                      <span className="text-4xl font-bold text-blue-600">€</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan)}
                  disabled={loading}
                  className={`w-full mt-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                      : plan.name === "Agence"
                      ? 'bg-gray-600 hover:bg-gray-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  size="lg"
                >
                  {loading ? 'Chargement...' : (plan.name === "Agence" ? "Nous Contacter" : "Commencer")}
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