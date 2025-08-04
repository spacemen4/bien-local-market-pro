import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Camera, Edit, FilePdf } from "lucide-react";

const showcaseFeatures = [
  {
    value: "gallery",
    trigger: (
      <>
        <Camera className="mr-2 h-5 w-5" />
        Galeries Photos
      </>
    ),
    title: "Galeries photos intelligentes et comparatives",
    description:
      "Organisez vos photos par pièce et ajoutez des commentaires détaillés. Notre outil de comparaison avant/après met en évidence les changements, simplifiant la détection des dégradations et la justification des retenues sur caution.",
    image:
      "https://images.unsplash.com/photo-1582494764652-4a7f055aac40?q=80&w=800&auto=format&fit=crop",
  },
  {
    value: "signature",
    trigger: (
      <>
        <Edit className="mr-2 h-5 w-5" />
        Signature Électronique
      </>
    ),
    title: "Signature électronique certifiée et sécurisée",
    description:
      "Faites signer les locataires et propriétaires directement sur tablette ou smartphone. Le processus est conforme eIDAS, garantissant la valeur légale de vos états des lieux. Fini les impressions et les scans.",
    image:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=800&auto=format&fit=crop",
  },
  {
    value: "pdf",
    trigger: (
      <>
        <FilePdf className="mr-2 h-5 w-5" />
        Exports PDF Professionnels
      </>
    ),
    title: "Rapports PDF personnalisables à votre image",
    description:
      "Générez instantanément des rapports PDF complets et professionnels. Intégrez votre logo, personnalisez les couleurs et choisissez les informations à inclure pour des documents qui valorisent votre agence.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
  },
];

const Showcase = () => {
  return (
    <section id="showcase" className="py-24 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Visualisez la puissance d'ÉtatLux
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment nos fonctionnalités clés transforment des tâches
            complexes en processus simples et rapides.
          </p>
        </div>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-12">
            {showcaseFeatures.map((feature) => (
              <TabsTrigger
                key={feature.value}
                value={feature.value}
                className="py-3"
              >
                {feature.trigger}
              </TabsTrigger>
            ))}
          </TabsList>
          {showcaseFeatures.map((feature) => (
            <TabsContent
              key={feature.value}
              value={feature.value}
              className="mt-8 bg-gradient-glass-light dark:bg-gradient-glass-dark border border-white/20 dark:border-white/10 shadow-soft rounded-lg p-8"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="animate-fade-in-up">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
                <div className="relative group perspective-1000">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="rounded-lg shadow-medium w-full h-auto transform transition-transform duration-700 ease-out group-hover:rotate-y-[-8deg] group-hover:scale-105"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Showcase;
