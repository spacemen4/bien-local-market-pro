import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock, CheckCircle, AlertCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const tempErrors = { name: "", email: "", message: "" };
    let isValid = true;
    if (!formData.name) {
      tempErrors.name = "Le nom est requis.";
      isValid = false;
    }
    if (!formData.email) {
      tempErrors.email = "L'email est requis.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "L'email est invalide.";
      isValid = false;
    }
    if (!formData.message) {
      tempErrors.message = "Le message est requis.";
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setAlert({ show: false, type: "", message: "" });

    try {
      await new Promise((res) => setTimeout(res, 1500));
      setAlert({
        show: true,
        type: "success",
        message: "Message envoyé ! Nous vous répondrons bientôt.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: "Une erreur s'est produite. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Une question ? Contactez-nous
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour toute demande d'information
            ou de démonstration personnalisée.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-2xl bg-gradient-glass-light dark:bg-gradient-glass-dark border border-white/20 dark:border-white/10 shadow-soft">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Informations de contact
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground">contact@etatlux.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Téléphone</h4>
                    <p className="text-muted-foreground">01 23 45 67 89</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-premium text-primary-foreground">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                Temps de réponse garanti
              </h3>
              <p className="text-primary-foreground/90">
                Nous nous engageons à vous répondre sous 24 heures ouvrées.
                Votre satisfaction est notre priorité.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl bg-gradient-glass-light dark:bg-gradient-glass-dark border border-white/20 dark:border-white/10 shadow-soft">
              {alert.show && (
                <div
                  className={cn(
                    "mb-6 p-4 rounded-lg border-l-4 flex items-start",
                    alert.type === "success"
                      ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-300"
                      : "bg-red-500/10 border-red-500 text-red-700 dark:text-red-300"
                  )}
                >
                  {alert.type === "success" ? (
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-3 mt-0.5" />
                  )}
                  <p>{alert.message}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet
                    </label>
                    <Input
                      id="name" name="name" value={formData.name} onChange={handleChange}
                      placeholder="Jean Dupont" disabled={isSubmitting}
                      className={cn(errors.name && "border-red-500")}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                      placeholder="jean.dupont@email.com" disabled={isSubmitting}
                      className={cn(errors.email && "border-red-500")}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Votre message
                  </label>
                  <Textarea
                    id="message" name="message" value={formData.message} onChange={handleChange}
                    placeholder="Comment pouvons-nous vous aider ?" disabled={isSubmitting}
                    rows={6}
                    className={cn(errors.message && "border-red-500")}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  <Send className="ml-2 h-5 w-5" />
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