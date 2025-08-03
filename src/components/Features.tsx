import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Camera, 
  FileText, 
  Users, 
  Clock, 
  Shield,
  Smartphone,
  CloudUpload,
  CheckCircle
} from "lucide-react";
import appMockup from "@/assets/app-mockup.jpg";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Planification Intelligente",
      description: "Gérez vos rendez-vous et optimisez vos tournées avec notre calendrier intégré."
    },
    {
      icon: Camera,
      title: "Photos HD Intégrées",
      description: "Prenez des photos haute définition directement dans l'app avec géolocalisation automatique."
    },
    {
      icon: FileText,
      title: "Rapports Automatisés",
      description: "Générez des états des lieux professionnels en PDF en quelques clics."
    },
    {
      icon: Users,
      title: "Gestion Multi-clients",
      description: "Organisez vos propriétaires, locataires et mandats depuis une interface unique."
    },
    {
      icon: Clock,
      title: "Gain de Temps",
      description: "Réduisez de 75% le temps consacré à la paperasse administrative."
    },
    {
      icon: Shield,
      title: "Processus Standardisé",
      description: "Suivez un parcours optimisé pour des états des lieux complets et rigoureux."
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une solution complète pensée pour les professionnels de l'immobilier et les particuliers exigeants.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <img 
              src={appMockup} 
              alt="Interface de l'application mobile"
              className="w-full max-w-md mx-auto animate-float"
            />
          </div>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile First</h3>
            <p className="text-muted-foreground">
              Optimisé pour smartphone et tablette, fonctionne même hors ligne.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CloudUpload className="h-10 w-10 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cloud Sécurisé</h3>
            <p className="text-muted-foreground">
              Vos données sont sauvegardées automatiquement et accessibles partout.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Simplicité</h3>
            <p className="text-muted-foreground">
              Interface intuitive, prise en main immédiate pour tous vos équipes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;