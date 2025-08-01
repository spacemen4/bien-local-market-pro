import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const CTA = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: ''
  });

  // Récupération de la fonction openAuthModal depuis useAuth
  const { openAuthModal } = useAuth();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const submitToContactDB = async (email) => {
    try {
      // Simulation d'un appel API vers votre base de données contact
      const contactData = {
        name: 'Prospect Essai Gratuit',
        email: email,
        phone: '', // Optionnel
        subject: 'Demande d\'essai gratuit - États des lieux',
        message: `Bonjour,

Je souhaite commencer mon essai gratuit de 14 jours pour votre solution d'états des lieux.

Merci de me créer un compte et de m'envoyer les informations de connexion.

Email de contact: ${email}

Cordialement`,
        priority: 'high' // Priorité élevée pour les prospects
      };

      // Simulation de l'envoi vers votre API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulation d'erreur parfois (pour test)
      if (Math.random() > 0.9) {
        throw new Error('Erreur serveur temporaire');
      }

      return { success: true, data: contactData };
    } catch (error) {
      throw new Error('Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  };

  const handleTrialStart = async () => {
    if (!email.trim()) {
      showAlert('error', 'Veuillez saisir votre email professionnel');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('error', 'Format d\'email invalide');
      return;
    }

    setIsSubmitting(true);
    showAlert('info', 'Création de votre compte d\'essai...');

    try {
      await submitToContactDB(email);
      
      showAlert('success', 'Parfait ! Votre demande d\'essai a été enregistrée. Connectez-vous maintenant pour finaliser votre inscription.');
      
      // Ouverture du modal d'authentification après succès
      setTimeout(() => {
        openAuthModal();
        console.log('Compte d\'essai créé pour:', email);
      }, 2000);
      
      // Reset du formulaire
      setEmail('');
      
    } catch (error) {
      showAlert('error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, show: false }));
  };

  const getAlertStyles = (type) => {
    const baseStyles = "p-4 rounded-xl border-l-4 mb-6 relative transform transition-all duration-300 shadow-lg";
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 text-green-800`;
      case 'error':
        return `${baseStyles} bg-gradient-to-r from-red-50 to-rose-50 border-red-400 text-red-800`;
      case 'info':
        return `${baseStyles} bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-400 text-blue-800`;
      default:
        return baseStyles;
    }
  };

  const getAlertIcon = (type) => {
    const iconClass = "w-6 h-6 mr-3 flex-shrink-0";
    
    switch (type) {
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-600`} />;
      case 'error':
        return <AlertCircle className={`${iconClass} text-red-600`} />;
      case 'info':
        return (
          <svg className={`${iconClass} text-blue-600 animate-pulse`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

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
          
          {/* Alert */}
          {alert.show && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className={getAlertStyles(alert.type)}>
                <div className="flex items-start">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    {alert.type === 'success' && (
                      <p className="text-sm mt-1 opacity-75">
                        Le modal de connexion va s'ouvrir dans quelques secondes.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={closeAlert}
                    className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
                    
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Essai gratuit 14 jours</h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                type="email"
                placeholder="Votre email professionnel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="bg-white text-gray-900 border-0 flex-1 placeholder:text-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleTrialStart();
                  }
                }}
              />
              <Button
                onClick={handleTrialStart}
                disabled={isSubmitting}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création...
                  </>
                ) : (
                  <>
                    Commencer l'essai
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-white/80">
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