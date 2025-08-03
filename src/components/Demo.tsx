const Demo = () => {
  return (
    <section id="demo" className="py-24 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Découvrez ÉtatLux en Action
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Regardez cette démonstration complète de notre application d'états des lieux professionnels.
          </p>
          
          <div className="relative bg-white rounded-2xl shadow-premium p-8 border border-primary/10">
            <div className="aspect-video rounded-xl overflow-hidden shadow-float">
              <iframe
                src="https://www.youtube.com/embed/eFnlBEgGCbg"
                title="Démonstration ÉtatLux - Application d'États des Lieux"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Interface Intuitive</h3>
                <p className="text-sm text-muted-foreground">
                  Découvrez notre interface simple et efficace conçue pour les professionnels.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Fonctionnalités Avancées</h3>
                <p className="text-sm text-muted-foreground">
                  Photos géolocalisées, signatures électroniques, rapports automatisés.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Gain de Temps</h3>
                <p className="text-sm text-muted-foreground">
                  Réduisez de 75% le temps de création de vos états des lieux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;