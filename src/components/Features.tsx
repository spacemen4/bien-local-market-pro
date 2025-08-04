import { useState } from "react";
import {
  Camera,
  FileText,
  Users,
  Clock,
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
  const [activeTab, setActiveTab] = useState(0);

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

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all duration-300 ${
                activeTab === index
                  ? "bg-primary text-primary-foreground border-primary shadow-medium"
                  : "bg-background/50 text-foreground border-white/20 dark:border-white/10 hover:bg-primary/10 hover:border-primary/30"
              }`}
            >
              <feature.icon className="h-5 w-5" />
              <span className="font-medium">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group perspective-1000">
              <img
                src={features[activeTab].image}
                alt={features[activeTab].title}
                className="rounded-lg shadow-medium w-full h-[400px] object-cover transform transition-transform duration-700 ease-out group-hover:rotate-y-[-8deg] group-hover:scale-105"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-primary/10 p-4 rounded-lg inline-block">
                {(() => {
                  const IconComponent = features[activeTab].icon;
                  return <IconComponent className="h-8 w-8 text-primary" />;
                })()}
              </div>
              <h3 className="text-3xl font-bold text-foreground">
                {features[activeTab].title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {features[activeTab].description}
              </p>
            </div>
          </div>
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