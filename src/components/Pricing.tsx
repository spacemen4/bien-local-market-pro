import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft, CreditCard, Shield, Users, Zap, AlertCircle } from "lucide-react";

// Configuration Stripe avec votre vraie clé publique
const STRIPE_PUBLIC_KEY = 'pk_test_51RnjDbPd6cch1PYQrccWNd9DxzNw85nZhuhM2w12aXzcBtmOojXrtnnv5JKhSwXtXADWk3ztE8ZYPQWe5rcuGrRy00FQeeA6li';

const Pricing = () => {
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [cardElement, setCardElement] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const plans = [
    {
      id: 'particulier',
      name: "Particulier",
      price: "9",
      priceValue: 900, // en centimes
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
      priceId: "price_particulier_monthly" // À remplacer par votre vrai Price ID
    },
    {
      id: 'professionnel',
      name: "Professionnel",
      price: "29",
      priceValue: 2900, // en centimes
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
      priceId: "price_professionnel_monthly" // À remplacer par votre vrai Price ID
    },
    {
      id: 'agence',
      name: "Agence",
      price: "Sur mesure",
      priceValue: null,
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

  // Initialisation de Stripe
  useEffect(() => {
    const loadStripe = async () => {
      try {
        // Charger Stripe dynamiquement
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          const stripeInstance = window.Stripe(STRIPE_PUBLIC_KEY);
          const elementsInstance = stripeInstance.elements();
          
          setStripe(stripeInstance);
          setElements(elementsInstance);
        };
      } catch (error) {
        console.error('Erreur lors du chargement de Stripe:', error);
      }
    };

    loadStripe();
  }, []);

  // Initialiser CardElement quand on affiche le formulaire
  useEffect(() => {
    if (elements && showPaymentForm && !cardElement) {
      const card = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#1a202c',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            '::placeholder': {
              color: '#9ca3af',
            },
          },
          invalid: {
            color: '#dc2626',
            iconColor: '#dc2626',
          },
        },
        hidePostalCode: true,
      });

      // Monter l'élément dans le DOM
      setTimeout(() => {
        const cardContainer = document.getElementById('card-element-container');
        if (cardContainer) {
          card.mount('#card-element-container');
          setCardElement(card);

          // Écouter les changements
          card.on('change', (event) => {
            setPaymentError(event.error ? event.error.message : '');
          });
        }
      }, 100);
    }
  }, [elements, showPaymentForm]);

  const handlePlanSelect = (plan) => {
    if (plan.id === 'agence') {
      // Redirection vers contact pour le plan agence
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setSelectedPlan(plan);
    setShowPaymentForm(true);
    setPaymentError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fonction pour créer l'abonnement côté backend
  const createSubscription = async (paymentMethodId) => {
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId,
          priceId: selectedPlan.priceId,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          planType: selectedPlan.id
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la création de l\'abonnement');
      }

      return result;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  };

  const handleSubmitPayment = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setPaymentError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!stripe || !cardElement) {
      setPaymentError('Stripe n\'est pas encore chargé. Veuillez patienter.');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      // Créer le PaymentMethod
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Créer l'abonnement via votre backend
      const subscription = await createSubscription(paymentMethod.id);

      // Gérer les cas nécessitant une authentification 3D Secure
      if (subscription.client_secret) {
        const { error: confirmError } = await stripe.confirmCardPayment(subscription.client_secret);
        
        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }

      // Succès !
      alert(`🎉 Félicitations ! Votre abonnement ${selectedPlan.name} a été créé avec succès.\n\nVotre essai gratuit de 14 jours commence maintenant.\nVous recevrez un email de confirmation sous peu.`);
      
      // Réinitialiser le formulaire
      setShowPaymentForm(false);
      setSelectedPlan(null);
      setFormData({ firstName: '', lastName: '', email: '' });

      // Rediriger vers le dashboard (à adapter selon votre routing)
      // window.location.href = '/dashboard';

    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      setPaymentError(error.message || 'Une erreur est survenue lors du traitement de votre paiement.');
    } finally {
      setIsProcessing(false);
    }
  };

  const BackButton = () => (
    <Button
      variant="outline"
      onClick={() => {
        setShowPaymentForm(false);
        if (cardElement) {
          cardElement.destroy();
          setCardElement(null);
        }
      }}
      className="mb-6 hover:bg-gray-50"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Retour aux plans
    </Button>
  );

  const PaymentForm = () => (
    <div className="max-w-2xl mx-auto">
      <BackButton />
      
      {/* Récapitulatif de commande */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Récapitulatif de votre commande</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Plan {selectedPlan.name}</span>
            <span className="font-semibold text-gray-900">{selectedPlan.price}€/mois</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Essai gratuit</span>
            <span className="text-green-600 font-medium">14 jours</span>
          </div>
          <hr className="border-gray-200 my-4" />
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total aujourd'hui</span>
            <span className="text-green-600">0€</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Puis {selectedPlan.price}€ facturé mensuellement. Annulable à tout moment.
          </p>
        </CardContent>
      </Card>

      {/* Formulaire */}
      <Card>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Informations personnelles */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="votre.email@exemple.com"
                />
              </div>
            </div>

            {/* Informations de paiement */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Informations de paiement
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carte bancaire *
                </label>
                <div 
                  id="card-element-container"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-colors bg-white"
                  style={{ minHeight: '40px' }}
                >
                  {/* Stripe Card Element sera monté ici */}
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm text-gray-600">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Paiement sécurisé par Stripe. Aucun prélèvement pendant 14 jours.
              </div>
            </div>

            {/* Message d'erreur */}
            {paymentError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-800 text-sm font-medium">Erreur de paiement</p>
                  <p className="text-red-700 text-sm mt-1">{paymentError}</p>
                </div>
              </div>
            )}

            {/* Bouton de soumission */}
            <Button
              type="button"
              onClick={handleSubmitPayment}
              disabled={isProcessing || !stripe}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Traitement en cours...
                </div>
              ) : !stripe ? (
                <div className="flex items-center justify-center">
                  <div className="animate-pulse">Chargement de Stripe...</div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Commencer l'essai gratuit
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges de sécurité */}
      <div className="flex justify-center items-center gap-8 mt-8 text-sm text-gray-500">
        <div className="flex items-center">
          <Shield className="w-4 h-4 mr-1" />
          SSL sécurisé
        </div>
        <div className="flex items-center">
          <Shield className="w-4 h-4 mr-1" />
          Cryptage 256-bit
        </div>
        <div className="flex items-center">
          <Shield className="w-4 h-4 mr-1" />
          Conforme PCI DSS
        </div>
      </div>
    </div>
  );

  const PricingCards = () => (
    <>
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
                className={`w-full mt-8 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                    : plan.name === "Agence"
                    ? 'bg-gray-600 hover:bg-gray-700'
                    : 'bg-blue-600 hover:bg-blue-700'
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
    </>
  );

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {showPaymentForm ? <PaymentForm /> : <PricingCards />}
      </div>
    </section>
  );
};

export default Pricing;