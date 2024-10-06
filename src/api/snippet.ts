import { get, post } from "@/lib/fetch";
import { createSnippetStore } from "@/stores/snippets-store";
import { createUserStore } from "@/stores/users-store";
import type { Params } from "react-router-dom";

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

export interface UserSnippet extends Snippet {
  user: {
    name: string;
  };
}

export async function upsertSnippet({ request }: { request: Request }) {
  const formData = await request.formData();
  const snippet = createSnippetStore;
  const title = formData.get("title") as string;
  const uuid = formData.get("uuid") as string;
  const token = createUserStore.getState().token;
  const lang = snippet.getState().lang;
  const code = snippet.getState().code;

  if (!title || !lang || !code) {
    return { error: "Complete the form" };
  }

  const result = await post<Snippet>(
    "/api/snippet",
    { title, lang, code, uuid },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(result);
  return result;
}

export async function getAllSnippets(): Promise<
  UserSnippet[] | { error: string }
> {
  const token = createUserStore.getState().token;

  const result = await get<UserSnippet[]>("/api/snippet", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
}

export async function getSnippetById({
  params,
}: { params: Params<string> }): Promise<Snippet | { error: string }> {
  const id = params.snippetId;
  const user = params.user;
  const token = createUserStore.getState().token;

  const result = await get<Snippet>(`/api/snippet/${user}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
}
