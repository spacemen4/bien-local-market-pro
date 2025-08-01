import React, { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: ''
  });
  
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [charCounts, setCharCounts] = useState({
    name: 0,
    message: 0,
    subject: 0
  });

  const formRef = useRef(null);
  const nameInputRef = useRef(null);

  // Animation d'entrée
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calcul du progrès du formulaire
  useEffect(() => {
    const requiredFields = ['name', 'email', 'message'];
    const filledFields = requiredFields.filter(field => formData[field].trim() !== '');
    const progress = (filledFields.length / requiredFields.length) * 100;
    setFormProgress(progress);
  }, [formData]);

  // Mise à jour des compteurs de caractères
  useEffect(() => {
    setCharCounts({
      name: formData.name.length,
      message: formData.message.length,
      subject: formData.subject.length
    });
  }, [formData.name, formData.message, formData.subject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Limitation de caractères
    const limits = { name: 50, subject: 100, message: 1000, phone: 20 };
    if (limits[name] && value.length > limits[name]) return;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validation en temps réel
    if (fieldErrors[name]) {
      validateField(name, value);
    }
  };

  const validateField = (fieldName, value) => {
    const errors = {};
    
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Le nom est requis';
        } else if (value.trim().length < 2) {
          errors.name = 'Le nom doit contenir au moins 2 caractères';
        } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value.trim())) {
          errors.name = 'Le nom ne peut contenir que des lettres';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          errors.email = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Format d\'email invalide';
        }
        break;
        
      case 'phone':
        if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
          errors.phone = 'Format de téléphone invalide';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          errors.message = 'Le message est requis';
        } else if (value.trim().length < 10) {
          errors.message = 'Le message doit contenir au moins 10 caractères';
        }
        break;
    }
    
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: errors[fieldName] || ''
    }));
    
    return !errors[fieldName];
  };

  const validateForm = () => {
    const fields = ['name', 'email', 'message'];
    let isValid = true;
    
    fields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    if (formData.phone) {
      validateField('phone', formData.phone);
    }
    
    return isValid;
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    
    if (type === 'success') {
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 3000);
    }
    
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, type === 'success' ? 8000 : 6000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showAlert('error', 'Veuillez corriger les erreurs dans le formulaire');
      // Focus sur le premier champ avec erreur
      const firstErrorField = Object.keys(fieldErrors).find(key => fieldErrors[key]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    showAlert('info', 'Envoi en cours... Nous traitons votre demande.');
    
    try {
      // Simulation progressive de l'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulation d'erreur parfois (pour démo)
      if (Math.random() > 0.8) {
        throw new Error('Erreur serveur temporaire');
      }
      
      // Messages personnalisés selon la priorité
      const priorityMessages = {
        low: 'Votre message a été reçu. Nous vous répondrons sous 48-72h.',
        normal: 'Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.',
        high: 'Votre demande urgente a été reçue. Notre équipe vous contactera dans les plus brefs délais.',
        urgent: 'Votre demande urgente est traitée en priorité. Vous recevrez une réponse dans l\'heure.'
      };
      
      showAlert('success', priorityMessages[formData.priority]);
      
      // Réinitialisation progressive avec animation
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          priority: 'normal'
        });
        setFieldErrors({});
        setFormProgress(0);
      }, 1000);
      
    } catch (error) {
      const errorMessages = [
        'Erreur temporaire du serveur. Veuillez réessayer dans quelques instants.',
        'Problème de connexion détecté. Vérifiez votre connexion internet.',
        'Service temporairement indisponible. Notre équipe technique travaille sur le problème.'
      ];
      
      showAlert('error', errorMessages[Math.floor(Math.random() * errorMessages.length)]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      priority: 'normal'
    });
    setFieldErrors({});
    setFormProgress(0);
    nameInputRef.current?.focus();
    showAlert('info', 'Formulaire réinitialisé');
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, show: false }));
    setShowSuccessAnimation(false);
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
        return (
          <div className="relative">
            <svg className={`${iconClass} text-green-600`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {showSuccessAnimation && (
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
            )}
          </div>
        );
      case 'error':
        return (
          <svg className={`${iconClass} text-red-600`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
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

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'text-gray-600 bg-gray-100',
      normal: 'text-blue-600 bg-blue-100',
      high: 'text-orange-600 bg-orange-100',
      urgent: 'text-red-600 bg-red-100'
    };
    return colors[priority] || colors.normal;
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .field-focus {
          transform: scale(1.02);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
      
      <div id="contact" className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous sommes là pour vous aider. Envoyez-nous un message et nous vous répondrons rapidement.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Barre de progression */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progression du formulaire</span>
                <span className="text-sm text-gray-500">{Math.round(formProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${formProgress}%` }}
                ></div>
              </div>
            </div>

            {alert.show && (
              <div className={getAlertStyles(alert.type)}>
                <div className="flex items-start">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    {alert.type === 'success' && (
                      <p className="text-sm mt-1 opacity-75">
                        Vous recevrez également un email de confirmation.
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
            )}

            <div ref={formRef} className="grid md:grid-cols-3 gap-8">
              {/* Informations de contact */}
              <div className="md:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Nos coordonnées</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <p className="text-gray-600">contact@entreprise.fr</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Téléphone</p>
                        <p className="text-gray-600">+33 1 23 45 67 89</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Adresse</p>
                        <p className="text-gray-600">123 Rue de la République<br />69000 Lyon, France</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Temps de réponse</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Demandes normales</span>
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">24h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Demandes urgentes</span>
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">1h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Support technique</span>
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">2h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nom */}
                    <div className="md:col-span-1">
                      <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={(e) => validateField('name', e.target.value)}
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                          fieldErrors.name 
                            ? 'border-red-300 bg-red-50 focus:border-red-500' 
                            : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                        placeholder="Votre nom et prénom"
                      />
                      {fieldErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        {charCounts.name}/50 caractères
                      </div>
                    </div>

                    {/* Email */}
                    <div className="md:col-span-1">
                      <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={(e) => validateField('email', e.target.value)}
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                          fieldErrors.email 
                            ? 'border-red-300 bg-red-50 focus:border-red-500' 
                            : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                        placeholder="votre.email@exemple.com"
                      />
                      {fieldErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                      )}
                    </div>
                    
                    {/* Téléphone */}
                    <div className="md:col-span-1">
                      <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                        Téléphone <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={(e) => validateField('phone', e.target.value)}
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                          fieldErrors.phone 
                            ? 'border-red-300 bg-red-50 focus:border-red-500' 
                            : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                        placeholder="+33 1 23 45 67 89"
                      />
                      {fieldErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
                      )}
                    </div>

                    {/* Priorité */}
                    <div className="md:col-span-1">
                      <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">
                        Priorité
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:bg-blue-50 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="low">Faible - Réponse sous 72h</option>
                        <option value="normal">Normal - Réponse sous 24h</option>
                        <option value="high">Élevée - Réponse prioritaire</option>
                        <option value="urgent">Urgente - Réponse immédiate</option>
                      </select>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPriorityColor(formData.priority)}`}>
                        {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
                      </div>
                    </div>

                    {/* Sujet */}
                    <div className="md:col-span-2">
                      <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">
                        Sujet <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:bg-blue-50 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Résumé de votre demande"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {charCounts.subject}/100 caractères
                      </div>
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2">
                      <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={(e) => validateField('message', e.target.value)}
                        disabled={isSubmitting}
                        rows={6}
                        className={`w-full py-3 px-4 rounded-xl border-2 transition-all duration-200 focus:outline-none resize-vertical ${
                          fieldErrors.message 
                            ? 'border-red-300 bg-red-50 focus:border-red-500' 
                            : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                        placeholder="Décrivez votre demande en détail..."
                      />
                      {fieldErrors.message && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.message}</p>
                      )}
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{charCounts.message}/1000 caractères</span>
                        <span className={charCounts.message >= 10 ? 'text-green-600' : 'text-red-500'}>
                          Minimum 10 caractères
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Boutons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting || formProgress < 100}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        'Envoyer le message'
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={resetForm}
                      disabled={isSubmitting}
                      className="flex-1 bg-transparent border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-4 px-8 rounded-xl focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Réinitialiser
                    </button>
                  </div>

                  <div className="mt-6 text-center text-gray-600 text-sm">
                    <p>Les champs marqués d'un <span className="text-red-500">*</span> sont obligatoires</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;