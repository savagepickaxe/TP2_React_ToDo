import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <div>
      <h1>📖 À propos</h1>
      <p>Cette application a été créée pour apprendre TanStack Router.</p>
      <p>Version : 1.0.0</p>
      <p>Auteur : Votre nom ici</p>
    </div>
  );
}