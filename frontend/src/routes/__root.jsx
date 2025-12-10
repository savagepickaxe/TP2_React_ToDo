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
        <Link to="/about" style={{ marginRight: '20px', color: 'white' }}>
          À propos
        </Link>
        <Link to="/produits" style={{ marginRight: '20px', color: 'white' }}>
            Produits
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