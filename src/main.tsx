import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import NotFound from "./components/not-found.tsx";
import "./index.css";
import { login, register } from "./api/auth.ts";
import { getAllSnippets, upsertSnippet } from "./api/snippet.ts";
import ErrorPage from "./error-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "register",
        action: register,
      },
      {
        path: "login",
        action: login,
      },
    ],
  },
  {
    path: "/snippet",
    loader: () => getAllSnippets(),
    action: upsertSnippet,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
