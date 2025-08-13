# Templates d'e-mails pour EtatDeLux

Ce document contient les modèles d'e-mails utilisés par EtatDeLux, la plateforme d'état des lieux professionnelle.

## 1. Confirmation d'inscription

```html
<h2>Bienvenue sur EtatDeLux !</h2>

<p>Merci de vous être inscrit sur EtatDeLux, votre plateforme professionnelle pour la gestion des états des lieux.</p>

<p>Pour activer votre compte et commencer à créer vos premiers états des lieux numériques, cliquez sur le lien suivant :</p>
<p><a href="{{.ConfirmationURL}}" style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Confirmer votre adresse e-mail</a></p>

<p>Une fois votre compte activé, vous pourrez :</p>
<ul>
  <li>Créer des états des lieux détaillés avec photos</li>
  <li>Gérer vos propriétés et locataires</li>
  <li>Générer des rapports professionnels</li>
  <li>Accéder à notre bibliothèque de modèles</li>
</ul>

<p>Si vous n'avez pas créé de compte sur EtatDeLux, vous pouvez ignorer cet e-mail.</p>

<p>Cordialement,<br>
L'équipe EtatDeLux</p>
```

## 2. Invitation d'utilisateur

```html
<h2>Vous avez été invité à rejoindre EtatDeLux</h2>

<p>Bonjour,</p>

<p>Vous avez été invité à créer un compte sur EtatDeLux, la solution professionnelle pour réaliser des états des lieux numériques efficaces et conformes.</p>

<p>EtatDeLux vous permettra de :</p>
<ul>
  <li>Digitaliser vos états des lieux en quelques minutes</li>
  <li>Prendre des photos géolocalisées avec annotations</li>
  <li>Générer automatiquement des rapports PDF professionnels</li>
  <li>Synchroniser vos données sur tous vos appareils</li>
</ul>

<p>Cliquez sur le lien suivant pour accepter l'invitation et créer votre compte :</p>
<p><a href="{{.ConfirmationURL}}" style="background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Accepter l'invitation</a></p>

<p>Cette invitation est valable pendant 7 jours.</p>

<p>À bientôt sur EtatDeLux !<br>
L'équipe EtatDeLux</p>
```

## 3. Lien de connexion magique

```html
<h2>Votre lien de connexion EtatDeLux</h2>

<p>Bonjour,</p>

<p>Vous avez demandé un lien de connexion rapide à votre compte EtatDeLux.</p>

<p>Cliquez sur le bouton ci-dessous pour vous connecter instantanément :</p>
<p><a href="{{.ConfirmationURL}}" style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Se connecter à EtatDeLux</a></p>

<p><strong>Important :</strong> Ce lien est valable pendant 15 minutes et ne peut être utilisé qu'une seule fois pour des raisons de sécurité.</p>

<p>Si vous n'avez pas demandé ce lien de connexion, veuillez ignorer cet e-mail. Votre compte reste sécurisé.</p>

<p>Vous pourrez ensuite continuer à gérer vos états des lieux et propriétés en toute sécurité.</p>

<p>Cordialement,<br>
L'équipe EtatDeLux</p>
```

## 4. Changement d'adresse e-mail

```html
<h2>Confirmez le changement d'adresse e-mail</h2>

<p>Bonjour,</p>

<p>Vous avez demandé à modifier l'adresse e-mail de votre compte EtatDeLux.</p>

<p>Changement demandé :</p>
<ul>
  <li><strong>Ancienne adresse :</strong> {{.Email}}</li>
  <li><strong>Nouvelle adresse :</strong> {{.NewEmail}}</li>
</ul>

<p>Pour confirmer ce changement et continuer à recevoir les notifications de vos états des lieux sur votre nouvelle adresse, cliquez sur le lien suivant :</p>
<p><a href="{{.ConfirmationURL}}" style="background-color: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Confirmer le changement d'adresse</a></p>

<p><strong>Attention :</strong> Une fois le changement confirmé, toutes les notifications concernant vos propriétés et états des lieux seront envoyées à la nouvelle adresse.</p>

<p>Si vous n'avez pas demandé ce changement, contactez immédiatement notre support.</p>

<p>Cordialement,<br>
L'équipe EtatDeLux</p>
```

## 5. Réinitialisation du mot de passe

```html
<h2>Réinitialisez votre mot de passe EtatDeLux</h2>

<p>Bonjour,</p>

<p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte EtatDeLux.</p>

<p>Pour créer un nouveau mot de passe et retrouver l'accès à vos états des lieux et données de propriétés, cliquez sur le lien suivant :</p>
<p><a href="{{.ConfirmationURL}}" style="background-color: #EF4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Réinitialiser mon mot de passe</a></p>

<p><strong>Important :</strong></p>
<ul>
  <li>Ce lien est valable pendant 1 heure</li>
  <li>Choisissez un mot de passe fort avec au moins 8 caractères</li>
  <li>Après la réinitialisation, vous devrez vous reconnecter sur tous vos appareils</li>
</ul>

<p>Si vous n'avez pas demandé cette réinitialisation, votre compte est toujours sécurisé. Vous pouvez ignorer cet e-mail.</p>

<p>Pour toute question concernant la sécurité de votre compte, n'hésitez pas à nous contacter.</p>

<p>Cordialement,<br>
L'équipe EtatDeLux</p>
```

## 6. Réauthentification requise

```html
<h2>Vérification de sécurité requise</h2>

<p>Bonjour,</p>

<p>Pour votre sécurité, nous devons vérifier votre identité avant de vous permettre d'accéder à certaines fonctions sensibles de votre compte EtatDeLux.</p>

<p><strong>Action demandée :</strong> Accès aux paramètres de facturation et données personnelles</p>

<p>Cliquez sur le lien suivant pour confirmer votre identité :</p>
<p><a href="{{.ConfirmationURL}}" style="background-color: #6366F1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Vérifier mon identité</a></p>

<p>Cette vérification est nécessaire lorsque :</p>
<ul>
  <li>Vous modifiez des informations de paiement</li>
  <li>Vous accédez à des données sensibles</li>
  <li>Vous effectuez des actions critiques sur votre compte</li>
  <li>Votre dernière connexion remonte à plus de 30 jours</li>
</ul>

<p><strong>Ce lien expire dans 30 minutes</strong> pour garantir la sécurité de votre compte.</p>

<p>Si vous n'avez pas initié cette action, contactez immédiatement notre équipe de support.</p>

<p>Merci de votre compréhension pour ces mesures de sécurité qui protègent vos données d'états des lieux.</p>

<p>Cordialement,<br>
L'équipe EtatDeLux</p>
```

---

## Notes techniques

### Variables disponibles
- `{{.ConfirmationURL}}` - URL de confirmation/action
- `{{.Email}}` - Adresse e-mail actuelle
- `{{.NewEmail}}` - Nouvelle adresse e-mail (changement)
- `{{.SiteURL}}` - URL du site EtatDeLux

### Styles recommandés
- Couleur principale : #3B82F6 (bleu)
- Couleur succès : #10B981 (vert)  
- Couleur attention : #F59E0B (orange)
- Couleur danger : #EF4444 (rouge)
- Police : Système (Arial, Helvetica, sans-serif)

### Bonnes pratiques
- Toujours inclure un lien de désinscription
- Mentionner la durée de validité des liens
- Expliquer clairement l'action à effectuer
- Personnaliser avec le contexte métier (états des lieux)
- Garder un ton professionnel mais accessible