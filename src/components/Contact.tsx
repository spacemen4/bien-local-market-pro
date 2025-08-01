import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  priority: string;
}

interface FieldErrors {
  [key: string]: string;
}

interface Alert {
  show: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  
  const [alert, setAlert] = useState<Alert>({
    show: false,
    type: 'info',
    message: ''
  });
  
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const errors: FieldErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Le message est requis';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const showAlert = (type: Alert['type'], message: string) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showAlert('error', 'Veuillez corriger les erreurs dans le formulaire');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showAlert('success', 'Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        priority: 'normal'
      });
      
    } catch (error) {
      showAlert('error', 'Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Contactez-nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nous sommes là pour vous aider. Envoyez-nous un message et nous vous répondrons rapidement.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card rounded-2xl p-8 shadow-premium border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">Nos coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground">contact@etatlux.fr</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Téléphone</h4>
                    <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Adresse</h4>
                    <p className="text-muted-foreground">123 Rue de la République<br />69000 Lyon, France</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-premium rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                Temps de réponse
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Demandes normales</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">24h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Demandes urgentes</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">1h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-8 shadow-premium border border-border">
              {alert.show && (
                <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                  alert.type === 'success' ? 'bg-green-50 border-green-400 text-green-800' :
                  alert.type === 'error' ? 'bg-red-50 border-red-400 text-red-800' :
                  'bg-blue-50 border-blue-400 text-blue-800'
                }`}>
                  <div className="flex items-start">
                    {alert.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                    )}
                    <p>{alert.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={fieldErrors.name ? 'border-red-500' : ''}
                      placeholder="Votre nom et prénom"
                      disabled={isSubmitting}
                    />
                    {fieldErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldErrors.email ? 'border-red-500' : ''}
                      placeholder="votre@email.com"
                      disabled={isSubmitting}
                    />
                    {fieldErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Téléphone <span className="text-muted-foreground">(optionnel)</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+33 1 23 45 67 89"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-2">
                      Priorité
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      <option value="low">Faible - Réponse sous 72h</option>
                      <option value="normal">Normal - Réponse sous 24h</option>
                      <option value="high">Élevée - Réponse prioritaire</option>
                      <option value="urgent">Urgente - Réponse immédiate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Sujet <span className="text-muted-foreground">(optionnel)</span>
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Résumé de votre demande"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={fieldErrors.message ? 'border-red-500' : ''}
                    placeholder="Décrivez votre demande en détail..."
                    rows={6}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-premium hover:shadow-premium transition-all duration-300"
                  size="lg"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;