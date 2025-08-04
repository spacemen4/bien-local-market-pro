import { Video } from "lucide-react";

const Demo = () => {
  return (
    <section id="demo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Plongez au cœur de l'application
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            En 2 minutes, comprenez comment ÉtatLux va révolutionner votre
            façon de travailler.
          </p>

          <div className="relative bg-gradient-glass-light dark:bg-gradient-glass-dark rounded-2xl shadow-strong p-6 md:p-8 border border-white/20 dark:border-white/10">
            <div className="aspect-video rounded-xl overflow-hidden shadow-medium group">
              <iframe
                src="https://www.youtube.com/embed/eFnlBEgGCbg"
                title="Démonstration ÉtatLux - Application d'États des Lieux"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full transition-transform duration-500 group-hover:scale-105"
              ></iframe>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: "Interface Intuitive",
                  desc: "Découvrez notre interface simple et efficace conçue pour les professionnels.",
                },
                {
                  title: "Fonctionnalités Avancées",
                  desc: "Photos géolocalisées, signatures électroniques, rapports automatisés.",
                },
                {
                  title: "Gain de Temps",
                  desc: "Réduisez de 75% le temps de création de vos états des lieux.",
                },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;