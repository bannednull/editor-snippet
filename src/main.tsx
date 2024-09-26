import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import NotFound from "./components/not-found.tsx";
import "./index.css";
import { register } from "./api/auth.ts";
import ErrorPage from "./error-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/new/:slug",
        element: <App />,
      },
    ],
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
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
