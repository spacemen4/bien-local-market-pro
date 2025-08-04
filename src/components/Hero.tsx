import { Button } from "@/components/ui/button";
import { CheckCircle, Play, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const partners = [
    { name: "Nexity", logo: "nexity" },
    { name: "Foncia", logo: "foncia" },
    { name: "Citya", logo: "citya" },
    { name: "ORPI", logo: "orpi" },
    { name: "Laforet", logo: "laforet" },
  ];

  return (
    <section className="relative pt-32 pb-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-6 border border-primary/10">
              <Star className="w-4 h-4 text-primary" />
              Noté 4.9/5 par nos clients
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
              L'état des lieux numérique,
              <span className="bg-gradient-hero bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                {" "}
                simple et efficace
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0">
              Générez des rapports conformes, ajoutez des photos illimitées et
              faites signer électroniquement en quelques minutes. Fini la
              paperasse, bonjour l'efficacité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-gradient-premium text-primary-foreground shadow-medium hover:shadow-strong transform hover:scale-105 transition-all duration-300"
              >
                <a href="https://app.etatdelux.com/">Démarrer l'essai gratuit</a>
              </Button>
              <a href="#demo">
                <Button size="lg" variant="outline">
                  <Play className="mr-2 h-5 w-5" />
                  Voir la démo
                </Button>
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Essai de 14 jours
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Sans engagement
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Conforme loi ALUR
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative group perspective-1000">
              <div className="absolute -inset-2 bg-gradient-premium rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition duration-1000 animate-pulse-glow"></div>
              <img
                src={heroImage}
                alt="Professionnel utilisant l'application d'état des lieux sur tablette"
                className="relative rounded-2xl w-full h-auto transform transition-transform duration-700 ease-out group-hover:rotate-y-[-10deg] group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-4">
            Ils nous font confiance au quotidien
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {partners.map((partner) => (
              <img
                key={partner.name}
                src={`https://avatar.vercel.sh/${partner.logo}.svg?text=${partner.name}`}
                alt={partner.name}
                className="h-8 opacity-60 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;