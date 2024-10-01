import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import NotFound from "./components/not-found.tsx";
import "./index.css";
import { login, register } from "./api/auth.ts";
import {
  getAllSnippets,
  getSnippetById,
  upsertSnippet,
} from "./api/snippet.ts";
import ErrorPage from "./error-page.tsx";
import Layout from "./layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      {
        path: "register",
        action: register,
      },
      {
        path: "login",
        action: login,
      },
      {
        path: ":user/:snippetId",
        loader: getSnippetById,
        element: <App />,
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
