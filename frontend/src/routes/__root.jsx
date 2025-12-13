import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

export const Route = createRootRoute({
    component: () => (
        <div>
            <header className="bg-violet-950 p-5 px-20 text-white flex flex-col sm:flex-row gap-4 justify-between items-center">
                <h1 className="text-3xl font-semibold">Taskify</h1>
                <nav className="bg-violet-900 border-2 border-violet-100 rounded-full flex p-1 gap-1 justify-around">
                    <Link
                        to="/"
                        className="p-2 px-4 hover:text-violet-900 hover:bg-violet-100 hover:rounded-full"
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/chart"
                        className="p-2 px-4 hover:text-violet-900 hover:bg-violet-100 hover:rounded-full"
                    >
                        Chart
                    </Link>
                </nav>
            </header>

            <div className="mx-auto my-10 px-5 sm:px-20">
                <Outlet />
            </div>

            <TanStackDevtools
                config={{
                    position: "bottom-right",
                }}
                plugins={[
                    {
                        name: "Tanstack Router",
                        render: <TanStackRouterDevtoolsPanel />,
                    },
                ]}
            />
        </div>
    ),
});
