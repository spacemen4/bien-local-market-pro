import { Building2, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">ÉtatLux</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              La solution française de référence pour digitaliser et simplifier 
              vos états des lieux. Conçue par des professionnels, pour des professionnels.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@etatlux.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Produit</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#features" className="hover:text-primary transition-colors">Fonctionnalités</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Tarifs</a></li>
              <li><a href="https://bien-local-market-pro.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Intégrations</a></li>
              <li><a href="https://bien-local-market-pro.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">API</a></li>
              <li><a href="https://bien-local-market-pro.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Mobile</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="https://bien-local-market-pro.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Centre d'aide</a></li>
              <li><a href="https://bien-local-market-pro.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="https://bien-local-market-pro.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Formations</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="https://bien-local-market-pro.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Statut système</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-background/60">
              © 2024 ÉtatLux. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm text-background/80">
              <a href="https://bien-local-market-pro.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Conditions générales</a>
              <a href="https://bien-local-market-pro.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Confidentialité</a>
              <a href="https://bien-local-market-pro.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Mentions légales</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;