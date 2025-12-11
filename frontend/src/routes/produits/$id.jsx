import { createFileRoute } from '@tanstack/react-router';
import produits from '@/data/produits.json';

export const Route = createFileRoute('/produits/$id')({
  component: ProduitDetail,
});

function ProduitDetail() {
  const { id } = Route.useParams();

  const task = produits.find(p => p.id === parseInt(id, 10));

  if (!produit) {
    return <div>❌ Produit non trouvé</div>;
  }

  return (
    <div>
      <h1>{produit.nom}</h1>
      <p style={{ fontSize: '24px', color: 'green' }}>
        Prix : {produit.prix}$
      </p>
      <p>{produit.description}</p>
      <button style={{ 
        padding: '10px 20px', 
        backgroundColor: '#4CAF50', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        🛒 Ajouter au panier
      </button>
    </div>
  );
}