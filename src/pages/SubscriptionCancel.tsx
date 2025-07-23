import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionCancel = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Abonnement annulé</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Votre processus d'abonnement a été annulé. Vous n'avez pas été facturé.
      </p>
      <Link to="/#pricing">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Voir les plans
        </button>
      </Link>
    </div>
  );
};

export default SubscriptionCancel;
