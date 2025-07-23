import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Abonnement réussi !</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Merci de vous être abonné. Votre paiement a été traité avec succès.
      </p>
      <Link to="/">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Retour à l'accueil
        </button>
      </Link>
    </div>
  );
};

export default SubscriptionSuccess;
