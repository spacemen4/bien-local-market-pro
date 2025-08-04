import {
  Calendar,
  Camera,
  FileText,
  Users,
  Clock,
  Shield,
  Smartphone,
  CloudUpload,
  CheckCircle,
} from "lucide-react";

import photo1 from "../assets/photo (1).jpg";
import photo2 from "../assets/photo (2).jpg";
import photo3 from "../assets/photo (3).jpg";
import photo4 from "../assets/photo (4).jpg";

const features = [
  {
    icon: Camera,
    title: "Photos illimitées et datées",
    description:
      "Ajoutez autant de photos que nécessaire. Elles sont automatiquement horodatées et intégrées au rapport.",
    image: photo1,
  },
  {
    icon: FileText,
    title: "Rapports PDF conformes",
    description:
      "Générez en un clic des rapports PDF professionnels, conformes à la loi ALUR, prêts à être envoyés.",
    image: photo2,
  },
  {
    icon: Users,
    title: "Signature électronique",
    description:
      "Faites signer les parties directement sur tablette ou smartphone pour une validation instantanée et sécurisée.",
    image: photo3,
  },
  {
    icon: Clock,
    title: "Modèles pré-remplis",
    description:
      "Gagnez un temps précieux en utilisant des modèles d'états des lieux personnalisables et réutilisables.",
    image: photo4,
  },
];

const bottomFeatures = [
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Optimisé pour smartphone et tablette, fonctionne même hors ligne.",
  },
  {
    icon: CloudUpload,
    title: "Cloud Sécurisé",
    description:
      "Vos données sont sauvegardées automatiquement et accessibles partout.",
  },
  {
    icon: CheckCircle,
    title: "Simplicité",
    description:
      "Interface intuitive, prise en main immédiate pour tous vos équipes.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Une puissance inégalée, une simplicité déconcertante
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ÉtatLux a été conçu pour éliminer les tâches répétitives et vous
            permettre de vous concentrer sur l'essentiel. Voici comment nous
            transformons votre travail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gradient-glass-light dark:bg-gradient-glass-dark border border-white/20 dark:border-white/10 shadow-soft hover:shadow-medium transition-all duration-300 "
            >
              {feature.image && (
                <div className="relative group perspective-1000 mb-4">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="rounded-lg shadow-medium w-full h-auto transform transition-transform duration-700 ease-out group-hover:rotate-y-[-8deg] group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {bottomFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-accent w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/10">
                <feature.icon
                  className={`h-10 w-10 ${
                    index === 1 ? "text-secondary" : "text-primary"
                  }`}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;