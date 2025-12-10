import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div>
      <h1>🏠 Bienvenue sur la page d'accueil</h1>
      <p>Ceci est la route principale de notre application.</p>
      <p>Utilisez la navigation ci-dessus pour explorer le site !</p>
    </div>
  );
}