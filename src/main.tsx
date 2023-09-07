import "./index.css";

import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import { About } from "./pages/about.tsx";
import { Home } from "./pages/home.tsx";
import { Root } from "./pages/root.tsx";
import { Blender } from "./pages/blender.tsx";
import { Projects } from "./pages/projects.tsx";
import { Settings } from "./pages/settings.tsx";

const rootRoute = new RootRoute({
  component: Root,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const blenderRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/blender",
  component: Blender,
});

const projectsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: Projects,
});

const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: Settings,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  blenderRoute,
  projectsRoute,
  settingsRoute,
]);
const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
