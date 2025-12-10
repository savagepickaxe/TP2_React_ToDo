# Routage avec React.js

## Objectifs
Ce travail vous permettra d'apprendre à créer des applications React multi-pages avec TanStack Router :
- Installer et configurer **TanStack Router**
- Créer et naviguer entre plusieurs **routes**
- Utiliser les **liens de navigation** (`<Link>`)
- Passer des **paramètres d'URL**
- Créer une **mise en page** (layout) partagée
- Gérer les **routes dynamiques**

---

## Introduction : Pourquoi un router ?

Jusqu'à présent, vos applications React affichaient tout sur une seule page. Mais les vraies applications web ont plusieurs pages :
- Une page d'accueil
- Une page "À propos"
- Une page de profil utilisateur
- Une page de détails de produit
- etc.

**TanStack Router** permet de créer ces différentes "pages" (routes) dans votre application React, tout en gardant l'expérience fluide d'une Single Page Application (SPA).

---

## Partie 1 – Installation et configuration de base

### Exercice 1.1 : Créer un nouveau projet

```shell
npm create vite@latest mon-app-router
# Sélectionner React, puis JavaScript
# Use rolldown-vite: No
# Install with npm and start now? (Yes)

cd mon-app-router
```

### Exercice 1.2 : Installer TanStack Router

```shell
npm install @tanstack/react-router
npm install -D @tanstack/react-devtools @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
```

**Note :** Les devtools sont optionnels mais très utiles pour déboguer !

Modifiez ensuite le fichier de configuration de Vite (`vite.config.js`) comme suit : 
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

### Exercice 1.3 : Structure de fichiers

Créez la structure suivante dans votre dossier `src` :

```
src/
├── routes/
│   ├── __root.jsx
│   ├── index.jsx
│   └── about.jsx
├── App.jsx
└── main.jsx
```

---

## Partie 2 – Première configuration du router

### Bon à savoir : Les concepts de base

**Route racine (`__root.jsx`)** : Le conteneur principal de toutes vos pages. C'est comme le "squelette" de votre site.

**Routes individuelles** : Chaque fichier représente une page de votre application.

**Outlet** : L'endroit où le contenu des pages enfants s'affiche.

---

### Exercice 2.1 : Créer la route racine

Créez `src/routes/__root.jsx` :

```jsx
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

export const Route = createRootRoute({
  component: () => (
    <div>
      <nav style={{ 
        padding: '20px', 
        backgroundColor: '#333', 
        color: 'white' 
      }}>
        <Link to="/" style={{ marginRight: '20px', color: 'white' }}>
          Accueil
        </Link>
        <Link to="/about" style={{ color: 'white' }}>
          À propos
        </Link>
      </nav>
      
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>

      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  ),
})
```

**Explication :**
- `<Link to="/">` : Crée un lien vers une route (sans recharger la page !)
- `<Outlet />` : Ici s'affichera le contenu de chaque page
- `<TanStackRouterDevtools />` : Outils de développement (optionnel)

---

### Exercice 2.2 : Créer la page d'accueil

Créez `src/routes/index.jsx` :

```jsx
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
```

**Note :** Le nom de fichier `index.jsx` correspond automatiquement à la route `/`

---

### Exercice 2.3 : Créer la page "À propos"

Créez `src/routes/about.jsx` :

```jsx
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
```

---

### Exercice 2.4 : Configurer le router dans App.jsx

Modifiez `src/App.jsx` :

```jsx
import { createRouter, RouterProvider } from '@tanstack/react-router';

// Import des routes
import { routeTree } from './routeTree.gen';

// Création du router
const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

---

### Exercice 2.5 : Tester votre application

Lancez votre application :

```shell
npm run dev
```

✅ **Résultat attendu :** 
- Vous voyez une barre de navigation
- Cliquer sur "Accueil" affiche la page d'accueil
- Cliquer sur "À propos" affiche la page à propos
- L'URL change sans recharger la page !

---

## Partie 3 – Un catalogue de produits

---

### Exercice 3.1 : Créer une page de produits

#### Créer le fichier de données

Créez `src/data/produits.json` :

```json
[ 
  {
    "id": 1,
    "nom": "Ordinateur portable",
    "prix": 999,
    "description": "Performant et léger"
  },
  {
    "id": 2,
    "nom": "Souris sans fil",
    "prix": 29,
    "description": "Ergonomique et précise"
  },
  {
    "id": 3,
    "nom": "Clavier mécanique",
    "prix": 149,
    "description": "Switches Cherry MX"
  },
  {
    "id": 4,
    "nom": "Écran 27 pouces",
    "prix": 399,
    "description": "Résolution 4K"
  }
]
```

**Note :** N'oubliez pas de créer le dossier `data` dans `src` !

Créez `src/routes/produits/index.jsx` :

```jsx
import { createFileRoute, Link } from '@tanstack/react-router';
import produits from '@/data/produits.json';

export const Route = createFileRoute('/produits')({
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
```

**Explication :**
- `import produits from '@/data/produits.json'` : Importe les données
- Les données sont sous forme de tableau: format facile à utiliser avec `.map()`


#### Ajouter le lien dans la navigation

Modifiez `src/routes/__root.jsx` pour ajouter le lien "Produits" avant le lien "À propos" :

```jsx
<Link to="/produits" style={{ marginRight: '20px', color: 'white' }}>
  Produits
</Link>
```

#### Tester votre application

Lancez votre application :

✅ **Résultat attendu :**
- La page `/produits` affiche la liste des produits

---

### Bon à savoir : Routes dynamiques

Les routes dynamiques permettent d'afficher des pages différentes selon un paramètre dans l'URL.

**Exemple :** `/produits/123` affiche le produit #123, `/produits/456` affiche le produit #456

En TanStack Router, on crée un fichier avec `$` pour indiquer un paramètre dynamique :
- Fichier : `produits/$id.jsx`
- Route : `/produits/:id`

---

### Exercice 3.2 : Créer la page de détails d'un produit

Créez `src/routes/produits/$id.jsx` :

```jsx
import { createFileRoute } from '@tanstack/react-router';
import produits from '@/data/produits.json';

export const Route = createFileRoute('/produits/$id')({
  component: ProduitDetail,
});

function ProduitDetail() {
  const { id } = Route.useParams();

  const produit = produits.find(p => p.id === parseInt(id, 10));

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
```

**Explication :**
- `import produits from '@/data/produits.json'` : Importe les données
- `$id` dans le nom de fichier crée un paramètre dynamique
- `Route.useParams()` permet de récupérer la valeur du paramètre
- On utilise cet ID pour afficher les bonnes informations

---

### Exercice 3.3 : Tester votre application

Lancez votre application :

✅ **Résultat attendu :**
- Cliquer sur un produit vous amène à `/produits/1`, `/produits/2`, etc.
- Chaque page de détail affiche les bonnes informations

---

## Partie 4 – Projet complet : Blog personnel

Créez une nouvelle application React avec TanStack Router pour un blog personnel.

```shell
npx create-tsrouter-app@latest mon-blog --template javascript

cd mon-blog
```

### Structure attendue :

```
src/
├── routes/
│   ├── __root.jsx       (Navigation commune)
│   ├── index.jsx        (Page d'accueil)
│   ├── blog/index.jsx   (Liste des articles)
│   ├── blog/$slug.jsx   (Détail d'un article)
│   └── contact.jsx      (Formulaire de contact)
└── main.jsx
```

---

### Exercice 4.1 : Créer le fichier de données

Créez `src/data/articles.json` :

```json
[
  {
    "slug": "introduction-react",
    "titre": "Introduction à React",
    "date": "2025-10-15",
    "extrait": "Découvrez les bases de React et pourquoi c'est si populaire."
  },
  {
    "slug": "tanstack-router",
    "titre": "TanStack Router : Le guide complet",
    "date": "2025-10-20",
    "extrait": "Apprenez à créer une navigation moderne dans vos apps React."
  },
  {
    "slug": "hooks-react",
    "titre": "Les Hooks React expliqués simplement",
    "date": "2025-10-25",
    "extrait": "useState, useEffect et tous les autres hooks essentiels."
  }
]
```

---

### Exercice 4.2 : Page d'accueil (`index.jsx`)

```jsx
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>✍️ Bienvenue sur mon blog</h1>
      <p>Découvrez mes articles sur le développement web et React !</p>
      <Link to="/blog">
        <button style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          Lire les articles
        </button>
      </Link>
    </div>
  );
}
```

---

### Exercice 4.3 : Liste des articles (`blog/index.jsx`)

```jsx
import { createFileRoute, Link } from '@tanstack/react-router';
import articles from '@/data/articles.json';

export const Route = createFileRoute('/blog/')({
  component: Blog,
});

function Blog() {
  return (
    <div>
      <h1>📚 Tous les articles</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {articles.map((article) => (
          <div 
            key={article.slug}
            style={{
              border: '1px solid #ddd',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <h2>{article.titre}</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              📅 {article.date}
            </p>
            <p>{article.extrait}</p>
            <Link to={`/blog/${article.slug}`}>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Lire la suite &rarr;
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Exercice 4.4 : Détail d'un article (`blog/$slug.jsx`)

À vous de compléter ! Créez une page qui :
1. Récupère le paramètre `slug` de l'URL
2. Affiche le contenu complet de l'article correspondant
3. Gère le cas où l'article n'existe pas

**Indices :**
- Importez les données avec `import articles from '@/data/articles.json';`
- Utilisez `Route.useParams()` pour récupérer `slug`
- Vérifiez si l'article existe avec `if (!article)`
- Ajoutez un lien "&larr; Retour aux articles" avec `<Link to="/blog">`

---

### Exercice 4.5 : Page de contact (`contact.jsx`)

```jsx
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [envoye, setEnvoye] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Simuler l'envoi
    console.log('Message envoyé:', { nom, email, message });
    setEnvoye(true);
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setNom('');
      setEmail('');
      setMessage('');
      setEnvoye(false);
    }, 3000);
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>📧 Contactez-moi</h1>
      
      {envoye && (
        <div style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          ✅ Message envoyé avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Nom :</label>
          <input 
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div>
          <label>Email :</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div>
          <label>Message :</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="5"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <button type="submit" style={{
          padding: '15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Envoyer le message
        </button>
      </form>
    </div>
  );
}
```

---

### Exercice 4.6 : Compléter la navigation dans `__root.jsx`

Ajoutez tous les liens nécessaires dans votre barre de navigation :
- Accueil (`/`)
- Blog (`/blog`)
- Contact (`/contact`)

Ajoutez également un style actif pour montrer sur quelle page on se trouve (bonus !).

---

## Partie 5 – Bonus (optionnel)

### Bonus 1 : Style actif sur les liens

Modifiez vos `<Link>` pour qu'ils changent de couleur quand ils sont actifs :

```jsx
<Link 
  to="/" 
  activeProps={{
    style: {
      fontWeight: 'bold',
      textDecoration: 'underline'
    }
  }}
>
  Accueil
</Link>
```

### Bonus 2 : Page 404

Créez `src/routes/__root.jsx` pour gérer les routes inexistantes :

```jsx
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
...

export const Route = createRootRoute({
  component: () => (
    // ...
  ),
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '72px' }}>404</h1>
      <p>Oups ! Cette page n'existe pas.</p>
      <Link 
        to="/"
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          textDecoration: 'none'
        }}
      >
          Retour à l'accueil
      </Link
    </div>
  );
}
```

---

## Récapitulatif des concepts clés

| Concept | Description |
|---------|-------------|
| `<Link to="/path">` | Crée un lien de navigation sans recharger la page |
| `createFileRoute()` | Définit une route basée sur le nom du fichier |
| `<Outlet />` | Affiche le contenu des routes enfants |
| `Route.useParams()` | Récupère les paramètres dynamiques de l'URL |
| `$param` dans le nom | Crée une route avec un paramètre dynamique |
| `__root.jsx` | Route racine qui entoure toutes les autres |

---

**Bon courage et amusez-vous bien avec TanStack Router !**
