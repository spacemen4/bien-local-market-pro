import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../supabase";

const AuthModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connectez-vous ou créez un compte</DialogTitle>
        </DialogHeader>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          localization={{
            variables: {
              sign_in: {
                email_label: "Adresse e-mail",
                password_label: "Mot de passe",
                button_label: "Se connecter",
                social_provider_text: "Se connecter avec",
                link_text: "Vous avez déjà un compte ? Connectez-vous",
              },
              sign_up: {
                email_label: "Adresse e-mail",
                password_label: "Mot de passe",
                button_label: "S'inscrire",
                social_provider_text: "S'inscrire avec",
                link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
              },
              forgotten_password: {
                email_label: "Adresse e-mail",
                button_label: "Réinitialiser le mot de passe",
                link_text: "Mot de passe oublié ?",
              },
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
