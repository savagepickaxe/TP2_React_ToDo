import { createRouter, RouterProvider } from "@tanstack/react-router";

// Import des routes
import { routeTree } from "./routeTree.gen";

// Création du router
const router = createRouter({ routeTree });

function App() {
    return <RouterProvider router={router} />;
}

export default App;
