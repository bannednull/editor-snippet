import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import NotFound from "./components/not-found.tsx";
import "./index.css";
import { login, register } from "./api/auth.ts";
import { upsertSnippet } from "./api/snippet.ts";
import ErrorPage from "./error-page.tsx";
import { createSnippetStore } from "./stores/snippets.ts";
import { createUserStore } from "./stores/users.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/register",
    action: async ({ request }) => {
      const formData = await request.formData();

      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const repeat = formData.get("repassword") as string;

      if (name && email && password && repeat) {
        if (password !== repeat) {
          return { error: "Passwords don't match" };
        }
        try {
          await register({
            name,
            email,
            password,
            repassword: repeat,
          });

          return { message: "Registered successfully" };
        } catch (error) {
          if (error instanceof Error) {
            return { error: error?.message };
          }
        }
      }
      return { error: "Complete the form" };
    },
  },
  {
    path: "/login",
    action: async ({ request }) => {
      const formData = await request.formData();

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (email && password) {
        try {
          const user: { name: string; email: string; token: string } =
            await login({
              email,
              password,
            });

          createUserStore.setState({
            isAuth: true,
            name: user.name,
            email: user.email,
            token: user.token,
          });

          return { message: "Logged in successfully" };
        } catch (error) {
          if (error instanceof Error) {
            return { error: error?.message };
          }
        }
        return { error: "Invalid email or password" };
      }

      return {
        error: "Complete the form",
      };
    },
  },
  {
    path: "/snippet",
    action: async ({ request }) => {
      const formData = await request.formData();
      const snippet = createSnippetStore;
      const title = formData.get("title") as string;
      const lang = snippet.getState().lang;
      const code = snippet.getState().code;

      if (!title || !lang || !code) {
        return { error: "Complete the form" };
      }

      upsertSnippet({ lang, code, title });
      return null;
    },
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
