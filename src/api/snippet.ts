import { get, post } from "@/lib/fetch";
import { snippetStore } from "@/stores/snippets-store";
import { userStore } from "@/stores/users-store";
import type { Params } from "react-router-dom";
import { toast } from "sonner";

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
  const snippet = snippetStore;
  const title = formData.get("title") as string;
  const uuid = formData.get("uuid") as string;
  const token = userStore.getState().token;
  const lang = snippet.getState().lang;
  const code = snippet.getState().code;

  if (!title || !lang || !code) {
    return toast("Complete the form");
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

  if ("error" in result) {
    return toast(result.error);
  }

  return result;
}

export async function getAllSnippets(): Promise<
  UserSnippet[] | { error: string }
> {
  const token = userStore.getState().token;

  if (!token) return { error: "You need to be logged in to see snippets" };

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
  const token = userStore.getState().token;

  const result = await get<Snippet>(`/api/snippet/${user}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
}
