import { createFileRoute, Link } from '@tanstack/react-router';
import produits from '@/data/produits.json';

export const Route = createFileRoute('/produits/')({
  component: Produits,
});

function Produits() {
  return (
    <div>
      <h1>🛒 Nos produits</h1>
      <ul>
        {produits.map((produit) => (
          <li key={produit.id} style={{ marginBottom: '10px' }}>
            <Link to={`/produits/${produit.id}`}>
              {produit.nom} - {produit.prix}$
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}