import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Home, Clock, Award } from "lucide-react";
import professionalsImage from "@/assets/professionals.jpg";

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Agent Immobilier, Century 21",
    content:
      "ÉtatLux a transformé ma productivité. Les rapports sont professionnels et mes clients sont impressionnés par la rapidité.",
    avatar: "https://avatar.vercel.sh/marie.svg?text=MD",
  },
  {
    name: "Julien Petit",
    role: "Gestionnaire de biens",
    content:
      "L'application est un jeu d'enfant à utiliser. Le support est incroyablement réactif. Un must-have pour tout pro de l'immo.",
    avatar: "https://avatar.vercel.sh/julien.svg?text=JP",
  },
];

const stats = [
  { icon: Users, number: "50,000+", label: "Utilisateurs actifs" },
  { icon: Home, number: "1M+", label: "États des lieux réalisés" },
  { icon: Clock, number: "75%", label: "Gain de temps moyen" },
  { icon: Award, number: "4.9/5", label: "Note de satisfaction" },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Ce que nos clients disent de nous
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Nous sommes fiers de la confiance que nous accordent des milliers
                de professionnels de l'immobilier.
              </p>
            </div>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-gradient-glass-light dark:bg-gradient-glass-dark border border-white/20 dark:border-white/10 shadow-soft"
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="w-14 h-14 border-2 border-primary/50">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative hidden lg:block group perspective-1000">
            <img
              src={professionalsImage}
              alt="Équipe de professionnels de l'immobilier souriants"
              className="rounded-2xl shadow-strong w-full h-auto transition-transform duration-700 ease-out group-hover:rotate-y-[8deg] group-hover:scale-105"
            />
          </div>
        </div>

        <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-accent/50 border border-border"
            >
              <stat.icon className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-4xl font-extrabold text-foreground">
                {stat.number}
              </div>
              <div className="text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;