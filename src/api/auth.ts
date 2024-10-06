import { post } from "@/lib/fetch";
import { createUserStore } from "@/stores/users-store";

export async function register({ request }: { request: Request }) {
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
      await post("/api/register", {
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
}

export async function login({ request }: { request: Request }) {
  const formData = await request.formData();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email && password) {
    try {
      const result = await post<{ name: string; email: string; token: string }>(
        "/api/login",
        { email, password },
      );

      if ("error" in result) {
        return { error: result.error };
      }

      createUserStore.setState({
        isAuth: true,
        name: result.name,
        email: result.email,
        token: result.token,
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
}
