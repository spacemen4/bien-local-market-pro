import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="max-w-md p-8 text-center">
        <div className="mb-8">
          <img
            src="/placeholder.svg"
            alt="404 Not Found"
            className="w-64 h-64 mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Oops, page non trouvée!
        </h1>
        <p className="text-muted-foreground mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Retourner à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
