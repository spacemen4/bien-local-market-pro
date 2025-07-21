import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import professionalsImage from "@/assets/professionals.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Agent Immobilier, Century 21",
      content: "ÉtatLux a révolutionné ma façon de travailler. Je gagne 2h par état des lieux et mes clients adorent recevoir le rapport en temps réel !",
      rating: 5,
      initials: "MD"
    },
    {
      name: "Pierre Martin",
      role: "Propriétaire particulier",
      content: "Enfin une app simple et efficace ! Plus de paperasse, tout est digitalisé. Je recommande à tous les propriétaires.",
      rating: 5,
      initials: "PM"
    },
    {
      name: "Sophie Laurent",
      role: "Gestionnaire de patrimoine",
      content: "L'interface est intuitive et le support client excellent. Nous avons équipé toute notre équipe, un investissement rentabilisé en 1 mois.",
      rating: 5,
      initials: "SL"
    }
  ];

  const stats = [
    { number: "5000+", label: "Professionnels conquis" },
    { number: "50000+", label: "États des lieux réalisés" },
    { number: "4.9/5", label: "Note moyenne" },
    { number: "75%", label: "Gain de temps moyen" }
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez pourquoi des milliers de professionnels ont choisi ÉtatLux pour leurs états des lieux.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <img 
              src={professionalsImage} 
              alt="Équipe de professionnels de l'immobilier"
              className="rounded-2xl shadow-card w-full h-auto"
            />
          </div>
          
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-foreground mb-3 italic">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl font-bold text-primary">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;