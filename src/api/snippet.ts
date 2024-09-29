import { createSnippetStore } from "@/stores/snippets";
import { createUserStore } from "@/stores/users";

export type Snippet = {
  id: number;
  title: string;
  lang: string;
  code: string;
  uuid: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function upsertSnippet({ request }: { request: Request }) {
  const formData = await request.formData();
  const snippet = createSnippetStore;
  const title = formData.get("title") as string;
  const token = createUserStore.getState().token;
  const lang = snippet.getState().lang;
  const code = snippet.getState().code;

  if (!title || !lang || !code) {
    return { error: "Complete the form" };
  }

  const response = await fetch("/api/snippet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, lang, code }),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const result: Promise<Snippet> = await response.json();
  console.log(result);
  return result;
}

export async function getAllSnippets(): Promise<Snippet[]> {
  const token = createUserStore.getState().token;
  const response = await fetch("/api/snippet", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const result: Promise<Snippet[]> = await response.json();
  return result;
}
